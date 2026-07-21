"use client";

import { useState } from "react";
import { Search as SearchIcon, ArrowLeft, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { allMoviesList } from "@/lib/mockData";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredMovies = query.length > 0
    ? allMoviesList.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <main className="min-h-screen bg-[#111111] pb-20 font-sans">
      <div className="flex items-center justify-between p-4 bg-[#111111] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <img src="/PHUMCINE.png" alt="PhumCine Logo" className="h-10 md:h-16 w-auto object-contain" />
          <span className="text-xl font-bold tracking-widest text-white">PHUMCINE</span>
        </Link>
      </div>
      
      <div className="px-4 pb-2 sticky top-[68px] bg-[#111111] z-40">
        <div className="relative w-full">
          <input 
            type="text" 
            placeholder="ស្វែងរករឿង..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#1a1b23] text-white rounded-full py-3.5 pl-12 pr-4 outline-none border border-gray-800 focus:border-red-600 transition-colors placeholder:text-gray-500"
          />
          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
             <SearchIcon className="text-white w-5 h-5" />
          </div>
        </div>
      </div>
      
      {!query && (
        <div className="p-4">
          <h3 className="text-textSecondary text-sm mb-4 font-medium">ការស្វែងរកពេញនិយម</h3>
          <div className="flex flex-wrap gap-2">
            {["ដុកទ័រហែកចិត្ត", "បាហុបាលី", "កំពូលដាវទី 13", "រឿងខ្មោច"].map((term) => (
              <button 
                key={term} 
                onClick={() => setQuery(term)}
                className="bg-surface px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-800 active:scale-95 transition-transform"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="p-4">
          <h3 className="text-textSecondary text-sm mb-4 font-medium">លទ្ធផលស្វែងរក: &quot;{query}&quot;</h3>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
              {filteredMovies.map(movie => (
                <div key={movie.id} className="w-full">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>មិនមានលទ្ធផលទេ 😢</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
