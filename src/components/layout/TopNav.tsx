"use client";

import { Gift, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`z-40 sticky top-0 transition-all duration-500 ${
      scrolled 
        ? 'glass-strong shadow-glass' 
        : 'bg-background/80 backdrop-blur-sm border-b border-gray-900/30'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Image src="/PHUMCINE.png" alt="PhumCine Logo" width={180} height={64} priority className="h-10 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            {/* Subtle logo glow */}
            <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
          <span className="text-lg font-bold tracking-wider text-white group-hover:text-red-400 transition-colors duration-300">PHUMCINE</span>
        </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
        <Link href="/" className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group/nav">
          ទំព័រដើម
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 group-hover/nav:w-full" />
        </Link>
        <Link href="/movies" className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group/nav">
          រឿងទាំងអស់
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 group-hover/nav:w-full" />
        </Link>
        <Link href="/search" className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group/nav">
          ស្វែងរក
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 group-hover/nav:w-full" />
        </Link>
        <Link href="/my-movies" className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group/nav">
          រឿងរបស់ខ្ញុំ
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 group-hover/nav:w-full" />
        </Link>
        <Link href="/profile" className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group/nav">
          គណនី
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 group-hover/nav:w-full" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/promotions" className="flex flex-col items-center cursor-pointer group/icon transition-all">
          <span className="text-[10px] text-gray-400 mb-1 group-hover/icon:text-yellow-400 transition-colors duration-300">ប្រូម៉ូសិន</span>
          <div className="relative">
            <Gift className="w-6 h-6 text-yellow-500 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-dot-pulse" />
          </div>
        </Link>
        
        <Link href="/notifications" className="flex flex-col items-center cursor-pointer group/icon transition-all">
          <span className="text-[10px] text-gray-400 mb-1 group-hover/icon:text-yellow-400 transition-colors duration-300">សារថ្មីៗ</span>
          <div className="relative">
            <Bell className="w-6 h-6 text-yellow-500 transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-dot-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
