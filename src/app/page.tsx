"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import HeroCarousel from "@/components/HeroCarousel";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import { featuredMovies, trendingMovies, mostWatchedMovies, allMoviesList, Movie } from "@/lib/mockData";
import { Share2, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAllUserMovies } from "@/lib/db";

export default function Home() {
  const { user } = useAuth();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeMovie = featuredMovies[activeHeroIndex];
  
  const [watchingMovies, setWatchingMovies] = useState<Movie[]>([]);
  const [watchProgress, setWatchProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadUserMovies() {
      if (user) {
        const lists = await getAllUserMovies(user.uid);
        if (lists.watching && lists.watching.length > 0) {
          const watching = lists.watching
            .map((id: string) => allMoviesList.find(m => m.id === id))
            .filter(Boolean) as Movie[];
          setWatchingMovies(watching.reverse()); // Show most recent first
        }
        if (lists.watchProgress) {
          setWatchProgress(lists.watchProgress);
        }
      } else {
        setWatchingMovies([]);
        setWatchProgress({});
      }
    }
    loadUserMovies();
  }, [user]);

  const handleShare = async () => {
    if (!activeMovie) return;
    const url = `${window.location.origin}/movie/${activeMovie.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeMovie.title,
          text: `សូមទស្សនារឿង ${activeMovie.title} នៅលើ PhumCine!`,
          url: url
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("បានចម្លងតំណរភ្ជាប់ (Link Copied)!");
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20 relative">
      {/* Ambient background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-red-600/8 via-transparent to-transparent blur-3xl" />
      </div>

      <TopNav />
      
      {/* Featured Carousel */}
      <div className="mt-2 max-w-6xl mx-auto w-full animate-fadeInUp relative z-10">
        <HeroCarousel movies={featuredMovies} onIndexChange={setActiveHeroIndex} />
      </div>
      
      {/* Movie Details Snippet for the active featured movie */}
      {activeMovie && (
        <div className="px-4 py-5 mt-3 mx-4 md:mx-auto max-w-6xl glass-card rounded-2xl animate-fadeInUp relative z-10" style={{ animationDelay: '0.15s' }}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[17px] md:text-xl lg:text-2xl font-bold text-white leading-snug">{activeMovie.title}</h2>
            <button 
              onClick={handleShare}
              className="gradient-red-bright p-2.5 rounded-full shadow-glow-red flex-shrink-0 ml-4 active:scale-90 transition-all duration-200 hover:shadow-glow-red-lg"
            >
               <Share2 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="gradient-red-bright text-white font-bold text-[10px] md:text-xs lg:text-sm px-2.5 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider shadow-glow-red">{activeMovie.year}</span>
            <span className="glass text-white font-medium text-[10px] md:text-xs lg:text-sm px-2.5 py-1 md:px-3 md:py-1 rounded-full tracking-wider">{activeMovie.genre}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[11px] md:text-sm lg:text-base text-gray-400 mb-1">
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px] text-gray-500">ភាសា:</span> <span className="text-red-400 font-semibold">{activeMovie.language}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px] text-gray-500">រយៈពេល:</span> <span className="text-red-400 font-semibold">{activeMovie.duration}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px] text-gray-500">គុណភាព:</span> <span className="text-green-400 font-semibold">{activeMovie.quality}</span></div>
            <div className="flex items-center"><span className="inline-block w-[75px] md:w-[100px] text-gray-500">ប្រភេទរឿង:</span> <span className="bg-green-500/20 text-green-400 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold text-[10px] md:text-xs lg:text-sm border border-green-500/20">ទិញ</span></div>
          </div>
        </div>
      )}

      <div className="mt-6 max-w-6xl mx-auto w-full flex flex-col gap-1 relative z-10">
        {watchingMovies.length > 0 && (
          <HorizontalMovieList 
            title="បន្តការទស្សនា" 
            movies={watchingMovies} 
            progressData={Object.fromEntries(
              watchingMovies.map(m => {
                const secondsWatched = watchProgress[m.id] || 0;
                // Parse duration "1h 30m" roughly
                let totalSeconds = 7200; // default 2 hours
                const match = m.duration.match(/(\d+)h\s*(?:(\d+)m)?/);
                if (match) {
                  totalSeconds = parseInt(match[1]) * 3600 + (parseInt(match[2] || "0")) * 60;
                }
                const pct = Math.min(100, Math.max(5, (secondsWatched / totalSeconds) * 100));
                return [m.id, pct];
              })
            )}
          />
        )}

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
