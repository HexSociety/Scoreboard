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
      name: "Dev Patil",
      role: "Automation Engineer",
      avatar: "/assets/developers/dev.png",
      social: {
        linkedin: "https://www.linkedin.com/in/dev-patil-b92743241",
        instagram: "https://www.instagram.com/__dev.patil__",
        twitter: "https://x.com/Dev_Patil__"
      }
    },
    {
      name: "Haard Solanki",
      role: "Protocol Engineer",
      avatar: "/assets/developers/haard.png",
      social: {
        linkedin: "https://www.linkedin.com/in/haard-solanki-66084826a",
        instagram: "https://www.instagram.com/haard.solanki",
        twitter: "https://x.com/solanki_haard"
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
                   className="w-5 h-5 bg-[#0077B5] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={developers[0].social.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href={developers[0].social.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-[#1DA1F2] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
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
                   className="w-5 h-5 bg-[#0077B5] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={developers[1].social.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href={developers[1].social.twitter} target="_blank" rel="noopener noreferrer"
                   className="w-5 h-5 bg-[#1DA1F2] rounded border border-black flex items-center justify-center hover-lift">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
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
                     className="w-4 h-4 bg-[#0077B5] rounded border border-black flex items-center justify-center hover-lift">
                    <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={dev.social.instagram} target="_blank" rel="noopener noreferrer"
                     className="w-4 h-4 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded border border-black flex items-center justify-center hover-lift">
                    <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href={dev.social.twitter} target="_blank" rel="noopener noreferrer"
                     className="w-4 h-4 bg-[#1DA1F2] rounded border border-black flex items-center justify-center hover-lift">
                    <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
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
