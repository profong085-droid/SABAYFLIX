"use client";

import Link from "next/link";
import { Bell, ArrowLeft, MailOpen } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "សូមស្វាគមន៍មកកាន់ PHUMCINE!",
      message: "សូមអរគុណសម្រាប់ការចុះឈ្មោះប្រើប្រាស់។ អ្នកអាចចាប់ផ្តើមស្វែងរក និងទិញរឿងបានហើយចាប់ពីពេលនេះតទៅ។",
      date: "ថ្ងៃនេះ",
      read: false
    },
    {
      id: 2,
      title: "រឿងថ្មីទើបចេញ",
      message: "រឿង ម៉ែក្រឡាភ្លើង កំពុងចាក់បញ្ចាំងហើយ! ចូលមើលឥឡូវនេះ។",
      date: "ម្សិលមិញ",
      read: true
    }
  ];

  return (
    <main className="min-h-screen bg-background pb-20 font-sans">
      <div className="flex items-center gap-3 p-4 bg-background sticky top-0 z-40 border-b border-gray-900/50">
        <Link href="/">
          <ArrowLeft className="w-6 h-6 text-white" />
        </Link>
        <span className="text-xl font-bold text-white">សារថ្មីៗ (Notifications)</span>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-3 pt-6">
        {notifications.map(notif => (
          <div key={notif.id} className={`p-4 rounded-xl border ${notif.read ? 'bg-[#141414] border-gray-800' : 'bg-red-900/10 border-red-500/30'}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-1 rounded-full p-2 ${notif.read ? 'bg-gray-800 text-gray-400' : 'bg-red-500/20 text-red-500'}`}>
                {notif.read ? <MailOpen className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div>
                <h4 className={`font-bold text-sm mb-1 ${notif.read ? 'text-gray-300' : 'text-white'}`}>{notif.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">{notif.message}</p>
                <span className="text-[10px] text-gray-500">{notif.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
