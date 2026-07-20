"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Mail, Phone, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"phone" | "email">("email");

  // Form States
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "phone") {
      try {
        setLoading(true);
        setupRecaptcha();
        
        let phoneNumber = emailOrPhone.trim();
        // Format to Cambodian phone number if starts with 0
        if (phoneNumber.startsWith("0")) {
          phoneNumber = "+855" + phoneNumber.substring(1);
        } else if (!phoneNumber.startsWith("+")) {
          phoneNumber = "+855" + phoneNumber;
        }

        const appVerifier = (window as any).recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setShowOTP(true);
      } catch (err: any) {
        console.error(err);
        setError(`មានបញ្ហាពេលផ្ញើសារ: ${err.message || "សូមសាកល្បងម្តងទៀត"}`);
        // Reset recaptcha if error
        if ((window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      // Login user with Firebase Auth
      await signInWithEmailAndPassword(auth, emailOrPhone, password);
      // Login successful, redirect to home
      router.push("/");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("អ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ។");
      } else {
        setError(`មានបញ្ហា: ${err.message || "សូមសាកល្បងម្តងទៀត"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!confirmationResult) return;

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError("លេខកូដ (OTP) មិនត្រឹមត្រូវទេ ឬផុតកំណត់។");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(`មានបញ្ហាពេលភ្ជាប់គណនី Google: ${err.message || "សូមសាកល្បងម្តងទៀត"}`);
    } finally {
      setGoogleLoading(false);
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

      {/* Login Box */}
      <div className="relative z-20 w-full max-w-[450px] bg-black/70 backdrop-blur-xl sm:p-12 p-6 rounded-2xl border border-white/10 shadow-2xl mt-12">
        <h1 className="text-white text-3xl font-bold mb-8">ចូលគណនី</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Invisible Recaptcha Container */}
        <div id="recaptcha-container"></div>

        {!showOTP ? (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
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
              
              {method === "email" && (
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
              )}
            </div>

            <button 
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "កំពុងដំណើរការ..." : "ចូលគណនី (Login)"}
            </button>

            {method === "email" && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
                  <input type="checkbox" className="w-4 h-4 accent-red-600 rounded bg-[#333]" />
                  ចងចាំខ្ញុំ (Remember me)
                </label>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  ភ្លេចពាក្យសម្ងាត់?
                </Link>
              </div>
            )}
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleVerifyOTP}>
            <p className="text-gray-300 text-sm">
              លេខកូដសម្ងាត់ ៦ ខ្ទង់ (OTP) ត្រូវបានផ្ញើទៅកាន់លេខ <span className="font-bold text-white">{emailOrPhone}</span>។
            </p>
            <div className="relative">
              <input 
                type="text"
                placeholder="បញ្ចូលលេខកូដ OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full bg-[#333333]/70 text-white text-center text-2xl tracking-[0.5em] px-4 py-3.5 rounded-xl border border-transparent focus:border-red-500 focus:bg-[#444444]/70 outline-none transition-colors"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់ (Verify OTP)"}
            </button>
            
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => {
                  setShowOTP(false);
                  setOtp("");
                }} 
                className="text-gray-400 hover:text-white text-sm"
              >
                ប្តូរលេខទូរស័ព្ទវិញ
              </button>
            </div>
          </form>
        )}

        <div className="my-8 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-gray-400 text-sm">ឬ</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            បន្តជាមួយ Gmail (Google)
          </button>

          <button 
            onClick={() => {
              setMethod(method === "phone" ? "email" : "phone");
              setShowOTP(false);
              setError("");
            }}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {method === "phone" ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
            បន្តជាមួយ {method === "phone" ? "អ៊ីមែល" : "លេខទូរស័ព្ទ"}
          </button>
          
          <button className="w-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Facebook className="w-5 h-5" />
            បន្តជាមួយ Facebook
          </button>
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          សមាជិកថ្មីមែនទេ?{" "}
          <Link href="/register" className="text-white hover:underline font-medium">
            ចុះឈ្មោះឥឡូវនេះ
          </Link>
        </div>
        
      </div>
    </main>
  );
}
