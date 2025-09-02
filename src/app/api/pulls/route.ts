// src/app/api/pulls/route.ts
import axios from "axios";
import { owner, repo } from "../url";
import { leaderboardService, POINTS } from "../redis";

const levelScores: Record<string, number> = {
  level1: 10,
  level2: 20,
  level3: 30,
  level4: 40,
  level5: 50,
};

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
  // Fetch issues
  const { data: issuesData } = await axios.get<GitHubIssue[]>(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${"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"}`,
      },
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
          score: levelScores[levelLabel.name] || 0,
        };
      }
    });

  // Fetch PRs
  const { data: pullsData } = await axios.get<GitHubPull[]>(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`,
    {
      headers: {
        Authorization: `Bearer ${"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"}`,
      },
    }
  );

  const pulls = pullsData.map((pull) => {
    const issueRegex = /#(\d+)/g;
    const matches = [...(pull.body?.matchAll(issueRegex) || [])];

    let totalScore = 0;
    const levels: string[] = [];

    // Only count points for merged PRs
    if (pull.merged_at) {
      matches.forEach((m) => {
        const issueNum = parseInt(m[1]);
        if (issueMap[issueNum]) {
          levels.push(issueMap[issueNum].level);
          totalScore += issueMap[issueNum].score;
        }
      });

      // Add base points for merged PR
      totalScore += POINTS.MERGED_PR;

      // Award points to PR author (not committer) - only if not already processed
      if (totalScore > 0) {
        leaderboardService.addPointsForPR(
          pull.user.login,
          totalScore,
          pull.number,
          `Merged PR #${pull.number}: ${pull.title}`
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
    }, {} as Record<string, number>)
  }, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
