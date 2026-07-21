"use client";

import Link from "next/link";
import { Gift, ArrowLeft } from "lucide-react";

export default function PromotionsPage() {
  return (
    <main className="min-h-screen bg-background pb-20 font-sans">
      <div className="flex items-center gap-3 p-4 bg-background sticky top-0 z-40 border-b border-gray-900/50">
        <Link href="/">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <span className="text-xl font-bold text-white">ប្រូម៉ូសិន (Promotions)</span>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4 pt-6">
        {/* Promotion Card 1 */}
        <div className="bg-[#141414] rounded-xl overflow-hidden border border-red-500/30">
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-900 flex items-center justify-center">
            <Gift className="w-12 h-12 text-white opacity-80" />
            <div className="ml-4 text-white">
              <h3 className="text-2xl font-bold">បញ្ចុះតម្លៃ ៥០%</h3>
              <p className="text-sm opacity-80">សម្រាប់គណនីថ្មី</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-sm mb-3">ទទួលបានការបញ្ចុះតម្លៃ ៥០% ភ្លាមៗសម្រាប់ការទិញរឿងលើកដំបូងរបស់អ្នក! កុំឲ្យឱកាសនេះកន្លងផុតឲ្យសោះ។</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-500 font-mono">កូដ: WELCOME50</span>
              <span className="text-xs text-gray-500">ផុតកំណត់: ថ្ងៃនេះ</span>
            </div>
          </div>
        </div>
        
        {/* Promotion Card 2 */}
        <div className="bg-[#141414] rounded-xl overflow-hidden border border-gray-800">
          <div className="h-32 bg-gradient-to-r from-blue-900 to-gray-900 flex items-center justify-center">
             <div className="text-center text-white">
               <h3 className="text-xl font-bold">បញ្ចូលលុយ ABA ថែម ១ ដុល្លារ</h3>
             </div>
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-sm mb-3">រាល់ការបញ្ចូលលុយ ឬទិញរឿងតាមរយៈ ABA Pay នឹងទទួលបានការបញ្ចុះតម្លៃបន្ថែម ៤,០០០៛។</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-400 font-mono">មិនបាច់ប្រើកូដទេ</span>
              <span className="text-xs text-gray-500">ផុតកំណត់: ចុងខែនេះ</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
