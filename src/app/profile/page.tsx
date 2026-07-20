import { Settings, ChevronRight, Facebook, Send, Play, Tv, Camera, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#111111] pb-24 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-[#111111] z-40">
        <div className="w-6" /> {/* Placeholder for balance */}
        <h1 className="text-white text-lg font-bold tracking-wide">ព័ត៌មានគណនី</h1>
        <button className="text-gray-400 hover:text-white p-1">
          <Settings className="w-6 h-6" />
        </button>
      </div>
      
      <div className="px-4">
        {/* Profile Card */}
        <div className="flex items-center gap-4 bg-[#1a1b23] p-4 rounded-2xl mb-4 border border-gray-800">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-red-600">
            <Image 
              src="https://placehold.co/150x150/222222/ffffff/png?text=F" 
              alt="Avatar" 
              fill 
              className="object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-red-600 p-1 rounded-full">
              <Camera className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg font-bold mb-1">Fong</h2>
            <p className="text-gray-400 text-xs">Your ID: pFhsZ_LgEQtt</p>
          </div>
        </div>

        {/* 3 Stats Columns */}
        <div className="flex justify-between gap-3 mb-6">
          <div className="flex-1 bg-[#1a1b23] rounded-2xl p-3 flex flex-col items-center justify-center border border-gray-800">
             <div className="mb-2">
               {/* Custom SVG or icon for Member Age */}
               <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center">
                 <div className="w-5 h-5 text-red-500 font-bold border-2 border-red-500 rounded-full flex items-center justify-center text-[10px]">&hearts;</div>
               </div>
             </div>
             <span className="text-gray-400 text-[10px] mb-1">អាយុកាលសមាជិក</span>
             <span className="text-white text-xs font-bold">មិនមាន</span>
          </div>
          <div className="flex-1 bg-[#1a1b23] rounded-2xl p-3 flex flex-col items-center justify-center border border-gray-800">
             <div className="mb-2">
               <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center">
                 <ShoppingCart className="w-4 h-4 text-red-500" />
               </div>
             </div>
             <span className="text-gray-400 text-[10px] mb-1">រឿងបានទិញ</span>
             <span className="text-white text-xs font-bold">0</span>
          </div>
          <div className="flex-1 bg-[#1a1b23] rounded-2xl p-3 flex flex-col items-center justify-center border border-gray-800">
             <div className="mb-2">
               <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center">
                 <Heart className="w-4 h-4 text-red-500" />
               </div>
             </div>
             <span className="text-gray-400 text-[10px] mb-1">រឿងបានរក្សាទុក</span>
             <span className="text-white text-xs font-bold">0</span>
          </div>
        </div>
        
        {/* Banner */}
        <div className="w-full relative rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-700 to-red-900 mb-6 p-4 flex flex-col justify-center items-end text-right">
           <div className="absolute top-0 left-0 bottom-0 w-1/3 opacity-30">
              {/* Some decorative graphic */}
              <div className="w-full h-full bg-gradient-to-r from-black to-transparent" />
           </div>
           <span className="text-yellow-500 font-bold tracking-widest text-xs mb-1">SABAYFLIX</span>
           <span className="text-white text-sm font-bold w-2/3 leading-tight">ទទួលអោយបានរង្វាន់ធំចុះឈ្មោះឥឡូវនេះ</span>
           <span className="text-yellow-500 text-xs mt-2 font-bold cursor-pointer hover:underline">ចុះឈ្មោះឥឡូវនេះ ></span>
        </div>

        {/* Menu List */}
        <div className="bg-[#1a1b23] rounded-2xl border border-gray-800 overflow-hidden mb-6">
          {[
            { label: "ព័ត៌មានគណនី", href: "#" },
            { label: "លេខសម្ងាត់", href: "#" },
            { label: "រឿងដែលបានទិញ", href: "/my-movies" },
            { label: "ប្រវត្តិប្រតិបត្តិការ", href: "#" },
          ].map((item, idx) => (
            <Link key={idx} href={item.href}>
              <div className="flex items-center justify-between p-4 border-b border-gray-800 last:border-0 active:bg-gray-800/50 transition-colors">
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Social Icons row (optional as per video) */}
        <div className="flex justify-center gap-6 py-4">
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center">
               <Facebook className="w-5 h-5 text-white" />
             </div>
             <span className="text-[10px] text-gray-500">ហ្វេសប៊ុក</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
               <span className="text-white font-bold text-xs">t</span>
             </div>
             <span className="text-[10px] text-gray-500">តិកតុក</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-[#0088cc] flex items-center justify-center">
               <Send className="w-5 h-5 text-white" />
             </div>
             <span className="text-[10px] text-gray-500">តេឡេក្រាម</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center">
               <Play className="w-5 h-5 text-white fill-white" />
             </div>
             <span className="text-[10px] text-gray-500">យូធូប</span>
           </div>
        </div>

      </div>
    </main>
  );
}
