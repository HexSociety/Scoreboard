"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-200 text-black">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-6xl font-black mb-6 px-6 py-4 border-4 border-black bg-white shadow-[8px_8px_0px_black] inline-block rounded-lg">
          OpenSource Hack Tracker
        </h1>
        <p className="text-lg mb-8 px-4 py-3 border-4 border-black bg-pink-300 shadow-[6px_6px_0px_black] rounded-lg">
          Track issues, pull requests, and contributions in real-time.
          Compete with your peers to climb the scoreboard as you contribute to
          open-source web development.
        </p>

        <div className="flex gap-6 justify-center">
          <Link
            href="https://github.com/haard18/ship-it-users"
            className="px-6 py-3 border-4 border-black bg-blue-300 shadow-[6px_6px_0px_black] rounded-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            🔍 View Repository
          </Link>
          <Link
            href="/scoreboard"
            className="px-6 py-3 border-4 border-black bg-green-300 shadow-[6px_6px_0px_black] rounded-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            🏆 Scoreboard
          </Link>
        </div>
      </motion.div>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-20 max-w-5xl text-center"
      >
        <h2 className="text-4xl font-black mb-10 px-6 py-3 border-4 border-black bg-white shadow-[6px_6px_0px_black] inline-block rounded-lg">
          How it Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border-4 border-black bg-purple-300 shadow-[6px_6px_0px_black] rounded-xl">
            <h3 className="text-xl font-bold mb-3">1. Pick Issues</h3>
            <p className="font-medium">
              Choose open issues from the repo across multiple levels of difficulty.
            </p>
          </div>
          <div className="p-6 border-4 border-black bg-orange-300 shadow-[6px_6px_0px_black] rounded-xl">
            <h3 className="text-xl font-bold mb-3">2. Make PRs</h3>
            <p className="font-medium">
              Solve the issues and submit pull requests. Your work is tracked automatically.
            </p>
          </div>
          <div className="p-6 border-4 border-black bg-teal-300 shadow-[6px_6px_0px_black] rounded-xl">
            <h3 className="text-xl font-bold mb-3">3. Score Points</h3>
            <p className="font-medium">
              Every merged PR gives you points. Watch the live scoreboard and race to the top!
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
