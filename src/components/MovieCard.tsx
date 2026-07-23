"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Play } from "lucide-react";
import type { Movie } from "@/lib/mockData";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserMovies, toggleUserMovie } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface MovieCardProps {
  movie: Movie;
  progress?: number; // 0 to 100
  index?: number; // for staggered animation
}

export default function MovieCard({ movie, progress, index = 0 }: MovieCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    async function checkSaved() {
      if (user) {
        const saved = await getUserMovies(user.uid, "saved");
        setIsSaved(saved.includes(movie.id));
      }
    }
    checkSaved();
  }, [user, movie.id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      showToast("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីរក្សាទុករឿងនេះ!", "info", "error");
      router.push("/login");
      return;
    }
    
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 600);
    
    setIsSaved(!isSaved);
    const added = await toggleUserMovie(user.uid, "saved", movie.id);
    setIsSaved(added);
  };

  return (
    <div>
      <Link href={`/movie/${movie.id}`} className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-surface/80 border border-white/5 card-3d gradient-border-animated shine-on-hover transition-all duration-400">
        <div className="relative w-full aspect-[2/3] overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          
          {/* Hover overlay with play icon — enhanced with pulsing glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="play-pulse w-11 h-11 rounded-full glass flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-400">
              <Play className="w-4.5 h-4.5 text-white fill-white ml-0.5" />
            </div>
          </div>
          
          {/* Top Badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
            <span className="gradient-red-bright text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-glow-red pointer-events-auto tracking-wide">
              សមាជិក
            </span>
           
            <div className="flex flex-col gap-2 pointer-events-auto">
              <button 
                className={`p-1.5 rounded-full glass transition-all duration-300 ${justSaved ? 'animate-heartBeat' : ''} ${isSaved ? 'bg-red-500/30 border-red-500/30' : 'hover:bg-white/20'}`}
                onClick={handleSave}
              >
                <Heart className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(220,38,38,0.6)]' : 'text-white hover:text-red-400'}`} />
              </button>
            </div>
          </div>

          {/* Quality badge */}
          <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
            <span className="text-[9px] font-bold text-green-400 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded border border-green-500/20">
              {movie.quality || "HD"}
            </span>
          </div>

          {/* Animated color accent strip at bottom of poster */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600/0 via-red-500/60 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Progress Bar overlay */}
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/80 z-20">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400 animate-progress-glow rounded-r-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="p-2.5 space-y-1 relative z-10">
          <h3 className="text-sm text-textPrimary font-medium truncate group-hover:text-red-400 transition-colors duration-300">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-textSecondary">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 group-hover:bg-green-400 group-hover:shadow-[0_0_6px_rgba(34,197,94,0.5)] transition-all duration-300" />
              {movie.duration}
            </span>
            <span className="text-[10px] text-gray-500">{movie.year}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
