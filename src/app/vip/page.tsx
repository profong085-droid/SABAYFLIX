"use client";

import { Crown, Check, ChevronLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VIPPage() {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

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
           <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 text-lg">
             <CreditCard className="w-6 h-6" />
             បង់ប្រាក់ឥឡូវនេះ (Pay Now)
           </button>
           <p className="text-center text-gray-500 text-xs mt-4">
             ការទូទាត់មានសុវត្ថិភាព 100% អាចបង់តាម KHQR, Visa, Mastercard
           </p>
        </div>

      </div>
    </main>
  );
}
