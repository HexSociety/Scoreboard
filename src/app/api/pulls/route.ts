// src/app/api/pulls/route.ts
import axios from "axios";
import { owner, repo } from "../url";
import { leaderboardService, POINTS } from "../redis";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Minimal GitHub API types we rely on
type GitHubLabel = { name: string };
type GitHubIssue = {
  number: number;
  labels: GitHubLabel[];
  pull_request?: unknown; // present on PRs returned from the issues API
};
type GitHubPull = {
  html_url: string;
  user: { login: string };
  number: number;
  title: string;
  state: string;
  merged_at: string | null;
  body?: string;
  commits_url: string;
};

export async function GET() {
  // Debug: Check if token is loaded
  console.log('GITHUB_TOKEN exists:', !!GITHUB_TOKEN);
  console.log('GITHUB_TOKEN length:', GITHUB_TOKEN?.length || 0);
  
  if (!GITHUB_TOKEN) {
    return Response.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 });
  }

  try {
    // Fetch issues
    const { data: issuesData } = await axios.get<GitHubIssue[]>(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : undefined,
      }
    );
    
    const issueMap: Record<number, { level: string; score: number }> = {};
    issuesData
      .filter((i) => !i.pull_request)
      .forEach((issue) => {
        const levelLabel = issue.labels.find((l) => l.name.startsWith("level"));
        if (levelLabel) {
          issueMap[issue.number] = {
            level: levelLabel.name,
            score: POINTS.LEVEL_POINTS[levelLabel.name as keyof typeof POINTS.LEVEL_POINTS] || 0,
          };
        }
      });

    // Fetch PRs
    const { data: pullsData } = await axios.get<GitHubPull[]>(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
      {
        headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : undefined,
      }
    );

    const pulls = pullsData.map((pull) => {
      const issueRegex = /#(\d+)/g;
      // Check both PR title and body for issue references
      const bodyMatches = [...(pull.body?.matchAll(issueRegex) || [])];
      const titleMatches = [...(pull.title?.matchAll(issueRegex) || [])];
      const matches = [...bodyMatches, ...titleMatches];

      let totalScore = 0;
      const levels: string[] = [];

      // Only count points for merged PRs that solve issues
      if (pull.merged_at) {
        // Get unique issue numbers (avoid counting duplicates if same issue mentioned in title and body)
        const uniqueIssueNumbers = [...new Set(matches.map(m => parseInt(m[1])))];
        
        // Add level-based points for linked issues only
        uniqueIssueNumbers.forEach((issueNum) => {
          if (issueMap[issueNum]) {
            levels.push(issueMap[issueNum].level);
            totalScore += issueMap[issueNum].score;
          }
        });

        // Award points to PR author - only if not already processed
        if (totalScore > 0) {
          leaderboardService.addPointsForPR(
            pull.user.login,
            totalScore,
            pull.number,
            `Merged PR #${pull.number}: ${pull.title} (${levels.join(', ') || 'no levels'})`
          ).catch(console.error);
        }
      }

      return {
        url: pull.html_url,
        user: pull.user.login,
        number: pull.number,
        title: pull.title,
        state: pull.state,
        merged: !!pull.merged_at,
        merged_at: pull.merged_at,
        body: pull.body,
        linkedLevels: levels,
        score: totalScore,
        commits: pull.commits_url,
      };
    });

    // Get current leaderboard from Redis
    const leaderboard = await leaderboardService.getLeaderboard(50);

    return Response.json({
      pulls,
      leaderboard: leaderboard.reduce((acc, entry) => {
        acc[entry.username] = entry.score;
        return acc;
      }, {} as Record<string, number>),
      pointsSystem: POINTS
    }, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Error in pulls API:', error);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}