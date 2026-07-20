"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Heart, Play, Pause, Volume2, VolumeX, Maximize2, SkipForward } from "lucide-react";
import { useRouter } from "next/navigation";
import type { StaticImageData } from "next/image";

interface VideoPlayerProps {
  poster: StaticImageData | string;
  isPaid?: boolean;
}

export default function VideoPlayer({ poster, isPaid }: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  // Handle Play/Pause initialization
  useEffect(() => {
    if (videoRef.current) {
      // It autoPlays based on attribute, so let's try to sync state
      if (!videoRef.current.paused) {
        setIsPlaying(true);
      }
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Video playback failed:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
      setDuration(formatTime(total));
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => console.error(err));
      } else {
        document.exitFullscreen().catch(err => console.error(err));
      }
    }
  };

  const skipIntro = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="w-full aspect-video max-h-[40vh] md:max-h-[60vh] lg:max-h-[70vh] xl:max-h-[800px] bg-[#0a0a0a] sticky top-0 z-40 group flex justify-center items-center overflow-hidden"
    >
      {/* Cinematic Blurred Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-110 blur-xl pointer-events-none"
        style={{
          backgroundImage: `url(${typeof poster === 'string' ? poster : poster.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-black/30 pointer-events-none" />
      
      {/* Top Controls */}
      <div className={`absolute top-0 left-0 w-full p-4 z-50 flex justify-between items-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={() => router.back()}
          className="bg-black/30 p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/60 hover:scale-105 transition-all shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <button className="bg-black/30 p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/60 hover:scale-105 transition-all shadow-xl">
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Video Element */}
      <video 
        ref={videoRef}
        src={isPaid ? "https://media.w3.org/2010/05/sintel/trailer.mp4" : "https://www.w3schools.com/html/mov_bbb.mp4"}
        poster={typeof poster === 'string' ? poster : poster.src}
        className="relative z-10 w-full h-full object-contain shadow-2xl cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
        playsInline
      />

      {/* Skip Intro Button */}
      {showControls && progress < 10 && (
        <button 
          onClick={skipIntro}
          className="absolute bottom-20 right-4 md:right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-md text-white font-medium flex items-center gap-2 transition-all hover:scale-105"
        >
          រំលង (Skip Intro) <SkipForward className="w-4 h-4" />
        </button>
      )}

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 w-full px-4 pb-4 pt-16 bg-gradient-to-t from-black/80 to-transparent z-50 flex flex-col gap-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Progress Bar */}
        <div 
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative group/progress"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] opacity-0 group-hover/progress:opacity-100 transition-opacity"
            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <div className="text-white text-xs font-medium font-mono">
              {currentTime} / {duration}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button onClick={toggleFullscreen} className="text-white hover:text-red-500 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
