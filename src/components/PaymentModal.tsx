"use client";

import { useState, useEffect } from "react";
import { X, CreditCard, ShoppingCart, Info, ScanLine, Camera, Play, CheckCircle2 } from "lucide-react";
import { addStoredItem } from "@/lib/storage";
import Image from "next/image";
import qrImage from "@/qr/qrkh.jpg";
import { useAuth } from "@/context/AuthContext";
import { toggleUserMovie } from "@/lib/db";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";

interface PaymentModalProps {
  movieId: string;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
}

export default function PaymentModal({ movieId, isPaid, setIsPaid }: PaymentModalProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState(0); // 0 = closed, 1 = initial sheet, 2 = checkout details, 3 = KHQR
  const [timer, setTimer] = useState(299); // 4:59
  const [isSuccess, setIsSuccess] = useState(false);
  const [autoCountdown, setAutoCountdown] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 3 && timer > 0 && !isSuccess) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer, isSuccess]);

  // 10-second Auto Success Timer
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (step === 3 && !isSuccess) {
      setAutoCountdown(10);
      countdownInterval = setInterval(() => {
        setAutoCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIsSuccess(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [step, isSuccess]);

  // Auto-complete payment after success checkmark animation
  useEffect(() => {
    let autoCloseTimer: NodeJS.Timeout;
    if (isSuccess) {
      showToast("ទូទាត់ប្រាក់ជោគជ័យ! អ្នកអាចទស្សនាវីដេអូបានហើយ", "success", "check");
      autoCloseTimer = setTimeout(() => {
        handlePaySuccess();
      }, 1200);
    }
    return () => clearTimeout(autoCloseTimer);
  }, [isSuccess]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePaySuccess = async () => {
    if (!user) {
      showToast("សូមចូលគណនី (Login) ជាមុនសិន!", "info", "error");
      router.push("/login");
      return;
    }
    await toggleUserMovie(user.uid, "purchased", movieId, true);
    setIsPaid(true);
    setStep(0);
    setIsSuccess(false);

    // Scroll to video player & play immediately
    setTimeout(() => {
      const videoContainer = document.getElementById("video-player-section");
      const videoElement = document.querySelector("video");
      if (videoContainer) {
        videoContainer.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (videoElement) {
        videoElement.play().catch(() => {});
      }
    }, 100);
  };

  return (
    <>
      {/* Inline Action Button for Buying or Watching */}
      {isPaid ? (
        <div className="w-full mt-4 flex justify-center lg:justify-start">
          <button 
            onClick={() => {
              const videoContainer = document.getElementById("video-player-section");
              const videoElement = document.querySelector("video");
              if (videoContainer) {
                videoContainer.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              if (videoElement) {
                videoElement.play().catch(() => {});
              }
            }}
            className="w-full lg:w-auto px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl text-white font-bold text-[15px] shadow-lg shadow-green-600/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 hover:shadow-glow-green"
          >
            <Play className="w-5 h-5 fill-white text-white" />
            មើលត្រេល័រ
          </button>
        </div>
      ) : (
        <div className="w-full mt-4 flex justify-center lg:justify-start">
          <button 
            onClick={() => {
              if (!user) {
                showToast("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីទិញរឿងនេះ!", "info", "error");
                router.push("/login");
                return;
              }
              setStep(1);
            }}
            className="w-full lg:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-[15px] shadow-lg shadow-red-600/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            ទិញវីដេអូនេះ ដើម្បីមើលរឿង
          </button>
        </div>
      )}

      {/* Step 1 & 2: Bottom Sheet Overlay */}
      {(step === 1 || step === 2) && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex justify-center items-end animate-in fade-in duration-200" onClick={() => setStep(0)}>
          <div 
            className="w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-7xl bg-[#111111] md:rounded-t-[3rem] rounded-t-3xl border-t border-gray-800 animate-in slide-in-from-bottom-full duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle Bar */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setStep(0)}
              className="absolute top-4 right-4 text-gray-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content Step 1 */}
            {step === 1 && (
              <div className="p-5 flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-xl">
                   <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                
                <h3 className="text-white text-base font-medium mb-6 text-center px-4 leading-relaxed">
                  ដើម្បីអាចទស្សនារឿងនេះសូមអ្នកធ្វើការទិញរឿង
                </h3>
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ទិញរឿងនេះ 4,000៛
                </button>
              </div>
            )}

            {/* Content Step 2 */}
            {step === 2 && (
              <div className="p-5">
                <h3 className="text-gray-400 text-xs mb-1 text-center">ទឹកប្រាក់ត្រូវទូទាត់</h3>
                <h2 className="text-white text-2xl font-bold mb-6 text-center">4,000៛</h2>
                
                <div className="space-y-3 mb-6">
                  <h4 className="text-white text-sm font-medium mb-3">ប្រតិបត្តិការលម្អិត</h4>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">ឈ្មោះ៖</span>
                    <span className="text-white text-xs">អ្នកនិពន្ធរឿងល្បីៗ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">ទៅគណនី៖</span>
                    <span className="text-white text-xs">PhumCine</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">កាលបរិច្ឆេទ៖</span>
                    <span className="text-white text-xs">20 កក្កដា 2026 8:01 ព្រឹក</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">តម្លៃដើម៖</span>
                    <span className="text-white text-xs">4,000៛</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <button className="w-full py-3 bg-gray-800 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform">
                    បញ្ចូលលេខកូដប្រូម៉ូសិន
                  </button>
                  <button 
                    onClick={() => {
                      setTimer(299);
                      setIsSuccess(false);
                      setAutoCountdown(10);
                      setStep(3);
                    }}
                    className="w-full py-3 bg-red-600 text-white rounded-xl text-sm font-bold active:scale-95 transition-transform"
                  >
                    ទូទាត់ប្រាក់
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: KHQR Fullscreen Modal */}
      {step === 3 && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#090B10] w-full max-w-md rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl border border-gray-900">
        
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b border-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Member Of</span>
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold tracking-wider">KHQR</span>
            </div>
            <button onClick={() => { setStep(0); setIsSuccess(false); }} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            /* Success State with Green Checkmark */
            <div className="p-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300 my-auto">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center animate-ping absolute inset-0 opacity-75" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/40 relative z-10">
                  <CheckCircle2 className="w-14 h-14 text-white stroke-[2.5]" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 animate-textGlow">ទូទាត់ប្រាក់ជោគជ័យ!</h2>
              <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed px-4">
                ការទូទាត់ប្រាក់ <span className="text-green-400 font-bold">4,000៛</span> តាម KHQR ត្រូវបានបញ្ចប់ដោយជោគជ័យ។ វីដេអូត្រូវបានបើកជូនអ្នកទស្សនា!
              </p>

              <button 
                onClick={() => {
                  handlePaySuccess();
                  setIsSuccess(false);
                }}
                className="w-full max-w-xs py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                ទស្សនាឥឡូវនេះ
              </button>
            </div>
          ) : (
            /* KHQR Scan View */
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mt-4 mb-6">
                 <span className="text-gray-400 text-xs">រង់ចាំទូទាត់អូតូ ({autoCountdown}s)</span>
                 <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-green-500 animate-spin"></div>
                 <span className="text-gray-300 text-xs font-mono">{formatTime(timer)}</span>
              </div>

              <h3 className="text-white text-sm font-medium mb-6 text-center px-4">
                សូមស្កេនទូទាត់ទឹកប្រាក់ដើម្បីទស្សនារឿង
              </h3>

              <div className="relative w-56 mb-6">
                 {/* Red Brackets Frame */}
                 <div className="absolute -top-3 -left-3 w-5 h-5 border-t-[3px] border-l-[3px] border-red-500 rounded-tl-lg"></div>
                 <div className="absolute -top-3 -right-3 w-5 h-5 border-t-[3px] border-r-[3px] border-red-500 rounded-tr-lg"></div>
                 <div className="absolute -bottom-3 -left-3 w-5 h-5 border-b-[3px] border-l-[3px] border-red-500 rounded-bl-lg"></div>
                 <div className="absolute -bottom-3 -right-3 w-5 h-5 border-b-[3px] border-r-[3px] border-red-500 rounded-br-lg"></div>

                 {/* KHQR Card */}
                 <div className="bg-white rounded-xl overflow-hidden w-full">
                    <div className="bg-[#c22026] h-10 flex items-center justify-center relative">
                       <span className="text-white font-bold tracking-widest text-base">KHQR</span>
                       {/* Decorative cut */}
                       <div className="absolute right-0 top-0 bottom-0 w-6 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
                    </div>
                    
                    <div className="p-3 flex flex-col items-center">
                       <div className="w-full text-left mb-2">
                          <div className="text-gray-800 font-medium text-xs">PhumCine</div>
                          <div className="text-black font-bold text-sm">4,000៛</div>
                       </div>

                       <div className="w-full h-[1px] bg-gray-100 mb-3"></div>

                       <div className="w-36 h-36 relative mb-3 bg-white rounded-lg p-1">
                          <img src={qrImage.src} alt="KHQR" className="w-full h-full object-contain rounded" />
                       </div>

                       <div className="text-center text-[10px] text-gray-600 font-medium">
                         S260720216721263
                       </div>
                    </div>
                 </div>
              </div>

              <p className="text-gray-400 text-center text-[10px] px-4 mb-2 leading-relaxed">
                សូមទាញយក QR ឬ Screenshot<br />ដើម្បីយកទៅទូទាត់ក្នុងកម្មវិធីធនាគារ។
              </p>
              <p className="text-gray-500 text-center text-[9px] mb-6">
                ចំណាំ ៖ KHQR មួយស្កេនបានតែម្តងគត់ !
              </p>

              <button 
                onClick={() => setIsSuccess(true)}
                className="w-full max-w-[200px] py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-xs shadow-lg mb-4 hover:bg-gray-100"
              >
                ថតចម្លង(screenshot)
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </>
  );
}
