/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './screens/Dashboard';
import { Onboarding } from './screens/Onboarding';
import { AICoach } from './components/AICoach';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { Nutrition } from './screens/Nutrition';
import { Recovery } from './screens/Recovery';
import { Subscriptions } from './screens/Subscriptions';
import { Navigation } from './components/Navigation';

import { LayoutDashboard, Dumbbell, Utensils, Zap, MessageSquare, User } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all ${
      active 
        ? 'bg-white/5 border-white/10 text-neon-lime' 
        : 'border-transparent text-white/40 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]' : ''} />
    <span className="font-bold uppercase tracking-widest text-xs italic">{label}</span>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isPlayingWorkout, setIsPlayingWorkout] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('fitforge_user');
    if (saved) {
      setUserData(JSON.parse(saved));
      setIsOnboardingComplete(true);
    }
  }, []);

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    localStorage.setItem('fitforge_user', JSON.stringify(data));
    setIsOnboardingComplete(true);
  };

  const startWorkout = () => {
    setIsPlayingWorkout(true);
  };

  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <Dashboard onStartWorkout={startWorkout} />;
      case 'coach': return <AICoach />;
      case 'nutrition': return <Nutrition />;
      case 'recovery': return <Recovery />;
      case 'workout': return <Dashboard onStartWorkout={startWorkout} />; // Placeholder
      case 'profile': return <Subscriptions />;
      default: return <Dashboard onStartWorkout={startWorkout} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-neon-lime selection:text-black flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-dark-sidebar border-r border-white/10 p-8 shrink-0">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-10 h-10 bg-neon-lime rounded-xl flex items-center justify-center text-black shadow-lg">
             <div className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-black rounded-full"></div>
             </div>
          </div>
          <h1 className="text-xl font-display font-black italic tracking-tighter uppercase leading-none">
            FitForge<span className="text-neon-lime">AI</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <SidebarItem icon={Dumbbell} label="Workouts" active={activeTab === 'workout'} onClick={() => setActiveTab('workout')} />
          <SidebarItem icon={Utensils} label="Nutrition" active={activeTab === 'nutrition'} onClick={() => setActiveTab('nutrition')} />
          <SidebarItem icon={Zap} label="Recovery" active={activeTab === 'recovery'} onClick={() => setActiveTab('recovery')} />
          <SidebarItem icon={MessageSquare} label="AI Coach" active={activeTab === 'coach'} onClick={() => setActiveTab('coach')} />
        </nav>

        <div className="mt-auto p-6 bg-white/5 rounded-3xl border border-white/10">
          <p className="text-[10px] uppercase font-black tracking-widest text-white/20 mb-3">Goal Progress</p>
          <div className="flex justify-between items-end mb-2">
             <p className="text-sm font-bold italic uppercase">Muscle Elite</p>
             <p className="text-[10px] font-black text-neon-lime">72%</p>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-neon-lime shadow-[0_0_8px_rgba(204,255,0,0.5)]" style={{ width: '72%' }}></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative h-screen hide-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {isPlayingWorkout && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <WorkoutPlayer onExit={() => setIsPlayingWorkout(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

