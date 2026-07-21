"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Movie } from "@/lib/mockData";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserMovies, toggleUserMovie } from "@/lib/db";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
  progress?: number; // 0 to 100
}

export default function MovieCard({ movie, progress }: MovieCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

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
    e.preventDefault(); // Prevent navigating to movie
    if (!user) {
      alert("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីរក្សាទុករឿងនេះ!");
      router.push("/login");
      return;
    }
    
    // Optimistic UI update
    setIsSaved(!isSaved);
    const added = await toggleUserMovie(user.uid, "saved", movie.id);
    setIsSaved(added);
  };


  return (
    <Link href={`/movie/${movie.id}`} className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-surface border border-gray-800 transition-transform active:scale-95">
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        {/* We use standard img for mock since next/image might have config issues with random external URLs if not fully configured, though I did add ** */}
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 pointer-events-none">
          <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm pointer-events-auto">សមាជិក</span>
         
          <div className="flex flex-col gap-2 pointer-events-auto">
            <button 
              className="p-1.5 bg-black/40 rounded-full backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors" 
              onClick={handleSave}
            >
              <Heart className={`w-4 h-4 transition-all ${isSaved ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'}`} />
            </button>
          </div>
        </div>

        {/* Progress Bar overlay */}
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/80 z-20">
            <div 
              className="h-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}
      </div>
      
      <div className="p-2 space-y-1">
        <h3 className="text-sm text-textPrimary font-medium truncate">{movie.title}</h3>
        <div className="flex items-center text-xs text-textSecondary">
          <span className="w-3 h-3 border-2 border-gray-500 rounded-full mr-1 opacity-50"></span>
          {movie.duration}
        </div>
      </div>
    </Link>
  );
}
