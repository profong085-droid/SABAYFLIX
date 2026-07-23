"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import PaymentModal from "@/components/PaymentModal";
import { allMoviesList } from "@/lib/mockData";
import type { Movie } from "@/lib/mockData";
import { getUserMovies, toggleUserMovie } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { Share2, Ban, Bookmark, BookmarkCheck, Download, CheckCircle2, User, Play, Star } from "lucide-react";
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface MovieViewProps {
  movie: Movie;
}

export default function MovieView({ movie }: MovieViewProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isPaid, setIsPaid] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    // Check local storage for instant paid state
    try {
      const localPurchased = JSON.parse(localStorage.getItem("purchased_movies") || "[]");
      if (localPurchased.includes(movie.id)) {
        setIsPaid(true);
      }
    } catch (e) {}

    async function loadUserData() {
      if (!user) return;
      
      // Record as watching
      await toggleUserMovie(user.uid, "watching", movie.id, true);

      // Fetch states
      const paidItems = await getUserMovies(user.uid, "purchased");
      if (paidItems.includes(movie.id)) {
        setIsPaid(true);
        try {
          const localPurchased = JSON.parse(localStorage.getItem("purchased_movies") || "[]");
          if (!localPurchased.includes(movie.id)) {
            localStorage.setItem("purchased_movies", JSON.stringify([...localPurchased, movie.id]));
          }
        } catch (e) {}
      }

      const savedItems = await getUserMovies(user.uid, "saved");
      if (savedItems.includes(movie.id)) setIsSaved(true);

      const downloadedItems = await getUserMovies(user.uid, "downloaded");
      if (downloadedItems.includes(movie.id)) setIsDownloaded(true);
    }
    
    loadUserData();
  }, [movie.id, user]);

  const toggleSave = async () => {
    if (!user) {
      showToast("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីរក្សាទុករឿងនេះ!", "info", "error");
      router.push("/login");
      return;
    }
    const added = await toggleUserMovie(user.uid, "saved", movie.id);
    setIsSaved(added);
  };

  const toggleDownload = async () => {
    if (!user) {
      showToast("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីទាញយករឿងនេះ!", "info", "error");
      router.push("/login");
      return;
    }
    const added = await toggleUserMovie(user.uid, "downloaded", movie.id);
    setIsDownloaded(added);
  };

  const handleShare = async () => {
    const movieUrl = `${window.location.origin}/movie/${movie.id}`;
    const shareData = {
      title: movie.title,
      text: `សូមទស្សនារឿង ${movie.title} នៅលើ PhumCine!`,
      url: movieUrl
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(movieUrl);
      showToast("បានចម្លងតំណរភ្ជាប់ (Link Copied)!", "success", "copy");
    }
  };

  const recommendedMovies = allMoviesList.filter(m => m.id !== movie.id).slice(0, 8);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <VideoPlayer movieId={movie.id} poster={movie.poster} isPaid={isPaid} videoUrl={movie.videoUrl} />

      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-3 lg:gap-16">
          
          {/* Left Column: Movie Details (70%) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Actions */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 animate-fadeInUp">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{movie.title}</h1>
              <div className="flex gap-3">
                <button 
                  onClick={toggleSave}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg border ${
                    isSaved 
                      ? 'glass border-red-500/20 text-white shadow-glow-red' 
                      : 'gradient-red-bright hover:shadow-glow-red text-white border-transparent'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  <span className="text-sm hidden sm:block">{isSaved ? "បានរក្សាទុក" : "រក្សាទុក"}</span>
                </button>
                <button 
                  onClick={toggleDownload}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg border ${
                    isDownloaded 
                      ? 'bg-green-500/20 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]' 
                      : 'glass border-white/10 text-white hover:border-white/20'
                  }`}
                >
                  {isDownloaded ? <CheckCircle2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleShare}
                  className="glass hover:bg-white/15 p-2.5 rounded-full shadow-lg transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-90">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-3 text-sm animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <span className="text-green-400 font-bold tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-green-400" />
                {movie.quality}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-gray-300">{movie.year}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="glass px-3 py-1 rounded-full text-gray-300 text-xs font-medium">{movie.type}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-gray-300">{movie.duration}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="text-gray-300">{movie.language}</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="glass px-3 py-1 rounded-full text-gray-300 text-xs font-medium">{movie.genre}</span>
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
              {movie.description || "ភាពយន្តនេះគឺជារឿងដែលគួរឱ្យចាប់អារម្មណ៍បំផុត ដែលនាំអ្នកទស្សនាចូលទៅក្នុងពិភពដ៏រំភើបមួយ។ ទស្សនាវគ្គថ្មីៗជាច្រើនទៀតដែលពោរពេញទៅដោយអាថ៌កំបាំងនិងឈុតឆាករន្ធត់។"}
            </p>

            {/* Cast & Crew */}
            <div className="pt-4 border-t border-white/5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 rounded-full gradient-red-bright" />
                អ្នកចូលរួមសម្តែង
              </h3>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0 group/cast">
                    <div className="relative">
                      {/* Gradient ring */}
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-red-500/40 to-transparent opacity-0 group-hover/cast:opacity-100 transition-opacity duration-300" />
                      <div className="relative w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center border border-gray-700/50 shadow-lg overflow-hidden">
                        <User className="w-8 h-8 text-gray-500 group-hover/cast:text-gray-400 transition-colors duration-300" />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 group-hover/cast:text-gray-300 transition-colors duration-300">តារា {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Banner */}
            <div className="animate-fadeInUp mt-8" style={{ animationDelay: '0.25s' }}>
              <div className="glass-card rounded-xl p-4 flex items-start gap-4 animate-border-glow" style={{ borderColor: 'rgba(220, 38, 38, 0.15)' }}>
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Ban className="w-5 h-5 text-red-500/80" />
                </div>
                <div>
                  <h3 className="text-red-400/90 font-medium mb-1">បម្រាម</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    ហាមលួចថតចម្លងវីដេអូ ឬទាញយកទៅចែកចាយបន្តលើបណ្តាញសង្គមដោយគ្មានការអនុញ្ញាត។ យើងនឹងចាត់វិធានការផ្លូវច្បាប់យ៉ាងម៉ឺងម៉ាត់។
                  </p>
                </div>
              </div>
            </div>

            {/* Payment / Buy Button Action */}
            <PaymentModal movieId={movie.id} isPaid={isPaid} setIsPaid={setIsPaid} />

            {/* Episodes List (Only for TV Series) */}
            {movie.episodes && movie.episodes.length > 0 && (
              <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-xl font-bold flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full gradient-red-bright" />
                    ភាគទាំងអស់
                  </h3>
                  <div className="glass px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors duration-300">
                    រដូវកាលទី ១ (Season 1)
                  </div>
                </div>
                
                <div className="space-y-3">
                  {movie.episodes.map((ep, idx) => (
                    <div key={ep.id} className="flex gap-4 p-3 rounded-2xl glass-card cursor-pointer group transition-all duration-300 hover:translate-x-1">
                      <div className="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                        <Image src={ep.image} alt={ep.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-10 h-10 glass rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="text-white font-medium text-sm md:text-base group-hover:text-red-400 transition-colors duration-300 mb-1">{idx + 1}. {ep.title}</h4>
                        <span className="text-xs text-gray-500">{ep.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: More Like This (30%) */}
          <div className="mt-12 lg:mt-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 rounded-full gradient-red-bright" />
              រឿងស្រដៀងគ្នា
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              {recommendedMovies.map((rm, idx) => (
                <MovieCard key={rm.id} movie={rm} index={idx} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
