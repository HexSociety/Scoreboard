// src/app/pulls/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Pull = {
  url: string;
  user: string;
  number: number;
  title: string;
  state: string;
  body?: string;
  linkedLevels: string[];
  score: number;
  commits: string;
  created_at?: string;
  updated_at?: string;
};

type PullsResponse = {
  pulls: Pull[];
  leaderboard: Record<string, number>;
};

export default function PullsPage() {
  const [data, setData] = useState<PullsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPulls = async () => {
      try {
        const response = await axios.get<PullsResponse>("/api/pulls");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch pull requests");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPulls();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-300/10 rounded-full blur-xl"></div>
          <div className="absolute top-3/4 right-1/6 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="p-8 bg-white border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <div className="text-2xl font-bold text-center">🔄 Loading pull requests...</div>
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
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-300/10 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/6 w-40 h-40 bg-purple-300/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 pt-8">
        <div className="text-center mb-8">
          <h1 className="inline-flex items-center gap-3 text-3xl md:text-4xl font-black px-8 py-4 bg-white border-4 border-black neobrutalist-shadow-lg rounded-2xl">
            <span className="text-2xl">�</span>
            Pull Requests
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto px-4">
            Track pull requests and see how they contribute to the leaderboard!
          </p>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pull Requests List */}
              <div className="lg:col-span-2">
                <div className="grid gap-6">
                  {data?.pulls.map((pull, index) => (
                    <motion.a
                      key={pull.number}
                      href={pull.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`group p-6 border-4 border-black neobrutalist-shadow-lg rounded-2xl cursor-pointer hover-lift transition-all duration-300 ${
                        pull.state === "merged"
                          ? "bg-gradient-to-br from-green-200 to-green-300"
                          : pull.state === "closed"
                          ? "bg-gradient-to-br from-red-200 to-red-300"
                          : "bg-gradient-to-br from-blue-200 to-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold flex-1 mr-4 group-hover:text-purple-700 transition-colors">
                          #{pull.number}: {pull.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-full transition-all ${
                              pull.state === "merged"
                                ? "bg-green-500 text-white"
                                : pull.state === "closed"
                                ? "bg-red-500 text-white"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {pull.state === "merged" && "✅"} 
                            {pull.state === "closed" && "❌"} 
                            {pull.state === "open" && "🔄"} 
                            {pull.state.toUpperCase()}
                          </span>
                          {pull.score > 0 && (
                            <span className="px-3 py-1 text-xs font-bold bg-yellow-400 border-2 border-black rounded-full animate-pulse">
                              +{pull.score} pts ⚡
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-black/80 mb-3 flex items-center gap-2">
                        <span className="font-bold">👤 By:</span> 
                        <span className="px-2 py-1 bg-white/70 border border-black rounded-lg font-medium">
                          {pull.user}
                        </span>
                      </div>

                      {pull.linkedLevels.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          <span className="text-sm font-medium">🏷️ Levels:</span>
                          {pull.linkedLevels.map((level, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-purple-200 border-2 border-black rounded-full font-bold"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      )}

                      {pull.body && (
                        <p className="text-sm text-black/70 bg-white/50 p-3 rounded-lg border border-black/20">
                          {pull.body.length > 150
                            ? pull.body.substring(0, 150) + "..."
                            : pull.body}
                        </p>
                      )}
                    </motion.a>
                  ))}

                  {(!data?.pulls || data.pulls.length === 0) && (
                    <div className="text-center py-12 px-6 border-4 border-black bg-gradient-to-br from-gray-100 to-gray-200 neobrutalist-shadow rounded-2xl">
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold mb-2">No pull requests found</h3>
                      <p className="text-gray-600">
                        Start contributing to see pull requests here!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Mini Leaderboard */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <h2 className="text-xl md:text-2xl font-black mb-6 px-4 py-3 border-4 border-black bg-white neobrutalist-shadow-lg inline-block rounded-xl">
                    🏆 Top Contributors
                  </h2>
                  <div className="space-y-4">
                    {data?.leaderboard &&
                      Object.entries(data.leaderboard)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([user, score], index) => (
                          <motion.div
                            key={user}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 border-4 border-black neobrutalist-shadow rounded-xl hover-lift transition-all duration-300 ${
                              index === 0
                                ? "bg-gradient-to-br from-yellow-200 to-yellow-300"
                                : index === 1
                                ? "bg-gradient-to-br from-gray-200 to-gray-300"
                                : index === 2
                                ? "bg-gradient-to-br from-orange-200 to-orange-300"
                                : "bg-gradient-to-br from-white to-gray-100"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                                </span>
                                <span className="font-bold text-sm">{user}</span>
                              </div>
                              <span className="font-black text-lg text-purple-600">{score} pts</span>
                            </div>
                          </motion.div>
                        ))}
                    
                    {(!data?.leaderboard || Object.keys(data.leaderboard).length === 0) && (
                      <div className="text-center py-8 px-4 border-4 border-black bg-gray-100 rounded-xl">
                        <div className="text-3xl mb-2">📊</div>
                        <p className="text-sm font-medium text-gray-600">No scores yet!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
