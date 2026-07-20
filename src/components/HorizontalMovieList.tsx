"use client";

import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/mockData";
import Link from "next/link";

interface HorizontalMovieListProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

export default function HorizontalMovieList({ title, movies, viewAllLink }: HorizontalMovieListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-4 relative group">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-medium text-textPrimary">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-textSecondary hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </Link>
        )}
      </div>
      
      <div className="relative">
        <button 
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm border border-gray-700 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-3 px-4 pb-4 scrollbar-hide snap-x scroll-smooth"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start w-[110px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] flex-none">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-red-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm border border-gray-700 shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
