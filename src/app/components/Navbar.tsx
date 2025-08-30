"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-6 py-2 bg-white border-4 border-black rounded-full shadow-[4px_4px_0_0_black]">
        <h1 className="font-extrabold text-xl mr-4">🚀 Ship-It</h1>
        <div className="flex gap-3">
          <Link
            href="/"
            className="px-3 py-1 border-2 border-black bg-pink-400 hover:bg-pink-500 transition-colors shadow-[2px_2px_0_0_black] rounded-md"
          >
            Home
          </Link>
          <Link
            href="/issues"
            className="px-3 py-1 border-2 border-black bg-green-400 hover:bg-green-500 transition-colors shadow-[2px_2px_0_0_black] rounded-md"
          >
            Issues
          </Link>
          <Link
            href="/pulls"
            className="px-3 py-1 border-2 border-black bg-blue-400 hover:bg-blue-500 transition-colors shadow-[2px_2px_0_0_black] rounded-md"
          >
            Pulls
          </Link>
          <Link
            href="/scoreboard"
            className="px-3 py-1 border-2 border-black bg-orange-400 hover:bg-orange-500 transition-colors shadow-[2px_2px_0_0_black] rounded-md"
          >
            Scoreboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
