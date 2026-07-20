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
    <div className="w-full aspect-video max-h-[40vh] md:max-h-[60vh] lg:max-h-[70vh] xl:max-h-[800px] bg-[#0a0a0a] sticky top-0 z-40 group flex justify-center items-center overflow-hidden">
      
      {/* Cinematic Blurred Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 scale-110 blur-xl"
        style={{
          backgroundImage: `url(${typeof poster === 'string' ? poster : poster.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      {/* Gradient Overlay to fade into background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-black/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-50 bg-black/30 p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/60 hover:scale-105 transition-all shadow-xl"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 z-50 bg-black/30 p-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-black/60 hover:scale-105 transition-all shadow-xl">
        <Heart className="w-5 h-5 text-white" />
      </button>

      {isPaid ? (
        <video 
          key="full"
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
          poster={typeof poster === 'string' ? poster : poster.src}
          className="relative z-10 w-full h-full object-contain shadow-2xl"
          controls
          autoPlay
          playsInline
        />
      ) : (
        <video 
          key="trailer"
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
          poster={typeof poster === 'string' ? poster : poster.src}
          className="relative z-10 w-full h-full object-contain shadow-2xl"
          controls
          autoPlay
          playsInline
          muted
        />
      )}
    </div>
  );
}
