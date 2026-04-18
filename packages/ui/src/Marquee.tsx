import React from 'react';
import { motion } from 'motion/react';

export const Marquee = ({ items, duration, reverse = false }: { items: string[], duration: number, reverse?: boolean }) => (
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
