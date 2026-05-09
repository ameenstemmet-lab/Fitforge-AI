/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Apple, Utensils, Droplets, Camera, Plus, Search, ChevronRight } from 'lucide-react';

export const Nutrition = () => {
  const meals = [
    { name: "Post-Workout Smoothie", calories: 420, macros: "24g P / 56g C / 8g F", time: "08:30 AM", type: "Breakfast" },
    { name: "Quinoa Chicken Bowl", calories: 650, macros: "45g P / 65g C / 12g F", time: "12:45 PM", type: "Lunch" }
  ];

  return (
    <div className="pb-32 pt-8 px-6 space-y-8 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-display font-extrabold tracking-tight italic uppercase">Fuel <span className="text-neon-lime">Forge</span></h1>
        <p className="text-white/40 text-sm font-medium">1,820 / 2,600 kcal burned today</p>
      </header>

      {/* Macro Tracking */}
      <div className="glass rounded-[32px] p-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-8">
           <h3 className="font-bold text-lg">Daily Macros</h3>
           <div className="flex gap-2">
              <button className="p-2 bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"><Search size={18} /></button>
              <button className="p-2 bg-neon-lime/10 rounded-xl text-neon-lime"><Camera size={18} /></button>
           </div>
        </div>

        <div className="space-y-6">
           <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                 <span>Protein</span>
                 <span className="text-white">142g / 180g</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: '78%' }}></div>
              </div>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                 <span>Carbohydrates</span>
                 <span className="text-white">180g / 300g</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-neon-lime" style={{ width: '60%' }}></div>
              </div>
           </div>
        </div>
      </div>

      {/* Meal Photo Scan Promo */}
      <div className="bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 rounded-3xl p-6 border border-neon-green/30 relative">
         <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-neon-green flex items-center justify-center text-black shrink-0">
               <Camera size={24} />
            </div>
            <div>
               <h4 className="font-bold">Scan Your Plate</h4>
               <p className="text-xs text-gray-300 mt-1">Our AI detects portion sizes and macros automatically from a photo.</p>
               <button className="mt-3 text-neon-green text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  Try AI Scan <ChevronRight size={12} />
               </button>
            </div>
         </div>
      </div>

      {/* Water Tracker */}
      <div className="grid grid-cols-2 gap-4">
         <div className="glass p-4 rounded-3xl flex items-center gap-4">
            <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
               <Droplets size={24} />
            </div>
            <div>
               <p className="text-lg font-bold">1.8 <span className="text-[10px] opacity-50 uppercase">L</span></p>
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hydration</p>
            </div>
         </div>
         <button className="glass border-dashed border-white/20 p-4 rounded-3xl flex flex-center items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors">
            <Plus size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Add Log</span>
         </button>
      </div>

      {/* Meal List */}
      <section className="space-y-4">
         <h2 className="text-xl font-bold font-display">Timeline</h2>
         <div className="space-y-3">
            {meals.map((meal, i) => (
              <div key={i} className="glass p-4 rounded-2xl flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                      <Apple size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{meal.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{meal.type} • {meal.time}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="font-bold text-sm italic">{meal.calories} kcal</p>
                   <p className="text-[10px] text-gray-500 font-medium">{meal.macros}</p>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};
