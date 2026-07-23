"use client";

import { Gift, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "ទំព័រដើម", href: "/" },
    { name: "រឿងទាំងអស់", href: "/movies" },
    { name: "ស្វែងរក", href: "/search" },
    { name: "រឿងរបស់ខ្ញុំ", href: "/my-movies" },
    { name: "គណនី", href: "/profile" },
  ];

  return (
    <div className={`z-40 sticky top-0 transition-all duration-500 ${
      scrolled 
        ? 'glass-strong shadow-glass' 
        : 'bg-background/80 backdrop-blur-sm border-b border-gray-900/30'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative animate-float" style={{ animationDuration: '4s' }}>
            <Image src="/PHUMCINE.png" alt="PhumCine Logo" width={180} height={64} priority className="h-10 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
            {/* Logo glow — always visible, intensifies on hover */}
            <div className="absolute inset-0 bg-red-500/8 blur-xl rounded-full opacity-50 group-hover:opacity-100 group-hover:bg-red-500/15 transition-all duration-500 pointer-events-none" />
          </div>
          <span className="text-lg font-bold tracking-wider text-white group-hover:text-red-400 transition-colors duration-300">PHUMCINE</span>
        </Link>

      {/* Desktop Navigation Links — with active indicator */}
      <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`relative text-sm font-medium group/nav transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
              {/* Animated underline — persistent for active, hover for others */}
              <span className={`absolute -bottom-1 left-0 h-0.5 gradient-red-bright rounded-full transition-all duration-300 ${
                isActive 
                  ? 'w-full shadow-glow-red' 
                  : 'w-0 group-hover/nav:w-full'
              }`} />
              {/* Active glow dot */}
              {isActive && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/promotions" className="flex flex-col items-center cursor-pointer group/icon transition-all">
          <span className="text-[10px] text-gray-400 mb-1 group-hover/icon:text-yellow-400 transition-colors duration-300">ប្រូម៉ូសិន</span>
          <div className="relative">
            <Gift className="w-6 h-6 text-yellow-500 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-12 group-hover/icon:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-dot-pulse" />
            {/* Notification glow ring */}
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border border-red-500/30 animate-ping opacity-60" />
          </div>
        </Link>
        
        <Link href="/notifications" className="flex flex-col items-center cursor-pointer group/icon transition-all">
          <span className="text-[10px] text-gray-400 mb-1 group-hover/icon:text-yellow-400 transition-colors duration-300">សារថ្មីៗ</span>
          <div className="relative">
            <Bell className="w-6 h-6 text-yellow-500 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12 group-hover/icon:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-dot-pulse" style={{ animationDelay: '0.3s' }} />
            {/* Notification glow ring */}
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full border border-red-500/30 animate-ping opacity-60" style={{ animationDelay: '0.5s' }} />
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
