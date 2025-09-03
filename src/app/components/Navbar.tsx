"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "🏠 Home", color: "bg-pink-400 hover:bg-pink-500" },
    { href: "/issues", label: "🐛 Issues", color: "bg-green-400 hover:bg-green-500" },
    { href: "/pulls", label: "🔀 Pulls", color: "bg-blue-400 hover:bg-blue-500" },
    { href: "/scoreboard", label: "🏆 Scoreboard", color: "bg-orange-400 hover:bg-orange-500" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-8 py-3 bg-white/95 border-4 border-black rounded-2xl neobrutalist-shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 bg-gradient-professional rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-white font-black text-sm">🚀</span>
          </div>
          <h1 className="font-black text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ship-It
          </h1>
        </div>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-4 py-2 border-2 border-black font-bold transition-all duration-200 rounded-lg
                hover-lift text-sm
                ${pathname === item.href 
                  ? `${item.color} neobrutalist-shadow` 
                  : `bg-white hover:bg-gray-100 neobrutalist-shadow`
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
