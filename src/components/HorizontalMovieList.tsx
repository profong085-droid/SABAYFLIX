"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import MovieCard from "./MovieCard";
import type { Movie } from "@/lib/mockData";
import Link from "next/link";

interface HorizontalMovieListProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
  progressData?: Record<string, number>;
}

export default function HorizontalMovieList({ title, movies, viewAllLink, progressData }: HorizontalMovieListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Section visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '80px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track scroll position for button visibility
  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={sectionRef}
      className={`py-4 relative group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-6 rounded-full gradient-red-bright shadow-glow-red" />
          <h2 className="text-lg font-bold text-white tracking-wide">{title}</h2>
        </div>
        {viewAllLink && (
          <Link 
            href={viewAllLink} 
            className="flex items-center gap-1 text-sm text-textSecondary hover:text-red-400 transition-colors duration-300 group/link"
          >
            <span className="hidden sm:inline text-xs">មើលទាំងអស់</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        )}
      </div>
      
      <div className="relative">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll("left")}
          className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 glass hover:bg-red-600/80 p-2.5 rounded-full text-white transition-all duration-300 shadow-glass border-white/10 ${
            canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="scroll-fade-edges">
          <div 
            ref={scrollRef} 
            className="flex overflow-x-auto gap-3 px-4 pb-4 scrollbar-hide"
          >
            {movies.map((movie, idx) => (
              <div key={movie.id} className="w-[110px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] flex-none">
                <MovieCard movie={movie} progress={progressData?.[movie.id]} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Right scroll button */}
        <button 
          onClick={() => scroll("right")}
          className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 glass hover:bg-red-600/80 p-2.5 rounded-full text-white transition-all duration-300 shadow-glass border-white/10 ${
            canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
