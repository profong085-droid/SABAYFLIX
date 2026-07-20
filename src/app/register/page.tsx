"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Mail, Phone, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("email");
  
  // Form States
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "phone") {
      setError("ការចុះឈ្មោះតាមលេខទូរស័ព្ទមិនទាន់ដំណើរការទេ។ សូមជ្រើសរើស អ៊ីមែល វិញ។");
      return;
    }

    try {
      setLoading(true);
      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, emailOrPhone, password);
      // Registration successful, redirect to home
      router.push("/");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("អ៊ីមែលនេះមានគេប្រើរួចហើយ។ សូមសាកល្បង Login វិញ។");
      } else if (err.code === "auth/weak-password") {
        setError("ពាក្យសម្ងាត់ខ្សោយពេក។ ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ។");
      } else if (err.code === "auth/invalid-email") {
        setError("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវទេ។");
      } else {
        setError(`មានបញ្ហា: ${err.message || "សូមសាកល្បងម្តងទៀត"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 selection:bg-red-500/30">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 sm:bg-black/80 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2069&auto=format&fit=crop')" }}
        />
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 z-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center transform rotate-12">
            <div className="w-4 h-4 bg-white rounded-sm transform -rotate-12 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-wider text-red-600 drop-shadow-lg">SABAYFLIX</span>
        </Link>
      </div>

      {/* Register Box */}
      <div className="relative z-20 w-full max-w-[450px] bg-black/70 backdrop-blur-xl sm:p-12 p-6 rounded-2xl border border-white/10 shadow-2xl mt-12">
        <h1 className="text-white text-3xl font-bold mb-8">ចុះឈ្មោះសមាជិក</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="ឈ្មោះរបស់អ្នក"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#333333]/70 text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-red-500 focus:bg-[#444444]/70 outline-none transition-colors"
                required
              />
            </div>
            
            <div className="relative">
              <input 
                type={method === "phone" ? "tel" : "email"}
                placeholder={method === "phone" ? "លេខទូរស័ព្ទ" : "អ៊ីមែល"}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full bg-[#333333]/70 text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-red-500 focus:bg-[#444444]/70 outline-none transition-colors"
                required
              />
            </div>
            
            <div className="relative">
              <input 
                type="password"
                placeholder="ពាក្យសម្ងាត់"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#333333]/70 text-white px-4 py-3.5 rounded-xl border border-transparent focus:border-red-500 focus:bg-[#444444]/70 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "កំពុងដំណើរការ..." : "ចុះឈ្មោះ (Register)"}
          </button>

        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-gray-400 text-sm">ឬ</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => setMethod(method === "phone" ? "email" : "phone")}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {method === "phone" ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
            ចុះឈ្មោះតាម {method === "phone" ? "អ៊ីមែល" : "លេខទូរស័ព្ទ"}
          </button>
          
          <button className="w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Facebook className="w-5 h-5" />
            ចុះឈ្មោះតាម Facebook
          </button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          មានគណនីរួចហើយ?{" "}
          <Link href="/login" className="text-white hover:underline font-medium">
            ចូលគណនី (Login)
          </Link>
        </div>
        
      </div>
    </main>
  );
}
