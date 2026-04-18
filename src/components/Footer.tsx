import React from 'react';
import { HERBS_LIST } from '@heytcm/config';
import { PAGES_STRINGS, Language } from '@heytcm/i18n';
import { Marquee } from '@heytcm/ui';

export const Footer: React.FC<{ 

  onNavigate?: (tab: 'about' | 'data_source' | 'contact' | 'privacy' | 'terms') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}> = ({ onNavigate, language, setLanguage }) => {
  const t = PAGES_STRINGS[language].FOOTER;
  return (
    <footer className="bg-[var(--color-brutal-black)] text-white py-12 overflow-hidden">
      <Marquee items={HERBS_LIST} duration={60} />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest opacity-40 mt-12">
        <span>{t.COPYRIGHT}</span>
        <div className="flex gap-8 flex-wrap justify-center">
          <button onClick={() => onNavigate && onNavigate('about')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[0].label}</button>
          <button onClick={() => onNavigate && onNavigate('data_source')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[1].label}</button>
          <button onClick={() => onNavigate && onNavigate('contact')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.LINKS[2].label}</button>
          <button onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.PRIVACY_POLICY}</button>
          <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-[var(--color-neon-orange)] transition-colors uppercase">{t.TERMS_OF_USE}</button>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setLanguage('zh')} 
            className={`hover:text-[var(--color-neon-orange)] transition-colors ${language === 'zh' ? 'text-[var(--color-neon-orange)]' : ''}`}
          >
            {t.LANGUAGE_ZH}
          </button>
          <button 
            onClick={() => setLanguage('en')} 
            className={`hover:text-[var(--color-neon-orange)] transition-colors ${language === 'en' ? 'text-[var(--color-neon-orange)]' : ''}`}
          >
            {t.LANGUAGE_EN}
          </button>
        </div>
      </div>
    </footer>
  );
};

