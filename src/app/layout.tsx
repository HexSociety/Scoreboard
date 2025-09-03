import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🚀 Ship-It - Gamified GitHub Contributions",
  description: "A fun, gamified platform that turns GitHub contributions into friendly competition. Track issues, PRs, and climb the scoreboard!",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 bg-dots-pattern text-black pt-32 lg:pt-32`}
        >
        <Navbar/>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
