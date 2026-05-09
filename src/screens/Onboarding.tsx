/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Dumbbell, Target, Timer, Zap } from 'lucide-react';

export const Onboarding = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    fitnessLevel: 'intermediate',
    goals: [] as string[]
  });

  const steps = [
    { title: "Welcome to FitForge", subtitle: "Your AI-powered evolution begins today. First, what's your name?" },
    { title: "Define Your Goal", subtitle: "AI adapts your program based on your primary focus." },
    { title: "Fitness Level", subtitle: "Be honest—we'll customize the difficulty and coaching intensity." }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white p-8 flex flex-col justify-between overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-lime/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="relative z-10">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
        )}
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div>
              <p className="text-neon-lime font-black tracking-[0.3em] text-[9px] uppercase mb-4 leading-none">Intelligence Protocol • {step + 1}/{steps.length}</p>
              <h1 className="text-5xl font-display font-black leading-[0.9] mb-4 italic uppercase tracking-tighter">{steps[step].title}</h1>
              <p className="text-white/40 font-medium leading-relaxed max-w-[280px]">{steps[step].subtitle}</p>
            </div>

            {step === 0 && (
              <div className="space-y-4">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="NOM DE GUERRE" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black outline-none focus:border-neon-lime transition-colors placeholder:opacity-20 uppercase tracking-tighter italic"
                />
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3">
                {['Build Muscle', 'Weight Loss', 'Athletic Performance', 'Hybrid Fitness'].map((goal) => (
                  <button 
                    key={goal}
                    onClick={() => setFormData({...formData, goals: [goal]})}
                    className={`p-6 rounded-2xl border transition-all text-left flex justify-between items-center ${
                      formData.goals.includes(goal) 
                        ? 'bg-neon-lime/10 border-neon-lime text-white' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="font-black uppercase italic tracking-tighter text-lg">{goal}</span>
                    <ChevronRight size={20} className={formData.goals.includes(goal) ? 'text-neon-lime' : 'opacity-20'} />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-3">
                {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                  <button 
                    key={lvl}
                    onClick={() => setFormData({...formData, fitnessLevel: lvl as any})}
                    className={`p-6 rounded-2xl border transition-all text-left flex justify-between items-center capitalize ${
                      formData.fitnessLevel === lvl 
                        ? 'bg-neon-lime/10 border-neon-lime text-white' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="font-black uppercase italic tracking-tighter text-lg">{lvl}</span>
                    <Zap size={20} className={formData.fitnessLevel === lvl ? 'text-neon-lime' : 'opacity-20'} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 bottom-0 py-8 max-w-sm mx-auto w-full">
        <button 
          onClick={handleNext}
          disabled={step === 0 && !formData.name}
          className="w-full bg-neon-lime text-black py-6 rounded-2xl font-display font-black text-xl tracking-tighter shadow-[0_0_50px_rgba(204,255,0,0.2)] active:scale-[0.98] transition-all disabled:opacity-50 uppercase italic"
        >
          {step === steps.length - 1 ? 'ACTIVATE PROGRAM' : 'NEXT PROTOCOL'}
        </button>
      </div>
    </div>
  );
};
