// src/app/api/pulls/route.ts
import axios from "axios";
import { owner, repo } from "../url";

const levelScores: Record<string, number> = {
  level1: 10,
  level2: 20,
  level3: 30, // extend as needed
};

export async function GET() {
  // 1️⃣ Fetch all issues
  const { data: issuesData } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all`
  );

  // Map issue number -> level name
  const issueMap: Record<number, { level: string; score: number }> = {};
  issuesData
    .filter((i: any) => !i.pull_request)
    .forEach((issue: any) => {
      const levelLabel = issue.labels.find((l: any) => l.name.startsWith("level"));
      if (levelLabel) {
        issueMap[issue.number] = {
          level: levelLabel.name,
          score: levelScores[levelLabel.name] || 0,
        };
      }
    });

  // 2️⃣ Fetch all PRs
  const { data: pullsData } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`
  );

  // 3️⃣ Parse PRs for linked issues
  const pulls = pullsData.map((pull: any) => {
    const issueRegex = /#(\d+)/g;
    const matches = [...(pull.body?.matchAll(issueRegex) || [])];
    let totalScore = 0;
    let levels: string[] = [];

    matches.forEach((m) => {
      const issueNum = parseInt(m[1]);
      if (issueMap[issueNum]) {
        levels.push(issueMap[issueNum].level);
        totalScore += issueMap[issueNum].score;
      }
    });

    return {
      url: pull.html_url,
      user: pull.user.login,
      number: pull.number,
      title: pull.title,
      state: pull.state,
      body: pull.body,
      linkedLevels: levels, // array of levels PR is linked to
      score: totalScore,    // total score based on linked issues
      commits: pull.commits_url,
    };
  });

  return Response.json(pulls, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
