// src/app/api/issues/route.ts
import axios from "axios";
import { owner, repo } from "../url";

export async function GET(req: Request) {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`
  );

  // Map only the fields you care about
  const pulls = data.map((pull: any) => ({
    url: pull.url,
    user: pull.user.login,
    number: pull.number,
    title: pull.title,
    state: pull.state, // "open", "closed" (merged counts as closed too)
    body: pull.body,
    issue: pull.issue_url,
    commits: pull.commits_url,
  }));

  return Response.json(pulls, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
