"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import PaymentModal from "@/components/PaymentModal";
import type { Movie } from "@/lib/mockData";
import { Share2, Ban } from "lucide-react";

interface MovieViewProps {
  movie: Movie;
}

export default function MovieView({ movie }: MovieViewProps) {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    // Check if movie was already purchased
    const stored = localStorage.getItem("sabayflix_purchased") || "[]";
    try {
      const parsed = JSON.parse(stored);
      if (parsed.includes(movie.id)) {
        setIsPaid(true);
      }
    } catch (e) {}
  }, [movie.id]);

  return (
    <>
      <VideoPlayer poster={movie.poster} isPaid={isPaid} />

      <div className="p-4 space-y-4">
        {/* Main Info Block */}
        <div className="bg-surface rounded-2xl p-4 border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-textPrimary max-w-[70%]">{movie.title}</h1>
            <button className="bg-primary p-3 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-transform">
              <Share2 className="w-5 h-5 text-white fill-white" />
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-md">{movie.year}</span>
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-md">{movie.type}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 text-sm text-textSecondary">
            <div className="flex items-center"><span className="w-20">ភាសា:</span> <span className="text-primary font-medium">{movie.language}</span></div>
            <div className="flex items-center"><span className="w-20">រយៈពេល:</span> <span className="text-primary font-medium">{movie.duration}</span></div>
            <div className="flex items-center"><span className="w-20">គុណភាព:</span> <span className="text-primary font-medium">{movie.quality}</span></div>
            <div className="flex items-center"><span className="w-20">ប្រភេទរឿង:</span> <span className="bg-green-700/80 text-white px-3 py-0.5 rounded-full text-xs ml-1">{movie.genre}</span></div>
          </div>
        </div>

        {/* Synopsis Block */}
        <div className="bg-surface rounded-2xl p-4 border border-gray-800">
          <p className="text-sm text-textPrimary leading-relaxed">
            {movie.description || "ភាពយន្តនេះគឺជារឿងដែលគួរឱ្យចាប់អារម្មណ៍បំផុត ដែលនាំអ្នកទស្សនាចូលទៅក្នុងពិភពដ៏រំភើបមួយ..."}
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-surface rounded-2xl p-4 border border-gray-800 flex items-start gap-4">
           <div className="flex-shrink-0">
             <Ban className="w-12 h-12 text-primary" strokeWidth={1.5} />
           </div>
           <div>
             <h3 className="text-lg font-medium text-textPrimary mb-1">បម្រាម</h3>
             <p className="text-xs text-textSecondary leading-relaxed">
               ហាមលួចថតចម្លងវីដេអូ ឬទាញយកទៅចែកចាយបន្តលើបណ្តាញសង្គមដោយគ្មានការអនុញ្ញាត។ យើងនឹងចាត់វិធានការផ្លូវច្បាប់។
             </p>
           </div>
        </div>
      </div>

      <PaymentModal movieId={movie.id} isPaid={isPaid} setIsPaid={setIsPaid} />
    </>
  );
}
