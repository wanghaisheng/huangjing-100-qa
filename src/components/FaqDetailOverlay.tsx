import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, Calendar, ChevronRight, BookOpen, Share2, Check } from 'lucide-react';
import { FaqItem, Paper } from '@heytcm/core';
import { PAGES_STRINGS, Language } from '@heytcm/i18n';

interface FaqDetailOverlayProps {
  faq: FaqItem;
  relatedPapers: Paper[];
  language: Language;
  onClose: () => void;
}

export const FaqDetailOverlay: React.FC<FaqDetailOverlayProps> = ({ faq, relatedPapers, language, onClose }) => {
  const t = PAGES_STRINGS[language];
  const [copied, setCopied] = useState(false);
  
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?faq=${faq.id || ''}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'HeyTCM FAQ',
          text: getString(faq.question),
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${getString(faq.question)}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Share failed:', err);
    }
  };

  const getString = (val: string | { zh: string; en: string } | undefined): string => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[language] || val.zh || val.en || '';
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white brutal-border w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 transition-colors z-10 brutal-border bg-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 sm:p-12">
          <div className="mb-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-bold text-white bg-[var(--color-brutal-black)] px-3 py-1 uppercase tracking-widest">
                {getString(faq.category)}
              </span>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 brutal-border bg-[var(--color-gallery-white)] hover:bg-[var(--color-neon-orange)] hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? t.APP.COPIED : t.APP.SHARE}
              </button>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-tighter leading-tight pr-12">
              {getString(faq.question)}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="text-lg font-bold text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-8 brutal-border">
              {getString(faq.answer)}
            </div>
          </div>

          {relatedPapers.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[var(--color-neon-orange)]" />
                {t.APP.RELATED_PAPERS}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPapers.map((paper) => (
                  <div key={paper.id} className="p-6 bg-[var(--color-gallery-white)] brutal-border hover:brutal-shadow transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {getString(paper.category)}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {paper.year}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm leading-snug mb-3 group-hover:text-[var(--color-neon-orange)] transition-colors line-clamp-2">
                      {getString(paper.title)}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-3">
                      <GraduationCap className="w-3 h-3" />
                      <span className="truncate">{getString(paper.source)}</span>
                    </div>
                    <div className="text-xs text-slate-500 italic line-clamp-2 mb-4">
                      {paper.abstract ? getString(paper.abstract) : getString(paper.significance)}
                    </div>
                    <div className="flex justify-end">
                      <button className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                        {t.APP.READ_MORE} <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
