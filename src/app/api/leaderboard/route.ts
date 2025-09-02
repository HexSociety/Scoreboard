// src/app/api/leaderboard/route.ts
import { NextRequest } from 'next/server';
import { leaderboardService, POINTS } from '../redis';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const username = searchParams.get('user');

    if (username) {
      // Get specific user data
      const [score, actions] = await Promise.all([
        leaderboardService.getUserScore(username),
        leaderboardService.getUserActions(username, 20),
      ]);

      return Response.json({
        username,
        score,
        actions,
        pointsSystem: POINTS,
      });
    } else {
      // Get leaderboard
      const leaderboard = await leaderboardService.getLeaderboard(limit);
      
      return Response.json({
        leaderboard,
        pointsSystem: POINTS,
        total: leaderboard.length,
      });
    }
  } catch (error) {
    console.error('Leaderboard API error:', error);
    return Response.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, action, points } = body;

    if (!username || !action) {
      return Response.json(
        { error: 'Username and action are required' },
        { status: 400 }
      );
    }

    const pointsToAdd = points || POINTS[action as keyof typeof POINTS] || 0;
    
    await leaderboardService.addPoints(username, pointsToAdd, action);
    
    return Response.json({
      success: true,
      username,
      action,
      points: pointsToAdd,
    });
  } catch (error) {
    console.error('Add points error:', error);
    return Response.json(
      { error: 'Failed to add points' },
      { status: 500 }
    );
  }
}