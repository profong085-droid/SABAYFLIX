"use client";

import { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import MovieCard from "@/components/MovieCard";
import { allMoviesList } from "@/lib/mockData";
import { ArrowDownUp } from "lucide-react";
import clsx from "clsx";

const tabs = ["រឿងទាំងអស់", "រឿងឥណ្ឌា", "រឿងហូលីវូដ"];

export default function AllMoviesPage() {
  const [activeTab, setActiveTab] = useState("រឿងទាំងអស់");

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="flex items-center justify-between p-4 bg-background sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transform rotate-12">
            <div className="w-4 h-4 bg-white rounded-sm transform -rotate-12 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-wider text-white">SABAYFLIX</span>
        </div>
        <span className="text-sm text-textSecondary">រឿងទាំងអស់</span>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 sticky top-[72px] bg-background z-30">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm transition-colors flex-1",
              activeTab === tab ? "bg-primary text-white" : "bg-surface text-textSecondary border border-gray-800"
            )}
          >
            {tab}
          </button>
        ))}
        <button className="p-2 bg-surface border border-gray-800 rounded-lg text-textSecondary">
          <ArrowDownUp className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pt-4">
        {allMoviesList.map(movie => (
          <div key={movie.id} className="w-full flex justify-center">
             <div className="w-full">
               <MovieCard movie={movie} />
             </div>
          </div>
        ))}
      </div>
    </main>
  );
}
