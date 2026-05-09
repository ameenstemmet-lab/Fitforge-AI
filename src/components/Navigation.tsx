/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, Dumbbell, Utensils, Zap, MessageSquare, User } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItemProps {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-2 transition-all ${active ? 'text-neon-lime' : 'text-white/40 hover:text-white'}`}
  >
    <Icon size={24} className={active ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]' : ''} />
    <span className="text-[10px] uppercase font-bold mt-1 tracking-widest">{label}</span>
  </button>
);

export const Navigation = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
      <nav className="glass-dark rounded-[24px] flex justify-between items-center px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <NavItem icon={LayoutDashboard} label="Home" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
        <NavItem icon={Dumbbell} label="Workout" active={activeTab === 'workout'} onClick={() => onTabChange('workout')} />
        <NavItem icon={Utensils} label="Eat" active={activeTab === 'nutrition'} onClick={() => onTabChange('nutrition')} />
        <NavItem icon={Zap} label="Pulse" active={activeTab === 'recovery'} onClick={() => onTabChange('recovery')} />
        <NavItem icon={MessageSquare} label="Coach" active={activeTab === 'coach'} onClick={() => onTabChange('coach')} />
        <NavItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => onTabChange('profile')} />
      </nav>
    </div>
  );
};
