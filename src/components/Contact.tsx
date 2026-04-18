import React from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare } from 'lucide-react';
import { PAGES_STRINGS, Language } from '@heytcm/i18n';

export const Contact: React.FC<{ language: Language }> = ({ language }) => {
  const t = PAGES_STRINGS[language].CONTACT;
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-gallery-white)] p-8 md:p-12 brutal-border"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[var(--color-brutal-black)] p-3 brutal-shadow">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-display uppercase tracking-tight">{t.TITLE}</h2>
        </div>
        
        <div className="space-y-8 text-lg text-slate-700 leading-relaxed">
          <p>
            {t.INTRO}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 border-2 border-slate-200 hover:border-[var(--color-brutal-black)] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-[var(--color-neon-orange)]" />
                <h3 className="text-xl font-bold">{t.EMAIL_LABEL}</h3>
              </div>
              <p className="font-mono text-sm">{t.EMAIL_ADDRESS}</p>
              <p className="text-sm text-slate-500 mt-2">{t.EMAIL_DESC}</p>
            </div>

            <div className="p-6 border-2 border-slate-200 hover:border-[var(--color-brutal-black)] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-[var(--color-neon-orange)]" />
                <h3 className="text-xl font-bold">{t.COMMUNITY_LABEL}</h3>
              </div>
              <p className="font-mono text-sm">{t.COMMUNITY_DESC}</p>
              <p className="text-sm text-slate-500 mt-2">{t.COMMUNITY_SUB}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
