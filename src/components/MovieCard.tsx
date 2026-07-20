import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Movie } from "@/lib/mockData";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-surface border border-gray-800 transition-transform active:scale-95">
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        {/* We use standard img for mock since next/image might have config issues with random external URLs if not fully configured, though I did add ** */}
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">សមាជិក</span>
         
          <button className="p-1">
            <Heart className="w-5 h-5 text-white drop-shadow-md" />
          </button>
        </div>
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
