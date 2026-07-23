"use client";

import { Users, Film, CreditCard, Activity, Loader2, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { getAdminStats } from "@/lib/db";
import { allMoviesList } from "@/lib/mockData";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [realStats, setRealStats] = useState({ users: 0, revenue: 0 });

  useEffect(() => {
    async function loadStats() {
      const dbStats = await getAdminStats();
      setRealStats({ users: dbStats.totalUsers, revenue: dbStats.totalRevenue });
      setLoading(false);
    }
    loadStats();
  }, []);

  const stats = [
    { title: "ចំណូលសរុប (Revenue)", value: loading ? "..." : `${realStats.revenue.toLocaleString()}៛`, icon: CreditCard, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "អ្នកប្រើប្រាស់ (Total Users)", value: loading ? "..." : `${realStats.users}`, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "ចំនួនរឿង (Total Movies)", value: `${allMoviesList.length}`, icon: Film, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "សកម្មភាពថ្ងៃនេះ (Active Today)", value: loading ? "..." : Math.max(1, Math.floor(realStats.users / 2)), icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  const recentTransactions = [
    { id: "TX-9982", user: "សុខ សាន្ត", movie: "Fast X", amount: "4,000៛", status: "ជោគជ័យ", date: "ថ្ងៃនេះ 10:23 ព្រឹក" },
    { id: "TX-9981", user: "វណ្ណដា កំពូល", movie: "Avatar 2", amount: "4,000៛", status: "ជោគជ័យ", date: "ថ្ងៃនេះ 09:15 ព្រឹក" },
    { id: "TX-9980", user: "John Doe", movie: "John Wick 4", amount: "4,000៛", status: "បរាជ័យ", date: "ម្សិលមិញ 08:30 យប់" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            សួស្តី, Admin! <ShieldCheck className="w-7 h-7 text-red-500 inline-block" />
          </h1>
          <p className="text-gray-400">នេះជារបាយការណ៍សង្ខេបសម្រាប់ថ្ងៃនេះ។</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">ប្រតិបត្តិការទូទាត់ថ្មីៗ</h2>
          <button className="text-sm text-red-500 hover:text-red-400 font-medium transition-colors">
            មើលទាំងអស់
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111111] text-gray-400 text-sm">
                <th className="p-4 font-medium">លេខកូដ (ID)</th>
                <th className="p-4 font-medium">អ្នកប្រើប្រាស់ (User)</th>
                <th className="p-4 font-medium">រឿង (Movie)</th>
                <th className="p-4 font-medium">ចំនួនទឹកប្រាក់</th>
                <th className="p-4 font-medium">ស្ថានភាព</th>
                <th className="p-4 font-medium">កាលបរិច្ឆេទ</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-gray-300 font-mono">{tx.id}</td>
                  <td className="p-4 text-white font-medium">{tx.user}</td>
                  <td className="p-4 text-gray-300">{tx.movie}</td>
                  <td className="p-4 text-gray-300">{tx.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${tx.status === 'ជោគជ័យ' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
