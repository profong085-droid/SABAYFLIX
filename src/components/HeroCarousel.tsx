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
  const [progress, setProgress] = useState(0);
  
  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const AUTOPLAY_DURATION = 5000; // ms

  const handleSetIndex = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    setProgress(0);
    if (onIndexChange) onIndexChange(index);
    setTimeout(() => setIsTransitioning(false), 600);
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

  // Auto-play with progress tracking
  useEffect(() => {
    const interval = 50; // update progress every 50ms
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / AUTOPLAY_DURATION) * 100);
      
      if (elapsed >= AUTOPLAY_DURATION) {
        handleSetIndex((currentIndex + 1) % movies.length);
        elapsed = 0;
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, movies.length, handleSetIndex]);

  return (
    <div 
      className="relative w-full overflow-hidden pb-2 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndEvent}
    >
      {/* Ambient background glow from active poster — more vibrant */}
      <div 
        className="absolute inset-0 opacity-25 blur-3xl transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(220, 38, 38, 0.35) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)`,
        }}
      />

      <div className="relative flex justify-center items-center h-[260px] md:h-[400px] lg:h-[500px] w-full mt-2">
        <div className="relative flex items-center justify-center w-full max-w-[360px] md:max-w-[600px] lg:max-w-[900px]">
          {movies.map((movie, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + movies.length) % movies.length;
            const isNext = index === (currentIndex + 1) % movies.length;

            if (!isActive && !isPrev && !isNext) return null;

            let transformStyle: React.CSSProperties = {};

            if (isActive) {
              transformStyle = {
                transform: 'scale(1) translateX(0) rotateY(0deg)',
                opacity: 1,
                zIndex: 20,
                filter: 'blur(0px)',
              };
            } else if (isPrev) {
              transformStyle = {
                transform: 'scale(0.8) translateX(-95%) rotateY(5deg)',
                opacity: 0.25,
                zIndex: 10,
                filter: 'blur(2px)',
              };
            } else if (isNext) {
              transformStyle = {
                transform: 'scale(0.8) translateX(95%) rotateY(-5deg)',
                opacity: 0.25,
                zIndex: 10,
                filter: 'blur(2px)',
              };
            }

            return (
              <div
                key={movie.id}
                className="absolute cursor-pointer"
                style={{
                  ...transformStyle,
                  transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  perspective: '1200px',
                }}
                onClick={() => !isActive && handleSetIndex(index)}
              >
                {/* Glow ring behind active poster */}
                {isActive && (
                  <div className="absolute -inset-3 rounded-[24px] bg-gradient-to-br from-red-600/25 via-transparent to-red-600/25 animate-glow-pulse blur-md pointer-events-none" />
                )}

                <div className={`relative w-[155px] h-[230px] md:w-[240px] md:h-[360px] lg:w-[300px] lg:h-[450px] rounded-[20px] overflow-hidden shadow-2xl border transition-all duration-700 ${
                  isActive 
                    ? 'border-red-500/40 shadow-glow-red' 
                    : 'border-gray-800/50'
                }`}>
                  {/* Ken Burns effect — slow zoom on active poster */}
                  <div className={`absolute inset-0 ${isActive ? 'animate-kenBurns' : ''}`} key={`kb-${movie.id}-${isActive ? 'active' : 'inactive'}`}>
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-cover"
                    />
                  </div>

                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Shimmer effect on active poster */}
                  {isActive && (
                    <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  )}

                  {/* Quality badge with glow */}
                  {isActive && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider text-white glass animate-fadeInDown border border-green-500/20">
                      <span className="text-green-400">4K</span>
                    </div>
                  )}

                  {/* Movie title overlay on active poster */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 
                        className="text-sm md:text-base lg:text-lg font-bold text-white animate-titleReveal drop-shadow-lg"
                        key={`title-${movie.id}`}
                      >
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 animate-titleReveal" style={{ animationDelay: '0.1s' }}>
                        <span className="text-[9px] md:text-xs text-red-400 font-semibold">{movie.genre}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-500" />
                        <span className="text-[9px] md:text-xs text-gray-400">{movie.year}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated indicator dots with progress */}
      <div className="flex justify-center gap-2.5 mt-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSetIndex(index)}
            className={`relative rounded-full transition-all duration-500 ease-out overflow-hidden ${
              index === currentIndex 
                ? "w-8 h-2.5 bg-gray-700" 
                : "w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400 hover:scale-125"
            }`}
          >
            {/* Progress fill inside active dot */}
            {index === currentIndex && (
              <div 
                className="absolute inset-0 rounded-full gradient-red-bright shadow-glow-red transition-none"
                style={{ 
                  width: `${progress}%`,
                  transition: 'width 50ms linear',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
