"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { allMoviesList } from "@/lib/mockData";
import type { Movie } from "@/lib/mockData";
import { getStoredItems } from "@/lib/storage";
import { VideoOff, Play } from "lucide-react";
import Link from "next/link";

export default function MyMoviesPage() {
  const [activeTab, setActiveTab] = useState("bought");
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [watchList, setWatchList] = useState<Movie[]>([]);
  const [watchingMovies, setWatchingMovies] = useState<Movie[]>([]);
  const [downloadedMovies, setDownloadedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Load purchased movies
    const paidIds = getStoredItems("sabayflix_purchased");
    setSavedMovies(allMoviesList.filter(m => paidIds.includes(m.id)));

    // Load saved movies (watchlist)
    const savedIds = getStoredItems("sabayflix_saved");
    setWatchList(allMoviesList.filter(m => savedIds.includes(m.id)));

    // Load watching movies
    const watchingIds = getStoredItems("sabayflix_watching");
    setWatchingMovies(watchingIds.map(id => allMoviesList.find(m => m.id === id)).filter(Boolean) as Movie[]);

    // Load downloaded movies
    const downloadedIds = getStoredItems("sabayflix_downloaded");
    setDownloadedMovies(allMoviesList.filter(m => downloadedIds.includes(m.id)));
  }, []);
  
  // Use different mock data lists for different tabs
  let displayMovies: Movie[] = [];
  if (activeTab === "bought") {
     displayMovies = savedMovies;
  } else if (activeTab === "saved") {
     displayMovies = watchList;
  } else if (activeTab === "watching") {
     displayMovies = watchingMovies;
  } else if (activeTab === "downloaded") {
     displayMovies = downloadedMovies;
  }

  const tabs = [
    { id: "bought", label: "រឿងបានទិញ" },
    { id: "watching", label: "រឿងកំពុងមើល" },
    { id: "saved", label: "រឿងបានរក្សាទុក" },
    { id: "downloaded", label: "រឿងទាញយក" },
  ];

  return (
    <main className="min-h-screen bg-[#111111] pb-24 font-sans">
      {/* TopNav */}
      <div className="flex items-center justify-between p-4 bg-[#111111] sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
             <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-xl font-bold tracking-widest text-white">SABAYFLIX</span>
        </Link>
        <Link href="/movies" className="text-gray-400 text-sm hover:text-white">
          រឿងទាំងអស់
        </Link>
      </div>
      
      {/* Scrollable Tabs */}
      <div className="overflow-x-auto no-scrollbar border-b border-gray-800 bg-[#111111] sticky top-[68px] z-30">
        <div className="flex px-4 min-w-max">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-red-600' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                 <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {displayMovies.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 px-4 pt-4 animate-in fade-in zoom-in-95 duration-300">
          {displayMovies.map(movie => (
            <div key={movie.id} className="w-full">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 px-8 flex flex-col items-center">
           <VideoOff className="w-24 h-24 text-gray-700 mb-6" strokeWidth={1} />
           <p className="text-gray-400 text-sm leading-relaxed">
             សូមអភ័យទោសមើលទៅអ្នកហាក់ដូចជាមិនទាន់មាន<br/>រឿងនៅក្នុងបញ្ជីនេះនៅឡើយទេ។
           </p>
        </div>
      )}
    </main>
  );
}
