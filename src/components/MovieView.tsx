"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import PaymentModal from "@/components/PaymentModal";
import { allMoviesList } from "@/lib/mockData";
import type { Movie } from "@/lib/mockData";
import { getStoredItems, addStoredItem, toggleStoredItem } from "@/lib/storage";
import { Share2, Ban, Bookmark, BookmarkCheck, Download, CheckCircle2, User } from "lucide-react";
import MovieCard from "@/components/MovieCard";

interface MovieViewProps {
  movie: Movie;
}

export default function MovieView({ movie }: MovieViewProps) {
  const [isPaid, setIsPaid] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    // Record as watching
    addStoredItem("sabayflix_watching", movie.id, true);

    // Check if movie was already purchased
    const paidItems = getStoredItems("sabayflix_purchased");
    if (paidItems.includes(movie.id)) setIsPaid(true);

    // Check if movie is saved
    const savedItems = getStoredItems("sabayflix_saved");
    if (savedItems.includes(movie.id)) setIsSaved(true);

    // Check if movie is downloaded
    const downloadedItems = getStoredItems("sabayflix_downloaded");
    if (downloadedItems.includes(movie.id)) setIsDownloaded(true);
  }, [movie.id]);

  const toggleSave = () => {
    const { isAdded } = toggleStoredItem("sabayflix_saved", movie.id);
    setIsSaved(isAdded);
  };

  const toggleDownload = () => {
    const { isAdded } = toggleStoredItem("sabayflix_downloaded", movie.id);
    setIsDownloaded(isAdded);
  };

  const recommendedMovies = allMoviesList.filter(m => m.id !== movie.id).slice(0, 8);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <VideoPlayer poster={movie.poster} isPaid={isPaid} />

      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-3 lg:gap-16">
          
          {/* Left Column: Movie Details (70%) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Actions */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">{movie.title}</h1>
              <div className="flex gap-3">
                <button 
                  onClick={toggleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all shadow-lg backdrop-blur-md border border-white/10 ${isSaved ? 'bg-white/20 text-white' : 'bg-primary/90 hover:bg-primary text-white'}`}
                >
                  {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  <span className="text-sm hidden sm:block">{isSaved ? "បានរក្សាទុក" : "រក្សាទុក"}</span>
                </button>
                <button 
                  onClick={toggleDownload}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all shadow-lg backdrop-blur-md border border-white/10 ${isDownloaded ? 'bg-green-600/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  {isDownloaded ? <CheckCircle2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </button>
                <button className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full shadow-lg transition-all backdrop-blur-md border border-white/10">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-green-500 font-bold tracking-wider">{movie.quality}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-600">|</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-gray-300 text-xs">{movie.type}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-300">{movie.duration}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-300">{movie.language}</span>
              <span className="text-gray-600">|</span>
              <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300 text-xs">{movie.genre}</span>
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
              {movie.description || "ភាពយន្តនេះគឺជារឿងដែលគួរឱ្យចាប់អារម្មណ៍បំផុត ដែលនាំអ្នកទស្សនាចូលទៅក្នុងពិភពដ៏រំភើបមួយ។ ទស្សនាវគ្គថ្មីៗជាច្រើនទៀតដែលពោរពេញទៅដោយអាថ៌កំបាំងនិងឈុតឆាករន្ធត់។"}
            </p>

            {/* Cast & Crew Mock */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">អ្នកចូលរួមសម្តែង</h3>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 shadow-lg">
                      <User className="w-8 h-8 text-gray-500" />
                    </div>
                    <span className="text-xs text-gray-400">តារា {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-red-950/20 rounded-xl p-4 border border-red-900/30 flex items-start gap-4 backdrop-blur-sm mt-8">
              <Ban className="w-6 h-6 text-red-500/80 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-red-400/90 font-medium mb-1">បម្រាម</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  ហាមលួចថតចម្លងវីដេអូ ឬទាញយកទៅចែកចាយបន្តលើបណ្តាញសង្គមដោយគ្មានការអនុញ្ញាត។ យើងនឹងចាត់វិធានការផ្លូវច្បាប់យ៉ាងម៉ឺងម៉ាត់។
                </p>
              </div>
            </div>

            {/* Payment / Buy Button Action */}
            <PaymentModal movieId={movie.id} isPaid={isPaid} setIsPaid={setIsPaid} />
          </div>

          {/* Right Column: More Like This (30%) */}
          <div className="mt-12 lg:mt-0">
            <h3 className="text-white text-lg font-bold mb-6">រឿងស្រដៀងគ្នា</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              {recommendedMovies.map(rm => (
                <MovieCard key={rm.id} movie={rm} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
