"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Film, CreditCard, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: "ផ្ទាំងគ្រប់គ្រង (Dashboard)", icon: LayoutDashboard, href: "/admin" },
    { name: "គ្រប់គ្រងរឿង (Movies)", icon: Film, href: "/admin/movies" },
    { name: "អ្នកប្រើប្រាស់ (Users)", icon: Users, href: "/admin/users" },
    { name: "ប្រតិបត្តិការទូទាត់ (Payments)", icon: CreditCard, href: "/admin/payments" },
    { name: "ការកំណត់ (Settings)", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-gray-800 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-red-600 tracking-widest">SABAYFLIX</h1>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">ត្រលប់ទៅ App វិញ</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
