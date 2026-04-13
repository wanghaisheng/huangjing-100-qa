import React from 'react';
import { motion } from 'motion/react';
import { APP_CONFIG, STRINGS, HERBS_LIST } from '../constants/config';

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

export const Footer: React.FC = () => (
  <footer className="bg-[var(--color-brutal-black)] text-white py-12 overflow-hidden">
    <Marquee items={HERBS_LIST} duration={60} />
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest opacity-40 mt-12">
      <span>{APP_CONFIG.COPYRIGHT}</span>
      <div className="flex gap-12">
        {STRINGS.FOOTER.LINKS.map((link, i) => (
          <a key={i} href={link.href} className="hover:text-[var(--color-neon-orange)] transition-colors">{link.label}</a>
        ))}
      </div>
    </div>
  </footer>
);
