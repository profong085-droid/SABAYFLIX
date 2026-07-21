"use client";

import { useState } from "react";
import TopNav from "@/components/layout/TopNav";
import HeroCarousel from "@/components/HeroCarousel";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import { featuredMovies, trendingMovies, mostWatchedMovies, allMoviesList } from "@/lib/mockData";
import { Share2 } from "lucide-react";

export default function Home() {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeMovie = featuredMovies[activeHeroIndex];

  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-700 pb-20">
      <TopNav />
      
      {/* Featured Carousel */}
      <div className="mt-2 max-w-6xl mx-auto w-full">
        <HeroCarousel movies={featuredMovies} onIndexChange={setActiveHeroIndex} />
      </div>
      
      {/* Movie Details Snippet for the active featured movie */}
      {activeMovie && (
        <div className="px-4 py-4 mt-2 mx-4 md:mx-auto max-w-6xl bg-[#1a1b23] rounded-2xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[17px] md:text-xl lg:text-2xl font-bold text-white leading-snug">{activeMovie.title}</h2>
            <button className="bg-red-600 p-2 rounded-full shadow-lg shadow-red-600/30 flex-shrink-0 ml-4 active:scale-95 transition-transform">
               <Share2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-red-600 text-white font-bold text-[10px] md:text-xs lg:text-sm px-2 py-0.5 md:px-3 md:py-1 rounded uppercase tracking-wider">{activeMovie.year}</span>
            <span className="bg-red-600 text-white font-bold text-[10px] md:text-xs lg:text-sm px-2 py-0.5 md:px-3 md:py-1 rounded uppercase tracking-wider">{activeMovie.genre}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[11px] md:text-sm lg:text-base text-gray-400 mb-1">
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px]">ភាសា:</span> <span className="text-red-500 font-bold">{activeMovie.language}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px]">រយៈពេល:</span> <span className="text-red-500 font-bold">{activeMovie.duration}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px]">គុណភាព:</span> <span className="text-red-500 font-bold">{activeMovie.quality}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px]">ប្រភេទរឿង:</span> <span className="bg-green-700/80 text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-[10px] md:text-xs lg:text-sm">ទិញ</span></div>
          </div>
        </div>
      )}

      <div className="mt-4 max-w-6xl mx-auto w-full flex flex-col gap-2">
        <HorizontalMovieList 
          title="រឿងថ្មីៗទើបបញ្ចូល" 
          movies={allMoviesList.slice(-10).reverse()} 
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
          title="រឿងសកម្មភាព" 
          movies={allMoviesList.filter(m => m.genre === "សកម្មភាព" || m.genre === "បាញ់ប្រហារ")} 
          viewAllLink="/movies?filter=action" 
        />

        <HorizontalMovieList 
          title="រឿងមនោសញ្ចេតនា" 
          movies={allMoviesList.filter(m => m.genre === "មនោសញ្ចេតនា" || m.type === "រឿងភាគ")} 
          viewAllLink="/movies?filter=romance" 
        />

        <HorizontalMovieList 
          title="រឿងទិព្វ និងរន្ធត់" 
          movies={allMoviesList.filter(m => m.genre === "ទិព្វ" || m.genre === "ភ័យរន្ធត់")} 
          viewAllLink="/movies?filter=horror" 
        />
      </div>
    </main>
  );
}
