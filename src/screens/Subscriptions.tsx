/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Star, Users, Crown } from 'lucide-react';

export const Subscriptions = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      icon: Star,
      features: ["Basic workout tracking", "Limited AI advice", "Standard nutrition logs"],
      color: "gray"
    },
    {
      name: "Pro",
      price: "$14.99",
      period: "/ mo",
      icon: Zap,
      features: ["Unlimited AI Workouts", "Full Nutrition Coach", "Wearable Integration", "Advanced Analytics"],
      color: "neon-cyan",
      popular: true
    },
    {
      name: "Elite",
      price: "$29.99",
      period: "/ mo",
      icon: Crown,
      features: ["AI Form Correction", "Live Voice Training", "Premium Meal Plans", "Exclusive Leaderboards", "Family Plan Support"],
      color: "neon-purple"
    }
  ];

  return (
    <div className="pb-32 pt-8 px-6 space-y-8 max-w-2xl mx-auto">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-display font-black tracking-tight italic">Forge <span className="text-neon-cyan">Unlimited</span></h1>
        <p className="text-gray-400 font-medium">Unlock your full athletic potential with AI</p>
      </header>

      <div className="space-y-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative glass rounded-[32px] p-8 border-2 transition-all ${
              plan.popular ? 'border-neon-lime active:scale-[0.98]' : 'border-white/5'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-8 bg-neon-lime text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="flex justify-between items-start mb-8">
               <div className={`p-4 rounded-2xl ${
                 plan.color === 'neon-cyan' ? 'bg-neon-lime/20 text-neon-lime' : 
                 plan.color === 'neon-purple' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-white/10 text-white/40'
               }`}>
                  <plan.icon size={32} />
               </div>
               <div className="text-right">
                  <p className="text-4xl font-display font-black">{plan.price}<span className="text-sm font-medium opacity-20">{plan.period}</span></p>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{plan.name} Tier</p>
               </div>
            </div>

            <ul className="space-y-4 mb-10">
               {plan.features.map(f => (
                 <li key={f} className="flex gap-4 items-center text-sm font-bold text-white/60">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.color === 'neon-cyan' ? 'bg-neon-lime text-black' : 
                      plan.color === 'neon-purple' ? 'bg-neon-purple text-white' : 'bg-white/10 text-white/40'
                    }`}>
                       <Check size={12} strokeWidth={4} />
                    </div>
                    {f}
                 </li>
               ))}
            </ul>

            <button className={`w-full py-5 rounded-2xl font-display font-black text-xl transition-all shadow-xl ${
              plan.color === 'neon-cyan' ? 'bg-neon-lime text-black shadow-[0_10px_30px_rgba(204,255,0,0.2)] hover:scale-[1.02]' :
              plan.color === 'neon-purple' ? 'bg-neon-purple text-white shadow-[0_10px_30px_rgba(188,19,254,0.2)] hover:scale-[1.02]' :
              'bg-white text-black hover:scale-[1.02]'
            }`}>
              GET {plan.name.toUpperCase()}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="text-center p-6 glass rounded-2xl opacity-60">
         <p className="text-xs font-medium text-gray-400">
            Secure payments via Stripe. Cancel anytime. All plans include 7-day free trial.
         </p>
      </div>
    </div>
  );
};
