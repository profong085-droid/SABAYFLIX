"use client";

import { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import MovieCard from "@/components/MovieCard";
import { allMoviesList } from "@/lib/mockData";
import { ArrowDownUp } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const tabs = ["រឿងទាំងអស់", "សកម្មភាព", "ភ័យរន្ធត់", "កំប្លែង", "វិទ្យាសាស្ត្រ", "មនោសញ្ចេតនា"];

export default function AllMoviesPage() {
  const [activeTab, setActiveTab] = useState("រឿងទាំងអស់");

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <img src="/PHUMCINE.png" alt="PhumCine Logo" className="h-10 md:h-16 w-auto object-contain" />
          <span className="text-xl font-bold tracking-wider text-white">PHUMCINE</span>
        </Link>
        <span className="text-sm text-textSecondary">រឿងទាំងអស់</span>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 sticky top-[72px] bg-background z-30 overflow-x-auto no-scrollbar whitespace-nowrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm transition-colors flex-shrink-0",
              activeTab === tab ? "bg-primary text-white" : "bg-surface text-textSecondary border border-gray-800"
            )}
          >
            {tab}
          </button>
        ))}
        <button className="p-2 bg-surface border border-gray-800 rounded-lg text-textSecondary flex-shrink-0">
          <ArrowDownUp className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 px-4 pt-4">
        {allMoviesList
          .filter(movie => activeTab === "រឿងទាំងអស់" || movie.genre === activeTab)
          .map(movie => (
          <div key={movie.id} className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-300">
             <div className="w-full">
               <MovieCard movie={movie} />
             </div>
          </div>
        ))}
      </div>
    </main>
  );
}
