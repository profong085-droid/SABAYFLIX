"use client";

import { ArrowLeft, Heart, Play, Pause, Volume2, Maximize2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface VideoPlayerProps {
  poster: StaticImageData | string;
  isPaid?: boolean;
}

export default function VideoPlayer({ poster, isPaid }: VideoPlayerProps) {
  const router = useRouter();

  return (
    <div className="w-full aspect-video bg-black sticky top-0 z-40 group">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50 bg-black/40 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 z-50 bg-black/40 p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition">
        <Heart className="w-5 h-5 text-white" />
      </button>

      {isPaid ? (
        <video 
          key="full"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          poster={typeof poster === 'string' ? poster : poster.src}
          className="w-full h-full object-contain"
          controls
          autoPlay
          playsInline
        />
      ) : (
        <video 
          key="trailer"
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
          poster={typeof poster === 'string' ? poster : poster.src}
          className="w-full h-full object-contain"
          controls
          autoPlay
          playsInline
          muted
        />
      )}
    </div>
  );
}
