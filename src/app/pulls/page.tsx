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
      <main className="w-full max-w-6xl mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-2xl font-bold">Loading pull requests...</div>
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
          🔄 Pull Requests
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pull Requests List */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {data?.pulls.map((pull) => (
                <motion.a
                  key={pull.number}
                  href={pull.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 border-4 border-black shadow-[6px_6px_0px_black] rounded-2xl cursor-pointer transition-transform ${
                    pull.state === "merged"
                      ? "bg-green-300"
                      : pull.state === "closed"
                      ? "bg-red-300"
                      : "bg-blue-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold flex-1 mr-4">
                      #{pull.number}: {pull.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs font-bold border-2 border-black rounded-full ${
                          pull.state === "merged"
                            ? "bg-green-500 text-white"
                            : pull.state === "closed"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {pull.state.toUpperCase()}
                      </span>
                      {pull.score > 0 && (
                        <span className="px-3 py-1 text-xs font-bold bg-yellow-400 border-2 border-black rounded-full">
                          +{pull.score} pts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-black/80 mb-3">
                    <strong>By:</strong> {pull.user}
                  </div>

                  {pull.linkedLevels.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {pull.linkedLevels.map((level, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-purple-200 border-2 border-black rounded-full"
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  )}

                  {pull.body && (
                    <p className="text-sm text-black/70 line-clamp-2">
                      {pull.body.length > 100
                        ? pull.body.substring(0, 100) + "..."
                        : pull.body}
                    </p>
                  )}
                </motion.a>
              ))}

              {(!data?.pulls || data.pulls.length === 0) && (
                <div className="text-center py-12 px-6 border-4 border-black bg-gray-100 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2">No pull requests found</h3>
                  <p className="text-gray-600">
                    Start contributing to see pull requests here!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mini Leaderboard */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-black mb-4 px-4 py-2 border-4 border-black bg-white inline-block shadow-[6px_6px_0px_black] rounded-lg">
                🏆 Top Contributors
              </h2>
              <div className="space-y-3">
                {data?.leaderboard &&
                  Object.entries(data.leaderboard)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([user, score], index) => (
                      <div
                        key={user}
                        className={`p-4 border-4 border-black shadow-[4px_4px_0px_black] rounded-xl ${
                          index === 0
                            ? "bg-yellow-300"
                            : index === 1
                            ? "bg-gray-300"
                            : index === 2
                            ? "bg-orange-300"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                            </span>
                            <span className="font-bold">{user}</span>
                          </div>
                          <span className="font-bold text-lg">{score}</span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
