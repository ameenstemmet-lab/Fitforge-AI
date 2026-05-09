/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Activity, Flame, Heart, Moon, Zap, ArrowRight, Play, Brain } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const mockChartData = [
  { value: 65 }, { value: 72 }, { value: 68 }, { value: 75 }, 
  { value: 85 }, { value: 82 }, { value: 91 }
];

export const Dashboard = ({ onStartWorkout }: { onStartWorkout: () => void }) => {
  return (
    <div className="pb-32 pt-8 px-6 space-y-10 max-w-2xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-display font-extralight tracking-tight">
            Evening, <span className="font-extrabold italic">Felix</span>
          </h2>
          <p className="text-white/40 text-sm font-medium mt-1">Your body is primed for strength work.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Wearable</p>
            <p className="text-[10px] text-neon-lime font-bold uppercase tracking-widest">Connected</p>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-full border-2 border-neon-lime p-0.5 transition-transform group-hover:scale-105">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 sm:col-span-5 glass rounded-[32px] p-6 relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-neon-lime/10 rounded-2xl text-neon-lime">
              <Zap size={20} />
            </div>
            <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Bio-Status</span>
          </div>
          <div className="space-y-1">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">Readiness</p>
            <p className="text-6xl font-display font-extrabold tracking-tighter">84<span className="text-xl font-light ml-1 opacity-20">%</span></p>
          </div>
          <div className="h-10 mt-6 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <Line type="monotone" dataKey="value" stroke="#CCFF00" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none">
            <p className="text-8xl font-black italic">84</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 sm:col-span-7 glass-dark rounded-[32px] p-6 flex flex-col justify-between border-white/5"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-white/60">
              <Activity size={20} />
            </div>
            <div className="text-right">
               <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">Goal Progress</p>
               <p className="text-lg font-display font-bold italic text-neon-lime">72%</p>
            </div>
          </div>
          <div className="space-y-1 mt-4">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Burn</p>
            <p className="text-4xl font-display font-extrabold tracking-tight">2,450 <span className="text-xs font-light tracking-normal opacity-40">kcal</span></p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neon-lime shadow-[0_0_8px_rgba(204,255,0,0.4)]" style={{ width: '72%' }}></div>
            </div>
            <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Optimal</span>
          </div>
        </motion.div>
      </div>

      {/* AI Intelligence Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative group cursor-pointer"
      >
        <div className="absolute inset-0 bg-neon-lime opacity-[0.03] blur-3xl group-hover:opacity-[0.06] transition-opacity"></div>
        <div className="glass p-7 rounded-[32px] border-white/10 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-14 h-14 shrink-0 rounded-2xl bg-neon-lime flex items-center justify-center text-black shadow-lg">
            <Brain size={28} />
          </div>
          <div className="space-y-3">
            <p className="text-[10px] text-neon-lime font-black uppercase tracking-[0.2em] leading-none">AI Coach Pulse</p>
            <h3 className="text-xl font-bold leading-tight font-display pr-4 group-hover:text-neon-lime transition-colors">
              "Your squat depth has improved by 4cm since Tuesday. Keep that hip drive consistent tonight for peak intensity."
            </h3>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-black uppercase tracking-widest text-white/40">
               <span>Deep Analysis Active</span>
               <div className="w-1 h-1 rounded-full bg-neon-lime animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Action Card */}
      <section className="space-y-5">
        <div className="flex justify-between items-end px-2">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/40">Suggested Session</h2>
          <button className="text-white/60 text-[10px] font-bold uppercase tracking-widest hover:text-neon-lime transition-colors">View All Schedule</button>
        </div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="relative rounded-[32px] overflow-hidden aspect-[16/10] sm:aspect-[21/9] group cursor-pointer border border-white/10 bg-black"
        >
          <img 
            src="https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&auto=format&fit=crop&q=80" 
            alt="Workout"
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col sm:flex-row justify-between items-end gap-3">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="bg-neon-lime text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">AI OPTIMIZED</span>
                <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">72 Min</span>
              </div>
              <h3 className="text-4xl font-display font-extrabold tracking-tighter leading-none shadow-black drop-shadow-xl uppercase italic">
                Lower Body<br/>Push/Pull Elite
              </h3>
            </div>
            <button 
              onClick={onStartWorkout}
              className="px-10 py-5 bg-neon-lime text-black rounded-2xl font-black tracking-tighter text-lg shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(204,255,0,0.5)] active:scale-95"
            >
              START WORKOUT
            </button>
          </div>
        </motion.div>
      </section>

      {/* Mini Stats Footer */}
      <div className="grid grid-cols-4 gap-4 px-2">
           {[
             { icon: Flame, value: '542', label: 'Kcal', color: 'text-orange-500' },
             { icon: Heart, value: '58', label: 'Bpm', color: 'text-red-500' },
             { icon: Moon, value: '7.2h', label: 'Sleep', color: 'text-indigo-400' },
             { icon: Activity, value: '84%', label: 'Daily', color: 'text-neon-cyan' }
           ].map((item, i) => (
             <div key={i} className="text-center group">
                <item.icon size={18} className={`mx-auto mb-2 opacity-40 group-hover:opacity-100 transition-opacity ${item.color}`} />
                <p className="text-sm font-bold font-display">{item.value}</p>
                <p className="text-[8px] text-white/20 font-black uppercase tracking-widest mt-0.5">{item.label}</p>
             </div>
           ))}
      </div>
    </div>
  );
};
