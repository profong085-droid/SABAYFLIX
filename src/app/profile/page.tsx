"use client";

import { useState, useEffect } from "react";
import { Settings, ChevronRight, Facebook, Send, Play, Camera, ShoppingCart, Heart, LogOut, Globe, History, User, ShieldCheck, Crown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllUserMovies, updateUserName } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut, updateProfile } from "firebase/auth";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ bought: 0, saved: 0 });
  
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && user.displayName) {
      setNewName(user.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadStats() {
      if (user) {
        const lists = await getAllUserMovies(user.uid);
        setStats({
          bought: lists.purchased?.length || 0,
          saved: lists.saved?.length || 0
        });
      }
    }
    loadStats();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSaveName = async () => {
    if (!user || !auth.currentUser || !newName.trim()) return;
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      await updateUserName(user.uid, newName.trim());
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating name:", error);
      alert("មានបញ្ហាក្នុងការកែប្រែឈ្មោះ។");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-24 font-sans selection:bg-red-500/30">
      
      {/* Desktop Container Wrapper */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40 border-b border-white/5">
          <div className="w-8" />
          <h1 className="text-white text-lg font-bold tracking-wide">ព័ត៌មានគណនី</h1>
          <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="px-4 mt-6">
          
          {/* Hero Profile Card */}
          <div className="relative rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl group">
            {/* Cover Image Background */}
            <div className="absolute inset-0 h-32 bg-gradient-to-r from-red-900 via-red-800 to-black opacity-80" />
            <div className="absolute inset-0 h-32 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
            
            {/* Glassmorphism Content Box */}
            <div className="relative mt-16 mx-4 mb-4 p-5 rounded-2xl bg-[#141414]/80 backdrop-blur-xl border border-white/5 shadow-xl flex items-center gap-5">
              
              <div className="relative group/avatar cursor-pointer">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-gray-900 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-transform duration-300 group-hover/avatar:scale-105 relative">
                  <Image 
                    src={user?.photoURL || "https://placehold.co/200x200/111111/ef4444/png?text=U"} 
                    alt="Avatar" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 p-1.5 md:p-2 rounded-full border-2 border-[#141414] shadow-lg group-hover/avatar:bg-red-500 transition-colors">
                  <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="bg-black/50 border border-red-500/50 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-red-500 w-40"
                        placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                        autoFocus
                      />
                      <button onClick={handleSaveName} disabled={saving} className="p-1 bg-green-600/20 text-green-500 rounded hover:bg-green-600/40">
                         {saving ? <span className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin inline-block"></span> : <ShieldCheck className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setIsEditing(false)} disabled={saving} className="p-1 bg-red-600/20 text-red-500 rounded hover:bg-red-600/40">
                         <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-white text-xl md:text-2xl font-bold truncate">
                        {user?.displayName || "សមាជិក PHUMCINE"}
                      </h2>
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-500 shrink-0" />
                      <button onClick={() => setIsEditing(true)} className="p-1 ml-2 bg-white/5 text-gray-400 rounded-full hover:bg-white/10 hover:text-white transition-colors">
                        <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </button>
                    </>
                  )}
                </div>
                <p className="text-gray-400 text-xs md:text-sm font-mono bg-black/30 w-fit px-2 py-1 rounded-md mb-2 md:mb-3 border border-white/5 truncate max-w-full">
                  {user?.email || user?.phoneNumber || "មិនមានព័ត៌មាន"}
                </p>
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600/20 to-transparent px-3 py-1 rounded-full border border-red-500/20">
                  <Crown className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-red-400 text-[10px] md:text-xs font-bold tracking-wider">សមាជិកធម្មតា</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Stats Columns */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
            <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg relative overflow-hidden group hover:border-red-500/30 transition-colors cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(239,68,68,0.1)] group-hover:scale-110 transition-transform">
                 <Crown className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
               </div>
               <span className="text-white text-lg md:text-xl font-bold mb-1">0 <span className="text-xs text-gray-500 font-normal">ថ្ងៃ</span></span>
               <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider font-medium text-center">អាយុកាលសមាជិក</span>
            </div>
            
            <Link href="/my-movies" className="block">
              <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-colors h-full">
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform">
                   <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                 </div>
                 <span className="text-white text-lg md:text-xl font-bold mb-1">{stats.bought} <span className="text-xs text-gray-500 font-normal">រឿង</span></span>
                 <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider font-medium text-center">រឿងបានទិញ</span>
              </div>
            </Link>
            
            <div className="bg-[#141414] rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-lg relative overflow-hidden group hover:border-pink-500/30 transition-colors cursor-pointer">
               <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(236,72,153,0.1)] group-hover:scale-110 transition-transform">
                 <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
               </div>
               <span className="text-white text-lg md:text-xl font-bold mb-1">{stats.saved} <span className="text-xs text-gray-500 font-normal">រឿង</span></span>
               <span className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider font-medium text-center">រឿងបានរក្សាទុក</span>
            </div>
          </div>
          
          {/* Promo Banner */}
          <Link href="/vip" className="block w-full">
            <div className="w-full relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-600 via-orange-600 to-red-700 mb-8 p-6 md:p-8 flex flex-col justify-center items-end text-right shadow-[0_10px_30px_rgba(220,38,38,0.2)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.3)] transition-shadow cursor-pointer group">
               {/* Decorative Background Elements */}
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
               <div className="absolute -left-10 -bottom-10 w-40 h-40 md:w-60 md:h-60 bg-white/20 blur-3xl rounded-full group-hover:bg-white/30 transition-colors" />
               
               <div className="relative z-10 flex flex-col items-end">
                 <span className="bg-black/20 text-yellow-300 font-bold tracking-widest text-[10px] md:text-xs mb-2 px-2 py-1 rounded backdrop-blur-sm">VIP PRIVILEGE</span>
                 <span className="text-white text-lg md:text-2xl font-bold max-w-[70%] leading-tight drop-shadow-md">ទទួលរង្វាន់ធំ! ចុះឈ្មោះជាសមាជិក VIP ឥឡូវនេះ</span>
                 <div className="flex items-center gap-1 mt-4 md:mt-5 bg-white text-red-600 px-5 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg group-hover:scale-105 transition-transform">
                   ចុះឈ្មោះឥឡូវនេះ <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                 </div>
               </div>
            </div>
          </Link>

          {/* Menu List */}
          <div className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden mb-8 shadow-lg">
            {[
              { label: "ព័ត៌មានគណនី", href: "#", icon: <User className="w-5 h-5 text-purple-500" />, bg: "bg-purple-500/10" },
              { label: "រឿងដែលបានទិញ", href: "/my-movies", icon: <ShoppingCart className="w-5 h-5 text-blue-500" />, bg: "bg-blue-500/10" },
              { label: "ប្រវត្តិប្រតិបត្តិការ", href: "#", icon: <History className="w-5 h-5 text-green-500" />, bg: "bg-green-500/10" },
              { label: "ប្តូរភាសា (Language)", href: "#", icon: <Globe className="w-5 h-5 text-orange-500" />, bg: "bg-orange-500/10" },
            ].map((item, idx) => (
              <Link key={idx} href={item.href}>
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <span className="text-gray-200 text-sm md:text-base font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 md:p-5 bg-[#141414] hover:bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 text-sm md:text-base font-bold active:scale-95 transition-all mb-10 shadow-lg group">
            <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
            ចាកចេញពីគណនី (Logout)
          </button>

          {/* Social Icons row */}
          <div className="flex justify-center gap-8 md:gap-12 py-6 mb-8 border-t border-white/5">
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#1877F2] to-[#0d5ec4] flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                 <Facebook className="w-6 h-6 md:w-7 md:h-7 text-white" />
               </div>
               <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Facebook</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300 border border-white/10">
                 <span className="text-white font-bold text-lg md:text-xl">t</span>
               </div>
               <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 transition-colors">TikTok</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#0088cc] to-[#005c8a] flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                 <Send className="w-6 h-6 md:w-7 md:h-7 text-white -ml-0.5" />
               </div>
               <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Telegram</span>
             </div>
             <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#FF0000] to-[#cc0000] flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                 <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
               </div>
               <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-gray-300 transition-colors">YouTube</span>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}

