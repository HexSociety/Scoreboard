// src/app/api/pulls/route.ts
import axios from "axios";
import { owner, repo } from "../url";
import { readJSON, writeJSON } from "../storage";

const levelScores: Record<string, number> = {
  level1: 10,
  level2: 20,
};

const leaderboardKey = "leaderboard.json";

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
  body?: string;
  commits_url: string;
};

export async function GET() {
  // Fetch issues
  const { data: issuesData } = await axios.get<GitHubIssue[]>(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`
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
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`
  );

  const leaderboard = await readJSON<Record<string, number>>(leaderboardKey, {});

  const pulls = pullsData.map((pull) => {
    const issueRegex = /#(\d+)/g;
    const matches = [...(pull.body?.matchAll(issueRegex) || [])];

    let totalScore = 0;
    const levels: string[] = [];

    matches.forEach((m) => {
      const issueNum = parseInt(m[1]);
      if (issueMap[issueNum]) {
        levels.push(issueMap[issueNum].level);
        totalScore += issueMap[issueNum].score;
      }
    });

    // Update leaderboard
    if (totalScore > 0) {
      leaderboard[pull.user.login] = (leaderboard[pull.user.login] || 0) + totalScore;
    }

    return {
      url: pull.html_url,
      user: pull.user.login,
      number: pull.number,
      title: pull.title,
      state: pull.state,
      body: pull.body,
      linkedLevels: levels,
      score: totalScore,
      commits: pull.commits_url,
    };
  });

  // Persist leaderboard
  await writeJSON(leaderboardKey, leaderboard);

  return Response.json({ pulls, leaderboard }, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
