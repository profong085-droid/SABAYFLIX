"use client";

import { Crown, Check, ChevronLeft, CreditCard, X, QrCode, Loader2, Camera } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import qrImage from "@/qr/qrkh.jpg";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { upgradeToVip } from "@/lib/db";
import { useToast } from "@/components/Toast";

export default function VIPPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(299); // 4:59

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showPayment && !isSuccess && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPayment, isSuccess, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const plans = [
    {
      id: 1,
      name: "VIP ១ខែ",
      price: "$2.99",
      duration: "រៀងរាល់ខែ",
      popular: false,
      features: ["មើលរឿងគ្មានពាណិជ្ជកម្ម", "គុណភាព FHD (1080p)", "ទាញយករឿងទុកមើល Offline"]
    },
    {
      id: 2,
      name: "VIP ៦ខែ",
      price: "$14.99",
      duration: "៦ខែម្តង",
      popular: true,
      features: ["មើលរឿងគ្មានពាណិជ្ជកម្ម", "គុណភាព 4K Ultra HD", "ទាញយករឿងទុកមើល Offline", "មើលបាន 2 ឧបករណ៍ដំណាលគ្នា"]
    },
    {
      id: 3,
      name: "VIP ១ឆ្នាំ",
      price: "$24.99",
      duration: "១ឆ្នាំម្តង",
      popular: false,
      features: ["មើលរឿងគ្មានពាណិជ្ជកម្ម", "គុណភាព 4K Ultra HD", "ទាញយករឿងទុកមើល Offline", "មើលបាន 4 ឧបករណ៍ដំណាលគ្នា", "ទទួលបានរឿងមុនគេ (Early Access)"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-24 font-sans selection:bg-red-500/30">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-red-900/40 via-[#0a0a0a] to-[#0a0a0a] -z-10" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-red-600/20 blur-[100px] rounded-full -z-10" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40 border-b border-white/5">
        <Link href="/profile" className="text-gray-400 hover:text-white p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-white text-lg font-bold tracking-wide flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          VIP PRIVILEGE
        </h1>
        <div className="w-10" /> {/* Placeholder */}
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">ក្លាយជាសមាជិក VIP ថ្ងៃនេះ!</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            រីករាយទស្សនាភាពយន្តរាប់ពាន់រឿងក្នុងកម្រិតច្បាស់ត្រជាក់ភ្នែក និងគ្មានពាណិជ្ជកម្មរំខាន ជាមួយជម្រើសកញ្ចប់សេវាកម្មដ៏ស័ក្តិសមសម្រាប់អ្នក។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-1 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? "bg-gradient-to-b from-red-500 to-red-900 shadow-[0_0_30px_rgba(220,38,38,0.3)] scale-105 z-10" 
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap z-20">
                  ពេញនិយមបំផុត (MOST POPULAR)
                </div>
              )}
              
              <div className={`h-full bg-[#111111] rounded-[22px] p-6 flex flex-col ${selectedPlan === plan.id ? 'bg-opacity-90 backdrop-blur-sm' : ''}`}>
                
                <h3 className="text-white text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="flex items-end gap-1 mb-6 border-b border-white/10 pb-6">
                  <span className="text-white text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">/{plan.duration}</span>
                </div>
                
                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-0.5 ${selectedPlan === plan.id ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-gray-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-sm ${selectedPlan === plan.id ? 'text-gray-200' : 'text-gray-400'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className={`w-full py-3 rounded-xl font-bold text-center text-sm transition-colors ${
                  selectedPlan === plan.id 
                    ? "bg-red-600 text-white shadow-lg" 
                    : "bg-white/5 text-white/50"
                }`}>
                  {selectedPlan === plan.id ? "ជ្រើសរើសកញ្ចប់នេះ" : "ចុចទីនេះ"}
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="max-w-md mx-auto">
           <button 
             onClick={() => {
               if (!user) {
                 showToast("សូមចូលគណនី (Login) ជាមុនសិន ដើម្បីទិញកញ្ចប់ VIP!", "info", "error");
                 router.push("/login");
                 return;
               }
               setShowPayment(true);
             }}
             className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
           >
             <CreditCard className="w-6 h-6" />
             បង់ប្រាក់ឥឡូវនេះ (Pay Now)
           </button>
           <p className="text-center text-gray-500 text-xs mt-4">
             ការទូទាត់មានសុវត្ថិភាព 100% អាចបង់តាម KHQR, Visa, Mastercard
           </p>
        </div>

      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#090B10] w-full max-w-md rounded-2xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl border border-gray-900">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-900">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Member Of</span>
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold tracking-wider">KHQR</span>
              </div>
              <button onClick={() => setShowPayment(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
              {isSuccess ? (
                <div className="text-center py-8 w-full">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">ជោគជ័យ!</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    សូមអបអរសាទរ! លោកអ្នកបានក្លាយជាសមាជិក VIP ជាផ្លូវការ។
                  </p>
                  <button 
                    onClick={() => {
                      setShowPayment(false);
                      router.push("/profile");
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    ចូលទៅកាន់គណនី
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mt-4 mb-6">
                    <span className="text-gray-400 text-xs">យើងរង់ចាំការស្កេនទូទាត់</span>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-[#3b82f6] animate-spin"></div>
                    <span className="text-gray-300 text-xs font-mono">{formatTime(timer)}</span>
                  </div>

                  <h3 className="text-white text-sm font-medium mb-6 text-center px-4">
                    សូមស្កេនទូទាត់ទឹកប្រាក់ដើម្បីក្លាយជាសមាជិក VIP
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
                          <div className="absolute right-0 top-0 bottom-0 w-6 bg-white" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
                      </div>
                      
                      <div className="p-3 flex flex-col items-center">
                          <div className="w-full text-left mb-2">
                            <div className="text-gray-800 font-medium text-xs">PhumCine VIP</div>
                            <div className="text-black font-bold text-sm">{plans.find(p => p.id === selectedPlan)?.price}</div>
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
                    disabled={isProcessing}
                    onClick={async () => {
                      if (!user) return;
                      setIsProcessing(true);
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      const planName = plans.find(p => p.id === selectedPlan)?.name || "VIP";
                      await upgradeToVip(user.uid, planName);
                      setIsProcessing(false);
                      setIsSuccess(true);
                    }}
                    className="w-full max-w-[200px] py-3 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform text-xs shadow-lg mb-4 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        កំពុងផ្ទៀងផ្ទាត់...
                      </>
                    ) : (
                      <>
                        ថតចម្លង (screenshot)
                        <Camera className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
