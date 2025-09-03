"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport height */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative -mt-8">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-blue-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl relative z-10"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-4 border-black neobrutalist-shadow-xl rounded-2xl mb-6">
              <div className="w-12 h-12 bg-gradient-professional rounded-xl border-2 border-black flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ship-It
              </h1>
            </div>
          </div>
          
          <div className="relative">
            <p className="text-lg md:text-xl mb-8 px-6 py-4 border-4 border-black bg-gradient-to-r from-pink-200 to-purple-200 neobrutalist-shadow-lg rounded-2xl leading-relaxed">
              <span className="font-bold text-purple-800">🎮 Gamify your GitHub contributions!</span>
              <br />
              Turn coding into competition. Earn points for issues, PRs, and reviews. 
              Climb the leaderboard and become the ultimate Ship-It champion!
            </p>
            
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 border-2 border-black rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 border-2 border-black rounded-full animate-pulse delay-75"></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://github.com/haard18/final-test"
              className="group px-6 py-3 border-4 border-black bg-gradient-to-r from-blue-300 to-blue-400 neobrutalist-shadow rounded-xl font-bold hover-lift flex items-center gap-2"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🔍</span>
              View Repository
            </Link>
            <Link
              href="/scoreboard"
              className="group px-6 py-3 border-4 border-black bg-gradient-to-r from-green-300 to-green-400 neobrutalist-shadow rounded-xl font-bold hover-lift flex items-center gap-2"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🏆</span>
              Scoreboard
            </Link>
            <Link
              href="/issues"
              className="group px-6 py-3 border-4 border-black bg-gradient-to-r from-orange-300 to-orange-400 neobrutalist-shadow rounded-xl font-bold hover-lift flex items-center gap-2"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">🐛</span>
              Start Contributing
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Main content sections - appear on scroll */}
      <main className="flex flex-col items-center px-6 py-16">
        {/* Points System Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 p-6 bg-white/90 border-4 border-black neobrutalist-shadow-lg rounded-2xl max-w-4xl w-full relative z-10"
        >
          <h3 className="text-2xl font-black mb-6 text-center">⚡ Points System</h3>
          
          {/* Issue Levels */}
          <div>
            <h4 className="text-lg font-black mb-3 text-orange-800">🏆 Issue Difficulty Levels</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
              <div className="text-center p-3 bg-green-50 border-2 border-green-500 rounded-lg">
                <div className="text-xl mb-1">🟢</div>
                <div className="font-bold text-green-700">Level 1</div>
                <div className="text-xs text-green-600 mb-1">Beginner</div>
                <div className="text-green-700 font-black">+10 pts</div>
              </div>
              <div className="text-center p-3 bg-blue-50 border-2 border-blue-500 rounded-lg">
                <div className="text-xl mb-1">🔵</div>
                <div className="font-bold text-blue-700">Level 2</div>
                <div className="text-xs text-blue-600 mb-1">Easy</div>
                <div className="text-blue-700 font-black">+20 pts</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 border-2 border-yellow-500 rounded-lg">
                <div className="text-xl mb-1">🟡</div>
                <div className="font-bold text-yellow-700">Level 3</div>
                <div className="text-xs text-yellow-600 mb-1">Medium</div>
                <div className="text-yellow-700 font-black">+30 pts</div>
              </div>
              <div className="text-center p-3 bg-orange-50 border-2 border-orange-500 rounded-lg">
                <div className="text-xl mb-1">🟠</div>
                <div className="font-bold text-orange-700">Level 4</div>
                <div className="text-xs text-orange-600 mb-1">Hard</div>
                <div className="text-orange-700 font-black">+40 pts</div>
              </div>
              <div className="text-center p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <div className="text-xl mb-1">🔴</div>
                <div className="font-bold text-red-700">Level 5</div>
                <div className="text-xs text-red-600 mb-1">Expert</div>
                <div className="text-red-700 font-black">+50 pts</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              💡 Issue points are awarded when your PR solving that issue gets merged!
            </p>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl text-center w-full relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-10 px-6 py-3 border-4 border-black bg-white neobrutalist-shadow-lg inline-block rounded-2xl">
            🎯 How it Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-8 border-4 border-black bg-gradient-to-br from-purple-200 to-purple-300 neobrutalist-shadow-lg rounded-2xl hover-lift relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">🎯</div>
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-black mb-3">1. Contribute</h3>
              <p className="font-medium text-purple-800">
                Navigate to GitHub repository, solve issues, hit a pull request and help improve
                projects across the GitHub ecosystem.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-8 border-4 border-black bg-gradient-to-br from-orange-200 to-orange-300 neobrutalist-shadow-lg rounded-2xl hover-lift relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">⚡</div>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-black mb-3">2. Earn Points</h3>
              <p className="font-medium text-orange-800">
                Every merged pull request earns you points automatically tracked from GitHub
                activity. The more you contribute, the higher you climb!
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              className="group p-8 border-4 border-black bg-gradient-to-br from-teal-200 to-teal-300 neobrutalist-shadow-lg rounded-2xl hover-lift relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">👑</div>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-black mb-3">3. Compete</h3>
              <p className="font-medium text-teal-800">
                Watch the live scoreboard and compete with other developers in
                friendly rivalry. Become the Ship-It champion!
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  );
}
