"use client";

import { Gift, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TopNav() {
  return (
    <div className="bg-background z-40 sticky top-0 border-b border-gray-900/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
        <Image src="/PHUMCINE.png" alt="PhumCine Logo" width={180} height={64} priority className="h-10 md:h-16 w-auto object-contain" />
        <span className="text-lg font-bold tracking-wider text-white">PHUMCINE</span>
        </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 mr-auto ml-12">
        <Link href="/" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">ទំព័រដើម</Link>
        <Link href="/movies" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">រឿងទាំងអស់</Link>
        <Link href="/search" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">ស្វែងរក</Link>
        <Link href="/my-movies" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">រឿងរបស់ខ្ញុំ</Link>
        <Link href="/profile" className="text-gray-300 hover:text-primary transition-colors text-sm font-medium">គណនី</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/promotions" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[10px] text-gray-400 mb-1">ប្រូម៉ូសិន</span>
          <div className="relative">
            <Gift className="w-6 h-6 text-yellow-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
          </div>
        </Link>
        
        <Link href="/notifications" className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[10px] text-gray-400 mb-1">សារថ្មីៗ</span>
          <div className="relative">
            <Bell className="w-6 h-6 text-yellow-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
}
