import React from 'react';
import { motion } from 'motion/react';
import { Database } from 'lucide-react';
import { Language } from '../i18n/config';
import { PAGES_STRINGS } from '../i18n/pages';

export const DataSource: React.FC<{ language: Language }> = ({ language }) => {
  const t = PAGES_STRINGS[language].DATA_SOURCE;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-gallery-white)] p-8 md:p-12 brutal-border"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[var(--color-brutal-black)] p-3 brutal-shadow">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-display uppercase tracking-tight">{t.TITLE}</h2>
        </div>
        
        <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
          <p>
            {t.INTRO}
          </p>
          <h3 className="text-2xl font-bold text-[var(--color-brutal-black)] mt-8 mb-4">{t.SOURCES_TITLE}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {t.SOURCES.map((source, i) => (
              <li key={i}><strong>{source.name}:</strong> {source.desc}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold text-[var(--color-brutal-black)] mt-8 mb-4">{t.PROCESSING_TITLE}</h3>
          <p>
            {t.PROCESSING_DESC}
          </p>
          <p className="text-sm text-slate-500 italic mt-8">
            {t.DISCLAIMER}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
