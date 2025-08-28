// src/app/api/issues/route.ts
import axios from "axios";
import { owner, repo } from "../url";

export async function GET() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues`,

  );

  const issues = data
    .filter((issue: any) => !issue.pull_request)
    .map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      number: issue.number,
      labels: issue.labels,
      state: issue.state,
      body: issue.body,
      url: issue.html_url,
    }));

  return Response.json(issues, { status: 200 });
}
