import React from 'react';
import { Leaf } from 'lucide-react';
import { APP_CONFIG, STRINGS } from '../constants/config';

interface HeaderProps {
  onLogoClick: () => void;
  onTabChange: (tab: 'papers' | 'faq' | 'full_database', category?: string) => void;
  activeTab: 'papers' | 'faq' | 'full_database';
  showLanding: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onTabChange, activeTab, showLanding }) => (
  <header className="bg-[var(--color-gallery-white)] border-b-2 border-[var(--color-brutal-black)] sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onLogoClick}>
          <div className="bg-[var(--color-brutal-black)] p-3 brutal-shadow">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tighter uppercase">{APP_CONFIG.NAME}</h1>
            <p className="text-sm font-bold uppercase tracking-widest">{APP_CONFIG.NAME_EN}</p>
          </div>
        </div>

        <nav className="flex gap-2">
          <button
            onClick={() => onTabChange('papers')}
            className={`px-6 py-3 font-bold uppercase tracking-widest brutal-border transition-all ${
              !showLanding && activeTab === 'papers' ? 'bg-[var(--color-neon-orange)] text-white brutal-shadow' : 'bg-white hover:bg-slate-100'
            }`}
          >
            {STRINGS.HEADER.TABS.PAPERS}
          </button>
          <button
            onClick={() => onTabChange('faq')}
            className={`px-6 py-3 font-bold uppercase tracking-widest brutal-border transition-all ${
              !showLanding && activeTab === 'faq' ? 'bg-[var(--color-neon-orange)] text-white brutal-shadow' : 'bg-white hover:bg-slate-100'
            }`}
          >
            {STRINGS.HEADER.TABS.FAQ}
          </button>
          <button
            onClick={() => onTabChange('full_database')}
            className={`px-6 py-3 font-bold uppercase tracking-widest brutal-border transition-all ${
              !showLanding && activeTab === 'full_database' ? 'bg-[var(--color-neon-orange)] text-white brutal-shadow' : 'bg-white hover:bg-slate-100'
            }`}
          >
            {STRINGS.HEADER.TABS.FULL_DB}
          </button>
        </nav>
      </div>
    </div>
  </header>
);
