import { createClient, RedisClientType } from 'redis';

let redis: RedisClientType | null = null;
let isConnecting = false;
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 3;

export async function getRedisClient(): Promise<RedisClientType | null> {
  if (typeof window !== 'undefined') {
    // Client-side, no Redis
    return null;
  }

  // If we have a connected client, return it
  if (redis && redis.isReady) {
    return redis;
  }

  // If we're already connecting, wait a bit and return null
  if (isConnecting) {
    return null;
  }

  // If we've exceeded max attempts, return null
  if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
    return null;
  }

  const redisUrl = "rediss://red-d2pjo1ur433s73dd2vcg:e1EtnyipaurxKOirvT8n0u5RjPNNLKqF@oregon-keyvalue.render.com:6379";
  if (!redisUrl) {
    console.warn('REDIS_URL not configured');
    return null;
  }

  try {
    isConnecting = true;
    connectionAttempts++;
    
    // Create a new client with better error handling
    redis = createClient({ 
      url: redisUrl,
      socket: {
        reconnectStrategy: false, // Disable auto-reconnect to prevent loops
        connectTimeout: 5000,
      }
    });
    
    redis.on('error', (err) => {
      console.error(`Redis connection error (attempt ${connectionAttempts}):`, err.message);
      redis = null;
      isConnecting = false;
    });

    redis.on('ready', () => {
      console.log('Redis client ready');
      isConnecting = false;
      connectionAttempts = 0; // Reset on successful connection
    });

    redis.on('end', () => {
      console.log('Redis connection ended');
      redis = null;
      isConnecting = false;
    });

    // Connect with timeout
    await redis.connect();
    return redis;
    
  } catch (error) {
    console.error(`Failed to create Redis client (attempt ${connectionAttempts}):`, error);
    redis = null;
    isConnecting = false;
    return null;
  }
}

// Points system constants
export const POINTS = {
  MERGED_PR: 10,  // Base points for merged PRs
  // Level-based points for issues
  LEVEL_POINTS: {
    level1: 10,
    level2: 20,
    level3: 30,
    level4: 40,
    level5: 50,
  }
} as const;

// Leaderboard operations - Redis only, no fallbacks
export class LeaderboardService {
  private async getClient(): Promise<RedisClientType | null> {
    return await getRedisClient();
  }

  async addPoints(username: string, points: number, action: string): Promise<void> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      console.warn('Redis not available - points not recorded');
      return;
    }

    try {
      await client.zIncrBy('leaderboard', points, username);
      await client.lPush(`user:${username}:actions`, JSON.stringify({
        action,
        points,
        timestamp: new Date().toISOString(),
      }));
      await client.lTrim(`user:${username}:actions`, 0, 99);
      console.log(`Added ${points} points to ${username} for ${action}`);
    } catch (error) {
      console.error('Failed to add points:', error);
    }
  }

  async getLeaderboard(limit: number = 10): Promise<Array<{ username: string; score: number; rank: number }>> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      console.warn('Redis not available - returning empty leaderboard');
      return [];
    }

    try {
      const results = await client.zRangeWithScores('leaderboard', 0, limit - 1, { REV: true });
      
      return results.map((result, index) => ({
        username: result.value,
        score: result.score,
        rank: index + 1,
      }));
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return [];
    }
  }

  async getUserScore(username: string): Promise<number> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      return 0;
    }

    try {
      const score = await client.zScore('leaderboard', username);
      return score || 0;
    } catch (error) {
      console.error('Failed to get user score:', error);
      return 0;
    }
  }

  async getUserActions(username: string, limit: number = 20): Promise<Array<{ action: string; points: number; timestamp: string }>> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      return [];
    }

    try {
      const actions = await client.lRange(`user:${username}:actions`, 0, limit - 1);
      return actions.map(action => JSON.parse(action));
    } catch (error) {
      console.error('Failed to get user actions:', error);
      return [];
    }
  }

  // Track processed PRs to prevent duplicate scoring
  async hasPRBeenProcessed(prNumber: number): Promise<boolean> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      return false;
    }

    try {
      const result = await client.sIsMember('processed_prs', prNumber.toString());
      return result === 1;
    } catch (error) {
      console.error('Failed to check if PR was processed:', error);
      return false;
    }
  }

  async markPRAsProcessed(prNumber: number): Promise<void> {
    const client = await this.getClient();
    if (!client || !client.isReady) {
      return;
    }

    try {
      await client.sAdd('processed_prs', prNumber.toString());
    } catch (error) {
      console.error('Failed to mark PR as processed:', error);
    }
  }

  // Method to add points only if PR hasn't been processed
  async addPointsForPR(username: string, points: number, prNumber: number, action: string): Promise<boolean> {
    const alreadyProcessed = await this.hasPRBeenProcessed(prNumber);
    if (alreadyProcessed) {
      console.log(`PR #${prNumber} already processed, skipping points award`);
      return false;
    }

    await this.addPoints(username, points, action);
    await this.markPRAsProcessed(prNumber);
    console.log(`Awarded ${points} points to ${username} for PR #${prNumber}`);
    return true;
  }
}

export const leaderboardService = new LeaderboardService();
