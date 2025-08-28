// src/app/api/issues/route.ts
import axios from "axios";
import { owner, repo } from "../url";

export async function GET() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits`,

  );

  const commits = data.map((commit: any) => ({
    id: commit.id,
    message: commit.commit.message,
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    url: commit.html_url,
  }));

  return Response.json(commits, { status: 200 });
}

    

