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

  const developers = [
    {
      name: "Alex Chen",
      role: "Full Stack Dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/alexchen",
        instagram: "https://instagram.com/alexchen_dev",
        twitter: "https://twitter.com/alexchen_dev"
      }
    },
    {
      name: "Sarah Kim",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      social: {
        linkedin: "https://linkedin.com/in/sarahkim",
        instagram: "https://instagram.com/sarah_designs",
        twitter: "https://twitter.com/sarah_designs"
      }
    }
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left Developer Box - Hidden on smaller screens */}
        <div className="hidden lg:block bg-white/95 border-4 border-black rounded-xl neobrutalist-shadow p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={developers[0].avatar} 
              alt={developers[0].name}
              className="w-12 h-12 rounded-full border-2 border-black object-cover"
            />
            <div>
              <h3 className="font-black text-sm">{developers[0].name}</h3>
              <p className="text-xs text-gray-600">{developers[0].role}</p>
              <div className="flex gap-1 mt-1">
                <a href={developers[0].social.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="w-5 h-5 bg-blue-600 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">in</span>
                </a>
                <a href={developers[0].social.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-pink-500 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">📷</span>
                </a>
                <a href={developers[0].social.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-blue-400 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4 px-4 sm:px-8 py-3 bg-white/95 border-4 border-black rounded-2xl neobrutalist-shadow-lg backdrop-blur-sm mx-4 lg:mx-0">
          <div className="flex items-center gap-2 mr-2 sm:mr-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-professional rounded-full border-2 border-black flex items-center justify-center">
              <span className="text-white font-black text-xs sm:text-sm">🚀</span>
            </div>
            <h1 className="font-black text-lg sm:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ship-It
            </h1>
          </div>
          <div className="flex gap-1 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-2 sm:px-4 py-2 border-2 border-black font-bold transition-all duration-200 rounded-lg
                  hover-lift text-xs sm:text-sm
                  ${pathname === item.href 
                    ? `${item.color} neobrutalist-shadow` 
                    : `bg-white hover:bg-gray-100 neobrutalist-shadow`
                  }
                `}
              >
                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Developer Box - Hidden on smaller screens */}
        <div className="hidden lg:block bg-white/95 border-4 border-black rounded-xl neobrutalist-shadow p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={developers[1].avatar} 
              alt={developers[1].name}
              className="w-12 h-12 rounded-full border-2 border-black object-cover"
            />
            <div>
              <h3 className="font-black text-sm">{developers[1].name}</h3>
              <p className="text-xs text-gray-600">{developers[1].role}</p>
              <div className="flex gap-1 mt-1">
                <a href={developers[1].social.linkedin} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-blue-600 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">in</span>
                </a>
                <a href={developers[1].social.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-pink-500 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">📷</span>
                </a>
                <a href={developers[1].social.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-blue-400 rounded border border-black flex items-center justify-center hover-lift">
                  <span className="text-white text-xs">🐦</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Developer Info - Shows below navbar on smaller screens */}
      <div className="lg:hidden mt-4 flex justify-center gap-4">
        {developers.map((dev, index) => (
          <div key={index} className="bg-white/95 border-4 border-black rounded-xl neobrutalist-shadow p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={dev.avatar} 
                alt={dev.name}
                className="w-8 h-8 rounded-full border-2 border-black object-cover"
              />
              <div>
                <h3 className="font-black text-xs">{dev.name}</h3>
                <div className="flex gap-1 mt-1">
                  <a href={dev.social.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="w-4 h-4 bg-blue-600 rounded border border-black flex items-center justify-center hover-lift">
                    <span className="text-white text-xs">in</span>
                  </a>
                  <a href={dev.social.instagram} target="_blank" rel="noopener noreferrer"
                     className="w-4 h-4 bg-pink-500 rounded border border-black flex items-center justify-center hover-lift">
                    <span className="text-white text-xs">📷</span>
                  </a>
                  <a href={dev.social.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-4 h-4 bg-blue-400 rounded border border-black flex items-center justify-center hover-lift">
                    <span className="text-white text-xs">🐦</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
