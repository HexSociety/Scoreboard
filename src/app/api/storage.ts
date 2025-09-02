// src/app/api/storage.ts
// Redis-backed persistent store with in-memory fallback.
// Set REDIS_URL in the environment to enable Redis; otherwise we use memory store.

import { createClient, RedisClientType } from "redis";

const REDIS_URL = process.env.REDIS_URL || process.env.REDIS;

const memoryStore: Record<string, any> = {};

let redisClient: RedisClientType | null = null;
let redisAvailable = false;

async function initRedis() {
  if (!REDIS_URL) return;
  try {
    redisClient = createClient({ url: REDIS_URL });
    redisClient.on("error", (err: unknown) => {
      // eslint-disable-next-line no-console
      console.debug("redis error", err);
      redisAvailable = false;
    });
    await redisClient.connect();
    redisAvailable = true;
    // eslint-disable-next-line no-console
    console.debug("redis connected");
  } catch (err) {
    // Fail silently and fall back to memory store
    // eslint-disable-next-line no-console
    console.debug("redis init failed, using memory store", err);
    redisAvailable = false;
    redisClient = null;
  }
}

void initRedis();

function deepClone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export async function readJSON<T = any>(filename: string, fallback: T): Promise<T> {
  if (redisAvailable && redisClient) {
    try {
      const raw = await redisClient.get(filename);
      if (raw == null) return fallback;
      return JSON.parse(raw) as T;
    } catch (err) {
      // degrade to memory store on error
      // eslint-disable-next-line no-console
      console.debug("redis read failed, falling back to memory", err);
      redisAvailable = false;
      redisClient = null;
    }
  }

  if (Object.prototype.hasOwnProperty.call(memoryStore, filename)) {
    return deepClone(memoryStore[filename]) as T;
  }
  return fallback;
}

export async function writeJSON(filename: string, dataObj: any): Promise<void> {
  const payload = JSON.stringify(dataObj);

  if (redisAvailable && redisClient) {
    try {
      await redisClient.set(filename, payload);
      return;
    } catch (err) {
      // eslint-disable-next-line no-console
       console.debug("redis write failed, falling back to memory", err);
      redisAvailable = false;
      redisClient = null;
    }
  }

  memoryStore[filename] = deepClone(dataObj);
}
