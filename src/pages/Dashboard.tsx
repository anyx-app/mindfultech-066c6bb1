import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, Target, ArrowUpRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Dashboard() {
  const stats = [
    { label: 'Screen Time', value: '3h 12m', change: '-12%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Current Streak', value: '5 Days', change: '+2', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Daily Goal', value: '4h 00m', change: '80%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2F3E35] tracking-tight mb-2">
            Good Morning, Alex
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            You are on track to meet your digital wellness goals today.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">View Reports</Button>
          <Button>Start Focus Mode</Button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-8 flex items-center justify-between group hover:border-[#6B9080]/50">
              <div>
                <p className="text-slate-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-4xl font-bold text-[#2F3E35]">{stat.value}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <ArrowUpRight size={12} /> {stat.change}
                  </span>
                  <span className="text-xs text-slate-400">vs yesterday</span>
                </div>
              </div>
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={32} />
              </div>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usage Chart Placeholder */}
        <Card className="p-8 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#2F3E35]">Weekly Activity</h2>
            <select className="bg-transparent border-none text-slate-500 font-medium cursor-pointer focus:ring-0">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
            {[40, 70, 30, 85, 50, 60, 45].map((h, i) => (
              <div key={i} className="w-full bg-[#E0EBE6] rounded-t-xl relative group overflow-hidden" style={{ height: `${h}%` }}>
                <div className="absolute inset-x-0 bottom-0 bg-[#6B9080] h-0 group-hover:h-full transition-all duration-700 ease-out opacity-80" />
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4 mt-4 text-slate-400 font-medium text-sm">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </Card>

        {/* Active Challenge */}
        <Card className="p-8 bg-gradient-to-br from-[#6B9080] to-[#557568] text-white border-none shadow-xl shadow-[#6B9080]/30 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold border border-white/20">Active Challenge</span>
              <span className="text-white/80 text-sm">Ends in 2 days</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Digital Detox Weekend</h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md">
              Reduce your screen time by 50% this weekend to earn the 'Zen Master' badge and improve your focus.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/90 w-[75%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
              <span className="font-bold text-xl">75%</span>
            </div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
        </Card>
      </section>
    </div>
  );
}
