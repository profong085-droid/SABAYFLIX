"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/layout/TopNav";
import HeroCarousel from "@/components/HeroCarousel";
import HorizontalMovieList from "@/components/HorizontalMovieList";
import { featuredMovies, trendingMovies, mostWatchedMovies, allMoviesList, Movie } from "@/lib/mockData";
import { Share2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getAllUserMovies } from "@/lib/db";
import { useToast } from "@/components/Toast";

// Particle configuration for background animation
const particles = [
  { size: 3, color: 'rgba(220, 38, 38, 0.15)', tx: '40px', ty: '-80px', duration: '7s', delay: '0s', top: '15%', left: '10%' },
  { size: 2, color: 'rgba(239, 68, 68, 0.1)', tx: '-30px', ty: '-60px', duration: '9s', delay: '1s', top: '25%', left: '85%' },
  { size: 4, color: 'rgba(220, 38, 38, 0.12)', tx: '50px', ty: '-100px', duration: '8s', delay: '2s', top: '45%', left: '20%' },
  { size: 2, color: 'rgba(245, 158, 11, 0.08)', tx: '-40px', ty: '-70px', duration: '10s', delay: '0.5s', top: '60%', left: '75%' },
  { size: 3, color: 'rgba(239, 68, 68, 0.1)', tx: '35px', ty: '-90px', duration: '6s', delay: '3s', top: '70%', left: '5%' },
  { size: 2, color: 'rgba(255, 255, 255, 0.05)', tx: '-25px', ty: '-50px', duration: '11s', delay: '1.5s', top: '35%', left: '50%' },
  { size: 3, color: 'rgba(220, 38, 38, 0.08)', tx: '45px', ty: '-75px', duration: '7.5s', delay: '4s', top: '80%', left: '40%' },
  { size: 2, color: 'rgba(245, 158, 11, 0.06)', tx: '-35px', ty: '-65px', duration: '9.5s', delay: '2.5s', top: '50%', left: '60%' },
];

export default function Home() {
  const { user } = useAuth();
  const { showToast } = useToast();
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
      showToast("បានចម្លងតំណរភ្ជាប់ (Link Copied)!", "success", "copy");
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20 relative overflow-hidden">
      {/* ===== Animated Floating Particles ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              top: p.top,
              left: p.left,
              '--tx': p.tx,
              '--ty': p.ty,
              '--duration': p.duration,
              '--delay': p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ===== Animated Color-Shifting Gradient Overlay ===== */}
      <div className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] blur-3xl animate-colorShift opacity-60"
          style={{
            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(139, 92, 246, 0.04) 25%, rgba(220, 38, 38, 0.06) 50%, rgba(245, 158, 11, 0.04) 75%, rgba(220, 38, 38, 0.08) 100%)',
            backgroundSize: '300% 300%',
          }}
        />
        {/* Secondary ambient orb */}
        <div 
          className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          }}
        />
      </div>

      <TopNav />
      
      {/* Featured Carousel */}
      <div className="mt-2 max-w-6xl mx-auto w-full animate-fadeInUp relative z-10">
        <HeroCarousel movies={featuredMovies} onIndexChange={setActiveHeroIndex} />
      </div>
      
      {/* Movie Details Snippet for the active featured movie */}
      {activeMovie && (
        <div className="px-4 py-5 mt-3 mx-4 md:mx-auto max-w-6xl glass-vibrant rounded-2xl animate-fadeInUp relative z-10" style={{ animationDelay: '0.15s' }}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-[17px] md:text-xl lg:text-2xl font-bold text-white leading-snug animate-textGlow">{activeMovie.title}</h2>
            <button 
              onClick={handleShare}
              className="gradient-red-bright p-2.5 rounded-full shadow-glow-red flex-shrink-0 ml-4 active:scale-90 transition-all duration-200 hover:shadow-glow-red-lg hover:scale-110"
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

      <div className="mt-6 max-w-6xl mx-auto w-full flex flex-col gap-0 relative z-10">
        {watchingMovies.length > 0 && (
          <>
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
            <div className="section-divider mx-8 my-1" />
          </>
        )}

        <HorizontalMovieList 
          title="រឿងថ្មីៗទើបបញ្ចូល" 
          movies={allMoviesList.slice(-10).reverse()} 
          viewAllLink="/movies?filter=new" 
        />
        
        <div className="section-divider mx-8 my-1" />
        
        <HorizontalMovieList 
          title="រឿងកំពុងពេញនិយមថ្មីៗ" 
          movies={trendingMovies} 
          viewAllLink="/movies?filter=trending" 
        />
        
        <div className="section-divider mx-8 my-1" />
        
        <HorizontalMovieList 
          title="អ្នកទស្សនាច្រើន" 
          movies={mostWatchedMovies} 
          viewAllLink="/movies?filter=most_watched" 
        />

        <div className="section-divider mx-8 my-1" />

        <HorizontalMovieList 
          title="រឿងសកម្មភាព" 
          movies={allMoviesList.filter(m => m.genre === "សកម្មភាព" || m.genre === "បាញ់ប្រហារ")} 
          viewAllLink="/movies?filter=action" 
        />

        <div className="section-divider mx-8 my-1" />

        <HorizontalMovieList 
          title="រឿងមនោសញ្ចេតនា" 
          movies={allMoviesList.filter(m => m.genre === "មនោសញ្ចេតនា" || m.type === "រឿងភាគ")} 
          viewAllLink="/movies?filter=romance" 
        />

        <div className="section-divider mx-8 my-1" />

        <HorizontalMovieList 
          title="រឿងទិព្វ និងរន្ធត់" 
          movies={allMoviesList.filter(m => m.genre === "ទិព្វ" || m.genre === "ភ័យរន្ធត់")} 
          viewAllLink="/movies?filter=horror" 
        />
      </div>
    </main>
  );
}
