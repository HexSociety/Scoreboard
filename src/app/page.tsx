// app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          OpenSource Hack Tracker
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Track issues, pull requests, and contributions in real-time.
          Compete with your peers to climb the scoreboard as you contribute to
          open-source web development.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/repo"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-md"
          >
            View Repository
          </Link>
          <Link
            href="/scoreboard"
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 transition font-semibold shadow-md"
          >
            Scoreboard
          </Link>
        </div>
      </motion.div>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-20 max-w-4xl text-center"
      >
        <h2 className="text-3xl font-bold mb-6">How it Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-300">
          <div className="p-6 bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">1. Pick Issues</h3>
            <p>Choose open issues from the repo across multiple levels of difficulty.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">2. Make PRs</h3>
            <p>Solve the issues and submit pull requests. Your work is tracked automatically.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-3">3. Score Points</h3>
            <p>Every merged PR gives you points. Watch the live scoreboard and race to the top!</p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
