"use client";

import { useState, useEffect } from "react";
import { X, CreditCard, ShoppingCart, Info, ScanLine, Camera } from "lucide-react";
import Image from "next/image";

interface PaymentModalProps {
  movieId: string;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
}

export default function PaymentModal({ movieId, isPaid, setIsPaid }: PaymentModalProps) {
  const [step, setStep] = useState(0); // 0 = closed, 1 = initial sheet, 2 = checkout details, 3 = KHQR
  const [timer, setTimer] = useState(299); // 4:59

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 3 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePaySuccess = () => {
    // Save purchased movie ID to localStorage
    const stored = localStorage.getItem("sabayflix_purchased") || "[]";
    try {
      const parsed = JSON.parse(stored);
      if (!parsed.includes(movieId)) {
        parsed.push(movieId);
        localStorage.setItem("sabayflix_purchased", JSON.stringify(parsed));
      }
    } catch (e) {
      localStorage.setItem("sabayflix_purchased", JSON.stringify([movieId]));
    }
    
    setIsPaid(true);
    setStep(0);
    // Real app might not alert, but we will leave it or remove it. Let's make it smooth and just play.
  };

  return (
    <>
      {/* Sticky Bottom Action Button */}
      {!isPaid && (
        <div 
          onClick={() => setStep(1)}
          className="fixed bottom-0 w-full max-w-md p-4 bg-background border-t border-gray-900 z-50 flex justify-between items-center cursor-pointer transition-transform active:scale-95 shadow-[0_-20px_25px_-5px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
               <span className="text-red-500 font-bold text-xl">⃠</span>
             </div>
             <div>
                <p className="text-sm text-gray-400">បម្រាម</p>
                <p className="text-[10px] text-gray-600">ហាមថតចម្លងវីដេអូ...</p>
             </div>
          </div>
          <button className="bg-red-600 px-6 py-3 rounded-full text-white font-bold text-sm shadow-lg shadow-red-600/20">
            ចុចទីនេះ! ដើម្បីមើលរឿង
          </button>
        </div>
      )}

      {/* Step 1 & 2: Bottom Sheet Overlay */}
      {(step === 1 || step === 2) && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-end animate-in fade-in duration-200" onClick={() => setStep(0)}>
          <div 
            className="w-full bg-[#111111] rounded-t-3xl border-t border-gray-800 animate-in slide-in-from-bottom-full duration-300"
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
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 shadow-xl">
                   <CreditCard className="w-10 h-10 text-gray-400" />
                </div>
                
                <h3 className="text-white text-lg font-medium mb-8 text-center px-4 leading-relaxed">
                  ដើម្បីអាចទស្សនារឿងនេះសូមអ្នកធ្វើការទិញរឿង
                </h3>
                
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <ShoppingCart className="w-5 h-5" />
                  ទិញរឿងនេះ 4,000៛
                </button>
              </div>
            )}

            {/* Content Step 2 */}
            {step === 2 && (
              <div className="p-6">
                <h3 className="text-gray-400 text-sm mb-2 text-center">ទឹកប្រាក់ត្រូវទូទាត់</h3>
                <h2 className="text-white text-3xl font-bold mb-8 text-center">4,000៛</h2>
                
                <div className="space-y-4 mb-8">
                  <h4 className="text-white font-medium mb-4">ប្រតិបត្តិការលម្អិត</h4>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">ឈ្មោះ៖</span>
                    <span className="text-white text-sm">អ្នកនិពន្ធរឿងល្បីៗ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">ទៅគណនី៖</span>
                    <span className="text-white text-sm">SabayFlix</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">កាលបរិច្ឆេទ៖</span>
                    <span className="text-white text-sm">20 កក្កដា 2026 8:01 ព្រឹក</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">តម្លៃដើម៖</span>
                    <span className="text-white text-sm">4,000៛</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3.5 bg-gray-800 text-white rounded-xl font-medium active:scale-95 transition-transform">
                    បញ្ចូលលេខកូដប្រូម៉ូសិន
                  </button>
                  <button 
                    onClick={() => {
                      setTimer(299);
                      setStep(3);
                    }}
                    className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold active:scale-95 transition-transform"
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
        <div className="fixed inset-0 z-[70] bg-[#1a1b23] flex flex-col animate-in fade-in slide-in-from-bottom-full duration-300">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
             <div className="text-white font-medium flex items-center gap-2">
                <span className="bg-red-600 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Member Of</span>
                <span>KHQR</span>
             </div>
             <button onClick={() => setStep(0)} className="text-gray-400 hover:text-white p-2">
                <X className="w-6 h-6" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
             <div className="text-gray-400 text-sm mb-2 mt-4">យើងរង់ចាំការទូទាត់</div>
             <div className="text-white text-4xl font-mono mb-8">{formatTime(timer)}</div>

             <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden mb-8">
                <div className="absolute top-0 left-0 right-0 bg-red-600 h-16 flex items-center justify-center">
                   <span className="text-white font-bold tracking-widest text-xl">KHQR</span>
                </div>
                
                <div className="mt-16 flex justify-between items-center mb-6">
                   <div className="text-black font-medium">SabayFlix</div>
                   <div className="text-red-600 font-bold text-lg">4,000៛</div>
                </div>

                <div className="border border-gray-200 p-2 rounded-xl bg-gray-50 aspect-square relative mb-6">
                   {/* Using placehold.co for fake QR to avoid external image dependencies breaking */}
                   <img src="https://placehold.co/400x400/FFFFFF/000000/png?text=KHQR+Code" alt="KHQR" className="w-full h-full object-contain mix-blend-multiply" />
                   
                   {/* Fake Logo in center of QR */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                      <span className="text-red-600 font-bold text-[10px]">SABAY</span>
                   </div>
                </div>

                <div className="text-center text-xs text-gray-500 break-all px-4">
                  S260720203948860
                </div>
             </div>

             <p className="text-gray-400 text-center text-sm px-8 mb-8 leading-relaxed">
               សូមថតរូបភាព QR ឬ Screenshot ដើម្បីយកទៅទូទាត់ប្រាក់នៅក្នុងកម្មវិធីធនាគារ
             </p>

             <button 
               onClick={handlePaySuccess}
               className="w-full max-w-sm py-4 bg-gray-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform border border-gray-700"
             >
               <Camera className="w-5 h-5" />
               ថតអេក្រង់(Screenshot)
             </button>
          </div>
        </div>
      )}
    </>
  );
}
