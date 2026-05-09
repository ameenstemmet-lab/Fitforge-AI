/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Moon, Heart, Zap, Thermometer, Brain, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const hrvData = [
  { time: '1AM', value: 45 }, { time: '2AM', value: 48 }, { time: '3AM', value: 55 },
  { time: '4AM', value: 72 }, { time: '5AM', value: 68 }, { time: '6AM', value: 64 },
  { time: '7AM', value: 70 }
];

export const Recovery = () => {
  return (
    <div className="pb-32 pt-8 px-6 space-y-10 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-display font-extrabold tracking-tight uppercase">Recovery <span className="text-neon-lime italic">Pulse</span></h1>
        <p className="text-white/40 text-sm font-medium">Optimal performance state reached.</p>
      </header>

      {/* Main Readiness Gauge */}
      <div className="relative aspect-square max-w-[280px] mx-auto flex items-center justify-center">
         <div className="absolute inset-0 border-[8px] border-white/5 rounded-full"></div>
         <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="140" cy="140" r="130" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
              <circle cx="140" cy="140" r="130" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="816" strokeDashoffset="130" className="text-neon-lime" />
            </svg>
         </div>
         <div className="text-center relative z-10">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Status</p>
            <p className="text-8xl font-display font-extrabold tracking-tight">84</p>
            <p className="text-[10px] font-black text-neon-lime mt-1 uppercase tracking-widest flex items-center justify-center gap-1">
               Peak Recovery <ArrowUpRight size={12} />
            </p>
         </div>
      </div>

      {/* HRV Trend */}
      <div className="glass rounded-[32px] p-6 space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h3 className="font-bold">HRV Multi-Pulse</h3>
               <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">Last 7H analysis</p>
            </div>
            <div className="text-right">
               <p className="text-2xl font-display font-black text-neon-lime">72 ms</p>
            </div>
         </div>
         <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hrvData}>
                <Line type="monotone" dataKey="value" stroke="#CCFF00" strokeWidth={4} dot={false} />
                <XAxis dataKey="time" hide />
              </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Recovery Breakdown Grid */}
      <div className="grid grid-cols-2 gap-4">
         <div className="glass p-5 rounded-3xl space-y-4">
            <div className="flex justify-between">
               <Moon size={20} className="text-indigo-400" />
               <span className="text-[10px] font-bold text-indigo-400">Deep</span>
            </div>
            <div>
               <p className="text-3xl font-display font-extrabold">2h 15m</p>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Restorative Sleep</p>
            </div>
         </div>
         <div className="glass p-5 rounded-3xl space-y-4">
            <div className="flex justify-between">
               <Heart size={20} className="text-red-400" />
               <span className="text-[10px] font-bold text-red-400 text-right">RHR</span>
            </div>
            <div>
               <p className="text-3xl font-display font-extrabold">58 b<span className="text-sm">pm</span></p>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Resting Heart Rate</p>
            </div>
         </div>
      </div>

      {/* AI Recovery Advice */}
      <div className="glass-dark border-neon-purple/20 p-6 rounded-3xl relative">
         <div className="absolute -top-3 left-6 px-3 py-1 bg-neon-purple text-black text-[10px] font-extrabold uppercase rounded shadow-lg">
            AI Prescription
         </div>
         <p className="text-sm leading-relaxed text-gray-300 italic">
            "Your nervous system is primed for high-output explosive movements. Avoid steady-state cardio; instead, opt for 
            heavy compound lifts. Focus on vitamin D uptake today."
         </p>
      </div>

      {/* Stats Table */}
      <div className="space-y-4">
         <h2 className="text-xl font-bold font-display px-2">Vitals</h2>
         <div className="space-y-1">
            {[
              { label: 'Skin Temp', value: '+0.2°C', icon: Thermometer, trend: 'neutral' },
              { label: 'Stress Lvl', value: 'Low', icon: Brain, trend: 'positive' },
              { label: 'Active Burn', value: '2,450', icon: Zap, trend: 'positive' },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center p-4 glass rounded-2xl">
                 <div className="flex items-center gap-3">
                    <stat.icon size={18} className="text-gray-400" />
                    <span className="text-sm font-semibold">{stat.label}</span>
                 </div>
                 <span className="font-bold font-display">{stat.value}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
