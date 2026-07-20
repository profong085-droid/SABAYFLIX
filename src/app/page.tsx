"use client";

import { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import HeroCarousel from "@/components/HeroCarousel";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import { featuredMovies, trendingMovies, mostWatchedMovies, allMoviesList } from "@/lib/mockData";

export default function Home() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeMovie = featuredMovies[activeHeroIndex];

  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-700 pb-20">
      <TopNav />
      
      {/* Featured Carousel */}
      <div className="mt-2">
        <HeroCarousel movies={featuredMovies} onIndexChange={setActiveHeroIndex} />
      </div>
      
      {/* Movie Details Snippet for the active featured movie */}
      {activeMovie && (
        <div className="px-4 py-4 mt-2 mx-4 bg-[#1a1b23] rounded-2xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[17px] font-bold text-white leading-snug">{activeMovie.title}</h2>
            <button className="bg-red-600 p-2 rounded-full shadow-lg shadow-red-600/30 flex-shrink-0 ml-4 active:scale-95 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">{activeMovie.year}</span>
            <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">{activeMovie.genre}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[11px] text-gray-400 mb-1">
            <div className="flex justify-between items-center pr-2"><span className="">ភាសា:</span> <span className="text-red-500 font-bold">{activeMovie.language}</span></div>
            <div className="flex justify-between items-center"><span className="">រយៈពេល:</span> <span className="text-red-500 font-bold">{activeMovie.duration}</span></div>
            <div className="flex justify-between items-center pr-2"><span className="">គុណភាព:</span> <span className="text-red-500 font-bold">{activeMovie.quality}</span></div>
            <div className="flex justify-between items-center"><span className="">ប្រភេទរឿង:</span> <span className="bg-green-700/80 text-white px-2 py-0.5 rounded-full font-bold ml-1 text-[10px]">ទិញ</span></div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <HorizontalMovieList 
          title="រឿងថ្មីៗទើបបញ្ចូល" 
          movies={allMoviesList.slice(-3)} 
          viewAllLink="/movies?filter=new" 
        />
        
        <HorizontalMovieList 
          title="រឿងកំពុងពេញនិយមថ្មីៗ" 
          movies={trendingMovies} 
          viewAllLink="/movies?filter=trending" 
        />
        
        <HorizontalMovieList 
          title="អ្នកទស្សនាច្រើន" 
          movies={mostWatchedMovies} 
          viewAllLink="/movies?filter=most_watched" 
        />

        <HorizontalMovieList 
          title="រឿងសកម្ម" 
          movies={allMoviesList.filter(m => m.genre === "សកម្មភាព")} 
          viewAllLink="/movies?filter=action" 
        />
      </div>
    </main>
  );
}
