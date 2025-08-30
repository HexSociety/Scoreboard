// src/app/api/storage.ts
// Lightweight persistent storage without a database.
// Uses a GitHub Gist when GIST_ID and GITHUB_TOKEN are provided; falls back to local file otherwise.

import fs from "fs";
import path from "path";
import axios from "axios";

const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const isGistEnabled = Boolean(GIST_ID && GITHUB_TOKEN);

async function readFromGist(filename: string): Promise<any> {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "scoreboard-app",
  };

  try {
    const { data } = await axios.get(`https://api.github.com/gists/${GIST_ID}`, {
      headers,
    });

    const file = data.files?.[filename];
    if (!file) return undefined;

    if (file.truncated && file.raw_url) {
      const raw = await axios.get<string>(file.raw_url, { headers });
      return JSON.parse(raw.data);
    }
    return JSON.parse(file.content);
  } catch (err) {
    // If not found or any error, treat as empty
    return undefined;
  }
}

async function writeToGist(filename: string, dataObj: any): Promise<void> {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "scoreboard-app",
  };

  const body = {
    files: {
      [filename]: {
        content: JSON.stringify(dataObj, null, 2),
      },
    },
  };

  await axios.patch(`https://api.github.com/gists/${GIST_ID}`, body, { headers });
}

function readFromFile(filename: string): any {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeToFile(filename: string, dataObj: any): void {
  const filePath = path.join(process.cwd(), filename);
  fs.writeFileSync(filePath, JSON.stringify(dataObj, null, 2), "utf-8");
}

export async function readJSON<T = any>(filename: string, fallback: T): Promise<T> {
  if (isGistEnabled) {
    const data = await readFromGist(filename);
    return (data ?? fallback) as T;
  }
  const data = readFromFile(filename);
  return (data ?? fallback) as T;
}

export async function writeJSON(filename: string, dataObj: any): Promise<void> {
  if (isGistEnabled) {
    await writeToGist(filename, dataObj);
    return;
  }
  writeToFile(filename, dataObj);
}
