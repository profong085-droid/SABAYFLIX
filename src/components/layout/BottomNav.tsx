"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, Search, Clapperboard, User } from "lucide-react";
import clsx from "clsx";
import { useCallback } from "react";

export default function BottomNav() {
  const pathname = usePathname();

  // Ripple effect handler
  const handleRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(220, 38, 38, 0.25);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    ripple.className = 'ripple';
    
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  // Hide BottomNav on movie detail pages so the payment modal action button is visible at the bottom
  if (pathname.startsWith("/movie/")) {
    return null;
  }

  const navItems = [
    { name: "ទំព័រដើម", href: "/", icon: Home },
    { name: "រឿងទាំងអស់", href: "/movies", icon: PlaySquare },
    { name: "ស្វែងរក", href: "/search", icon: Search, isMain: true },
    { name: "រឿងរបស់ខ្ញុំ", href: "/my-movies", icon: Clapperboard },
    { name: "គណនី", href: "/profile", icon: User },
  ];



  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full glass-strong z-50 flex items-center justify-between px-2 h-16 border-t border-white/5">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        if (item.isMain) {
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative flex flex-col items-center justify-center w-full ripple-container"
              onClick={handleRipple}
            >
              <div className={`absolute -top-7 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                isActive 
                  ? 'gradient-red-bright shadow-glow-red-lg scale-110' 
                  : 'bg-primary hover:shadow-glow-red active:scale-95'
              }`} style={{ width: '52px', height: '52px' }}>
                <item.icon className="w-5 h-5 text-white" />
                {/* Animated glow aura around active center button */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-full animate-auraPulse pointer-events-none" />
                    <div className="absolute -inset-2 rounded-full border border-red-500/20 animate-ping opacity-30 pointer-events-none" />
                  </>
                )}
                {/* Always-visible subtle glow */}
                <div className="absolute -inset-1 rounded-full bg-red-500/10 blur-md pointer-events-none" />
              </div>
              <span className={`text-[9px] mt-6 transition-colors duration-300 ${isActive ? 'text-red-400 font-medium' : 'text-textSecondary'}`}>{item.name}</span>
            </Link>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center w-full space-y-1 transition-all duration-300 active:scale-90 ripple-container relative",
              isActive ? "text-primary" : "text-textSecondary hover:text-white"
            )}
            onClick={handleRipple}
          >
            <div className="relative">
              <item.icon className={clsx("w-5 h-5 transition-all duration-300", isActive ? "fill-primary text-primary scale-110" : "")} />
              {/* Active indicator dot with glow */}
              {isActive && (
                <>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                  {/* Soft aura glow behind active icon */}
                  <div className="absolute -inset-2 bg-red-500/10 rounded-full blur-md pointer-events-none" />
                </>
              )}
            </div>
            <span className={`text-[9px] transition-colors duration-300 ${isActive ? 'text-red-400 font-medium' : ''}`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
