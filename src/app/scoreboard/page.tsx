// src/app/scoreboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type LeaderboardEntry = {
  username: string;
  score: number;
  rank: number;
};

type UserAction = {
  action: string;
  points: number;
  timestamp: string;
};

type PointsSystem = {
  CREATE_ISSUE: number;
  OPEN_PULL_REQUEST: number;
  REVIEW_PULL_REQUEST: number;
  MERGE_PULL_REQUEST: number;
  CLOSE_ISSUE_OR_PR: number;
};

type LeaderboardResponse = {
  leaderboard: LeaderboardEntry[];
  pointsSystem: PointsSystem;
  total: number;
};

type UserResponse = {
  username: string;
  score: number;
  actions: UserAction[];
  pointsSystem: PointsSystem;
};

export default function ScoreboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [pointsSystem, setPointsSystem] = useState<PointsSystem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardResponse>("/api/leaderboard?limit=20");
        setLeaderboard(response.data.leaderboard);
        setPointsSystem(response.data.pointsSystem);
      } catch (err) {
        setError("Failed to fetch leaderboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const fetchUserDetails = async (username: string) => {
    try {
      const response = await axios.get<UserResponse>(`/api/leaderboard?user=${username}`);
      setUserDetails(response.data);
      setSelectedUser(username);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  if (loading) {
    return (
      <main className="w-full max-w-6xl mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-2xl font-bold">Loading scoreboard...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="w-full max-w-6xl mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-2xl font-bold text-red-600">{error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-6xl mx-auto px-6 md:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-black mb-8 px-6 py-3 border-4 border-black bg-white shadow-[6px_6px_0px_black] inline-block rounded-lg">
          🏆 Global Scoreboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => fetchUserDetails(entry.username)}
                  className={`p-6 border-4 border-black shadow-[6px_6px_0px_black] rounded-2xl cursor-pointer hover:scale-105 transition-transform ${
                    entry.rank === 1
                      ? "bg-yellow-300"
                      : entry.rank === 2
                      ? "bg-gray-300"
                      : entry.rank === 3
                      ? "bg-orange-300"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-black">
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{entry.username}</h3>
                        <p className="text-sm text-black/70">Rank #{entry.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black">{entry.score}</div>
                      <div className="text-sm text-black/70">points</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {leaderboard.length === 0 && (
                <div className="text-center py-12 px-6 border-4 border-black bg-gray-100 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">No scores yet</h3>
                  <p className="text-gray-600">
                    Be the first to contribute and earn points!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Points System */}
            {pointsSystem && (
              <div className="sticky top-24">
                <h2 className="text-2xl font-black mb-4 px-4 py-2 border-4 border-black bg-white inline-block shadow-[6px_6px_0px_black] rounded-lg">
                  🎮 Points System
                </h2>
                <div className="space-y-3">
                  <div className="p-4 border-4 border-black bg-pink-300 shadow-[4px_4px_0px_black] rounded-xl">
                    <div className="text-sm font-bold mb-1">Create Issue</div>
                    <div className="text-2xl font-black">+{pointsSystem.CREATE_ISSUE}</div>
                  </div>
                  <div className="p-4 border-4 border-black bg-blue-300 shadow-[4px_4px_0px_black] rounded-xl">
                    <div className="text-sm font-bold mb-1">Open Pull Request</div>
                    <div className="text-2xl font-black">+{pointsSystem.OPEN_PULL_REQUEST}</div>
                  </div>
                  <div className="p-4 border-4 border-black bg-purple-300 shadow-[4px_4px_0px_black] rounded-xl">
                    <div className="text-sm font-bold mb-1">Review PR</div>
                    <div className="text-2xl font-black">+{pointsSystem.REVIEW_PULL_REQUEST}</div>
                  </div>
                  <div className="p-4 border-4 border-black bg-green-300 shadow-[4px_4px_0px_black] rounded-xl">
                    <div className="text-sm font-bold mb-1">Merge PR</div>
                    <div className="text-2xl font-black">+{pointsSystem.MERGE_PULL_REQUEST}</div>
                  </div>
                  <div className="p-4 border-4 border-black bg-orange-300 shadow-[4px_4px_0px_black] rounded-xl">
                    <div className="text-sm font-bold mb-1">Close Issue/PR</div>
                    <div className="text-2xl font-black">+{pointsSystem.CLOSE_ISSUE_OR_PR}</div>
                  </div>
                </div>
              </div>
            )}

            {/* User Details Modal */}
            {selectedUser && userDetails && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedUser(null)}
              >
                <div
                  className="bg-white border-4 border-black shadow-[8px_8px_0px_black] rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black">{userDetails.username}</h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-2xl font-bold hover:bg-gray-100 w-8 h-8 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-center p-4 bg-yellow-300 border-4 border-black rounded-xl">
                      <div className="text-3xl font-black">{userDetails.score}</div>
                      <div className="text-sm font-bold">Total Points</div>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-3">Recent Activity</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {userDetails.actions.map((action, index) => (
                      <div
                        key={index}
                        className="p-3 border-2 border-black bg-gray-100 rounded-lg text-sm"
                      >
                        <div className="font-bold">{action.action}</div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>+{action.points} points</span>
                          <span>{new Date(action.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {userDetails.actions.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        No recent activity
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
