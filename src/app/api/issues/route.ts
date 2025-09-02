// src/app/api/issues/route.ts
import axios from "axios";
import { owner, repo } from "../url";

function excerptFromBody(body: string | null, max = 220) {
  if (!body) return "";
  // strip basic markdown (images/links) and HTML tags
  let s = body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*`~_-]+/g, "")
    .trim();
  if (s.length <= max) return s;
  return s.slice(0, max).trim() + "…";
}

export async function GET() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${"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"}`,
      },
    }
  );

  const issues = data
    .filter((issue: any) => !issue.pull_request)
    .map((issue: any) => {
      const excerpt = excerptFromBody(issue.body || null, 220);
      const createdAt = issue.created_at;
      const updatedAt = issue.updated_at;
      const lastActivity = updatedAt || createdAt;
      const created = new Date(createdAt).getTime();
      const now = Date.now();
      const timeOpenDays = Math.round((now - created) / (1000 * 60 * 60 * 24));

      return {
        // raw payload for full access if needed
        data: issue,
        id: issue.id,
        number: issue.number,
        title: issue.title,
        body: issue.body,
        excerpt,
        url: issue.url,
        html_url: issue.html_url,
        labels: (issue.labels || []).map((l: any) => ({ name: l.name, color: l.color })),
        state: issue.state,
        user: issue.user ? { login: issue.user.login, avatar_url: issue.user.avatar_url } : null,
        comments: issue.comments,
        comments_url: issue.comments_url,
        reactions: issue.reactions || null,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        last_activity: lastActivity,
        time_open_days: timeOpenDays,
        assignees: (issue.assignees || []).map((a: any) => ({ login: a.login, avatar_url: a.avatar_url })),
        milestone: issue.milestone ? { title: issue.milestone.title } : null,
        sub_issues_summary: issue.sub_issues_summary || null,
        issue_dependencies_summary: issue.issue_dependencies_summary || null,
        locked: !!issue.locked,
        pull_request: !!issue.pull_request,
      };
    });

  return Response.json(issues, { status: 200 });
}
