"use client";

import { Gift, Bell } from "lucide-react";

export default function TopNav() {
  return (
    <div className="flex items-center justify-between p-4 bg-background z-40 sticky top-0">
      <div className="flex items-center gap-2">
        {/* Simple Logo Replacement */}
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transform rotate-12">
          <div className="w-4 h-4 bg-white rounded-sm transform -rotate-12 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>
        <span className="text-xl font-bold tracking-wider text-white">SABAYFLIX</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-[10px] text-gray-400 mb-1">ប្រូម៉ូសិន</span>
          <div className="relative">
            <Gift className="w-6 h-6 text-yellow-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
          </div>
        </div>
        
        <div className="flex flex-col items-center cursor-pointer">
          <span className="text-[10px] text-gray-400 mb-1">សារថ្មីៗ</span>
          <div className="relative">
            <Bell className="w-6 h-6 text-yellow-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
