"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Movie } from "@/lib/mockData";

interface HeroCarouselProps {
  movies: Movie[];
  onIndexChange?: (index: number) => void;
}

export default function HeroCarousel({ movies, onIndexChange }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleSetIndex = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    if (onIndexChange) onIndexChange(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [onIndexChange]);

  // Handle touch events
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleSetIndex((currentIndex + 1) % movies.length);
    } else if (isRightSwipe) {
      handleSetIndex((currentIndex - 1 + movies.length) % movies.length);
    }
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      handleSetIndex((currentIndex + 1) % movies.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, movies.length, handleSetIndex]);

  return (
    <div 
      className="relative w-full overflow-hidden pb-2 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
    >
      {/* Ambient background glow from active poster */}
      <div 
        className="absolute inset-0 opacity-20 blur-3xl transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(220, 38, 38, 0.3) 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex justify-center items-center h-[260px] md:h-[400px] lg:h-[500px] w-full mt-2">
        <div className="relative flex items-center justify-center w-full max-w-[360px] md:max-w-[600px] lg:max-w-[900px]">
          {movies.map((movie, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + movies.length) % movies.length;
            const isNext = index === (currentIndex + 1) % movies.length;

            if (!isActive && !isPrev && !isNext) return null;

            let transformClass = "";

            if (isActive) {
              transformClass = "scale-100 opacity-100 z-20 translate-x-0";
            } else if (isPrev) {
              transformClass = "scale-[0.82] opacity-30 z-10 -translate-x-[92%] blur-[1px]";
            } else if (isNext) {
              transformClass = "scale-[0.82] opacity-30 z-10 translate-x-[92%] blur-[1px]";
            }

            return (
              <div
                key={movie.id}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer ${transformClass}`}
                onClick={() => !isActive && handleSetIndex(index)}
              >
                {/* Glow ring behind active poster */}
                {isActive && (
                  <div className="absolute -inset-2 rounded-[24px] bg-gradient-to-br from-red-600/20 via-transparent to-red-600/20 animate-glow-pulse blur-sm pointer-events-none" />
                )}

                <div className={`relative w-[155px] h-[230px] md:w-[240px] md:h-[360px] lg:w-[300px] lg:h-[450px] rounded-[20px] overflow-hidden shadow-2xl border transition-all duration-700 ${
                  isActive 
                    ? 'border-red-500/30 shadow-glow-red' 
                    : 'border-gray-800/50'
                }`}>
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Shimmer effect on active poster */}
                  {isActive && (
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  )}

                  {/* Quality badge */}
                  {isActive && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider text-white glass animate-fadeInDown">
                      4K
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated indicator dots */}
      <div className="flex justify-center gap-2 mt-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSetIndex(index)}
            className={`rounded-full transition-all duration-500 ease-out ${
              index === currentIndex 
                ? "w-7 h-2 gradient-red-bright shadow-glow-red" 
                : "w-2 h-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
