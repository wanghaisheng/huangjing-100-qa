import React from 'react';
import { PAGES_STRINGS, Language } from '@heytcm/i18n';

export const PrivacyPolicy: React.FC<{ language: Language }> = ({ language }) => {
  const t = PAGES_STRINGS[language].PRIVACY;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-12 border-b-4 border-[var(--color-brutal-black)] pb-4">
        {t.TITLE}
      </h1>
      <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-widest prose-a:text-[var(--color-neon-orange)] whitespace-pre-wrap">
        {t.CONTENT}
      </div>
    </div>
  );
};
