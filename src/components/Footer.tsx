import React from 'react';
import { motion } from 'motion/react';
import { HERBS_LIST } from '../constants/config';
import { Language } from '../i18n/config';
import { PAGES_STRINGS } from '../i18n/pages';

const Marquee = ({ items, duration, reverse = false }: { items: string[], duration: number, reverse?: boolean }) => (
  <div className="flex overflow-hidden whitespace-nowrap py-2 border-y border-white/10">
    <motion.div
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 items-center pr-12"
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="text-4xl font-display uppercase tracking-widest text-white/40 hover:text-[var(--color-neon-orange)] transition-colors cursor-default">
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

export const Footer: React.FC<{ 
  onNavigate?: (tab: 'about' | 'data_source' | 'contact') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}> = ({ onNavigate, language, setLanguage }) => {
  const t = PAGES_STRINGS[language].FOOTER;
  return (
    <footer className="bg-[var(--color-brutal-black)] text-white py-12 overflow-hidden">
      <Marquee items={HERBS_LIST} duration={60} />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest opacity-40 mt-12">
        <span>© 2026 Medicinal & Edible Homology Series</span>
        <div className="flex gap-12">
          <button onClick={() => onNavigate && onNavigate('about')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[0].label}</button>
          <button onClick={() => onNavigate && onNavigate('data_source')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[1].label}</button>
          <button onClick={() => onNavigate && onNavigate('contact')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[2].label}</button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setLanguage('zh')} 
            className={`hover:text-[var(--color-neon-orange)] transition-colors ${language === 'zh' ? 'text-[var(--color-neon-orange)]' : ''}`}
          >
            ZH
          </button>
          <button 
            onClick={() => setLanguage('en')} 
            className={`hover:text-[var(--color-neon-orange)] transition-colors ${language === 'en' ? 'text-[var(--color-neon-orange)]' : ''}`}
          >
            EN
          </button>
        </div>
      </div>
    </footer>
  );
};

