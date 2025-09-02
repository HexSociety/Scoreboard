// src/app/api/redis.ts
import Redis from 'ioredis';

let redis: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (typeof window !== 'undefined') {
    // Client-side, no Redis
    return null;
  }

  if (!redis) {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.warn('REDIS_URL not configured, using fallback storage');
      return null;
    }

    try {
      redis = new Redis(redisUrl);
      
      redis.on('error', (err) => {
        console.error('Redis connection error:', err);
      });
    } catch (error) {
      console.error('Failed to create Redis client:', error);
      return null;
    }
  }

  return redis;
}

// Points system constants
export const POINTS = {
  CREATE_ISSUE: 5,
  OPEN_PULL_REQUEST: 10,
  REVIEW_PULL_REQUEST: 8,
  MERGE_PULL_REQUEST: 20,
  CLOSE_ISSUE_OR_PR: 3,
} as const;

// Leaderboard operations
export class LeaderboardService {
  private redis: Redis | null;
  private fallbackData: Record<string, number> = {};

  constructor() {
    this.redis = getRedisClient();
  }

  async addPoints(username: string, points: number, action: string): Promise<void> {
    if (this.redis) {
      await this.redis.zincrby('leaderboard', points, username);
      await this.redis.lpush(`user:${username}:actions`, JSON.stringify({
        action,
        points,
        timestamp: new Date().toISOString(),
      }));
      await this.redis.ltrim(`user:${username}:actions`, 0, 99); // Keep last 100 actions
    } else {
      // Fallback to in-memory storage
      this.fallbackData[username] = (this.fallbackData[username] || 0) + points;
    }
  }

  async getLeaderboard(limit: number = 10): Promise<Array<{ username: string; score: number; rank: number }>> {
    if (this.redis) {
      const results = await this.redis.zrevrange('leaderboard', 0, limit - 1, 'WITHSCORES');
      const leaderboard = [];
      
      for (let i = 0; i < results.length; i += 2) {
        const username = results[i] as string;
        const score = parseInt(results[i + 1] as string, 10);
        leaderboard.push({
          username,
          score,
          rank: Math.floor(i / 2) + 1,
        });
      }
      
      return leaderboard;
    } else {
      // Fallback
      return Object.entries(this.fallbackData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .map(([username, score], index) => ({
          username,
          score,
          rank: index + 1,
        }));
    }
  }

  async getUserScore(username: string): Promise<number> {
    if (this.redis) {
      const score = await this.redis.zscore('leaderboard', username);
      return score ? parseInt(score, 10) : 0;
    } else {
      return this.fallbackData[username] || 0;
    }
  }

  async getUserActions(username: string, limit: number = 20): Promise<Array<{ action: string; points: number; timestamp: string }>> {
    if (this.redis) {
      const actions = await this.redis.lrange(`user:${username}:actions`, 0, limit - 1);
      return actions.map(action => JSON.parse(action));
    } else {
      return [];
    }
  }
}

export const leaderboardService = new LeaderboardService();
