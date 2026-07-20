"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, Search, Clapperboard, User } from "lucide-react";
import clsx from "clsx";

export default function BottomNav() {
  const pathname = usePathname();

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
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-gray-800 z-50 flex items-center justify-between px-2 h-14">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        if (item.isMain) {
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-full">
              <div className="absolute -top-7 flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-lg border-4 border-surface">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[9px] text-textSecondary mt-6">{item.name}</span>
            </Link>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center w-full space-y-1 transition-colors",
              isActive ? "text-primary" : "text-textSecondary hover:text-white"
            )}
          >
            <item.icon className={clsx("w-5 h-5", isActive ? "fill-primary text-primary" : "")} />
            <span className="text-[9px]">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
