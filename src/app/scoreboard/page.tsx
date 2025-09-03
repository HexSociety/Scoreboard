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
      <div className="min-h-screen relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-yellow-300/10 rounded-full blur-xl"></div>
          <div className="absolute top-3/4 right-1/6 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="p-8 bg-white border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <div className="text-2xl font-bold text-center">🏆 Loading scoreboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="p-8 bg-red-100 border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <div className="text-2xl font-bold text-red-600 text-center">❌ {error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-yellow-300/10 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-green-300/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <h1 className="inline-flex items-center gap-3 text-3xl md:text-4xl font-black px-8 py-4 bg-white border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <span className="text-2xl">🏆</span>
            Global Scoreboard
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto px-4">
            See who&apos;s leading the Ship-It competition! Click on any player to view their activity.
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Leaderboard */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={entry.username}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => fetchUserDetails(entry.username)}
                      className={`group p-6 border-4 border-black neobrutalist-shadow-lg rounded-2xl cursor-pointer hover-lift transition-all duration-300 ${
                        entry.rank === 1
                          ? "bg-gradient-to-br from-yellow-200 to-yellow-300"
                          : entry.rank === 2
                          ? "bg-gradient-to-br from-gray-200 to-gray-300"
                          : entry.rank === 3
                          ? "bg-gradient-to-br from-orange-200 to-orange-300"
                          : "bg-gradient-to-br from-white to-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl font-black flex flex-col items-center">
                            <span>
                              {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
                            </span>
                            {entry.rank <= 3 && (
                              <div className="text-xs font-bold mt-1">
                                {entry.rank === 1 && "CHAMPION"}
                                {entry.rank === 2 && "RUNNER-UP"}
                                {entry.rank === 3 && "THIRD"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold group-hover:text-purple-700 transition-colors">
                              {entry.username}
                            </h3>
                            <p className="text-sm text-black/70 flex items-center gap-2">
                              📈 Rank #{entry.rank}
                              <span className="px-2 py-1 bg-white/70 border border-black rounded-lg text-xs font-medium">
                                Click for details
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-purple-600 group-hover:scale-110 transition-transform">
                            {entry.score}
                          </div>
                          <div className="text-sm text-black/70 font-bold">⚡ points</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {leaderboard.length === 0 && (
                    <div className="text-center py-12 px-6 border-4 border-black bg-gradient-to-br from-gray-100 to-gray-200 neobrutalist-shadow rounded-2xl">
                      <div className="text-6xl mb-4">🏆</div>
                      <h3 className="text-xl font-bold mb-2">No scores yet</h3>
                      <p className="text-gray-600">
                        Be the first to contribute and earn points!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Scoring System Information */}
              <div className="lg:col-span-1 space-y-6">
                {pointsSystem && (
                  <div className="sticky top-24">
                    <h2 className="text-xl md:text-2xl font-black mb-6 px-4 py-3 border-4 border-black bg-white neobrutalist-shadow-lg inline-block rounded-xl">
                      🎮 Scoring System
                    </h2>
                    
                    {/* Issue Difficulty Levels */}
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-gray-800">🏷️ Issue Difficulty Bonus</h3>
                      <div className="space-y-2">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="p-2 border-2 border-black bg-gradient-to-r from-green-100 to-green-200 neobrutalist-shadow-sm rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs">🟢 Level 1 (Easy)</span>
                            <span className="font-black text-green-600 text-sm">+10</span>
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="p-2 border-2 border-black bg-gradient-to-r from-yellow-100 to-yellow-200 neobrutalist-shadow-sm rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs">🟡 Level 2 (Medium)</span>
                            <span className="font-black text-yellow-600 text-sm">+20</span>
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="p-2 border-2 border-black bg-gradient-to-r from-orange-100 to-orange-200 neobrutalist-shadow-sm rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs">🟠 Level 3 (Hard)</span>
                            <span className="font-black text-orange-600 text-sm">+30</span>
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="p-2 border-2 border-black bg-gradient-to-r from-red-100 to-red-200 neobrutalist-shadow-sm rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs">🔴 Level 4 (Expert)</span>
                            <span className="font-black text-red-600 text-sm">+40</span>
                          </div>
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="p-2 border-2 border-black bg-gradient-to-r from-purple-100 to-purple-200 neobrutalist-shadow-sm rounded-lg"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs">🟣 Level 5 (Master)</span>
                            <span className="font-black text-purple-600 text-sm">+50</span>
                          </div>
                        </motion.div>
                      </div>
                      <div className="mt-3 p-2 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg">
                        <p className="text-xs text-blue-700 font-medium">
                          💡 Issue points are added as bonus based on difficulty level!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced User Details Modal */}
            {selectedUser && userDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedUser(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white border-4 border-black neobrutalist-shadow-xl rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black flex items-center gap-2">
                      <span>👤</span> {userDetails.username}
                    </h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-2xl font-bold hover:bg-gray-100 w-10 h-10 rounded-full border-2 border-black hover-lift transition-all"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-200 to-yellow-300 border-4 border-black neobrutalist-shadow rounded-xl">
                      <div className="text-4xl font-black text-purple-600 mb-2">{userDetails.score}</div>
                      <div className="text-sm font-bold">⚡ Total Points</div>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span>📊</span> Recent Activity
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {userDetails.actions.map((action, index) => (
                      <div
                        key={index}
                        className="p-4 border-2 border-black bg-gradient-to-r from-gray-50 to-gray-100 neobrutalist-shadow rounded-lg"
                      >
                        <div className="font-bold text-sm mb-1">{action.action}</div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span className="px-2 py-1 bg-green-200 border border-black rounded font-bold">
                            +{action.points} points
                          </span>
                          <span>{new Date(action.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {userDetails.actions.length === 0 && (
                      <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-3xl mb-2">📭</div>
                        <div>No recent activity</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
