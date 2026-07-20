"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/mockData";

interface HeroCarouselProps {
  movies: Movie[];
  onIndexChange?: (index: number) => void;
}

export default function HeroCarousel({ movies, onIndexChange }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSetIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    if (onIndexChange) onIndexChange(index);
  }, [onIndexChange]);

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      handleSetIndex((currentIndex + 1) % movies.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, [currentIndex, movies.length, handleSetIndex]);

  return (
    <div className="relative w-full overflow-hidden pb-2">
      <div className="relative flex justify-center items-center h-[260px] w-full mt-2">
        <div className="relative flex items-center justify-center w-full max-w-[360px]">
          {movies.map((movie, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + movies.length) % movies.length;
            const isNext = index === (currentIndex + 1) % movies.length;

            if (!isActive && !isPrev && !isNext) return null;

            let transformClass = "";

            if (isActive) {
              transformClass = "scale-100 opacity-100 z-20 translate-x-0";
            } else if (isPrev) {
              transformClass = "scale-[0.85] opacity-40 z-10 -translate-x-[75%] blur-[0.5px]";
            } else if (isNext) {
              transformClass = "scale-[0.85] opacity-40 z-10 translate-x-[75%] blur-[0.5px]";
            }

            return (
              <div
                key={movie.id}
                className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${transformClass}`}
                onClick={() => !isActive && handleSetIndex(index)}
              >
                <div className="relative w-[155px] h-[230px] rounded-[20px] overflow-hidden shadow-2xl border border-gray-800">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority={isActive}
                  />
                  {/* subtle overlay to darken edges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-1">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-5 bg-red-600" : "w-1.5 bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
