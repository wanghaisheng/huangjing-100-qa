import React from 'react';

export const BrutalPlant = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <rect x="45" y="20" width="10" height="60" />
    <rect x="20" y="40" width="30" height="10" />
    <rect x="50" y="55" width="30" height="10" />
    <circle cx="25" cy="35" r="8" />
    <circle cx="75" cy="50" r="8" />
    <rect x="40" y="75" width="20" height="5" />
  </svg>
);

export const BrutalScience = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="30" y="35" width="40" height="4" />
    <rect x="30" y="45" width="40" height="4" />
    <rect x="30" y="55" width="25" height="4" />
    <circle cx="70" cy="70" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
    <line x1="80" y1="80" x2="90" y2="90" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
  </svg>
);

export const BrutalData = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <rect x="10" y="70" width="20" height="20" />
    <rect x="40" y="40" width="20" height="50" />
    <rect x="70" y="10" width="20" height="80" />
    <line x1="0" y1="95" x2="100" y2="95" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const BrutalShield = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <path d="M20 20 L80 20 L80 50 C80 70 50 90 50 90 C50 90 20 70 20 50 Z" fill="none" stroke="currentColor" strokeWidth="6" />
    <path d="M35 50 L45 60 L65 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" />
  </svg>
);

export const BrutalHistory = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <rect x="20" y="10" width="60" height="10" />
    <rect x="20" y="80" width="60" height="10" />
    <path d="M30 20 L70 20 L50 50 L70 80 L30 80 L50 50 Z" />
  </svg>
);

export const BrutalProcess = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10 5" />
    <rect x="40" y="40" width="20" height="20" transform="rotate(45 50 50)" />
    <path d="M50 10 L50 30 M90 50 L70 50 M50 90 L50 70 M10 50 L30 50" stroke="currentColor" strokeWidth="4" />
  </svg>
);

export const BrutalMetabolism = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    <path d="M10 50 L30 50 L40 20 L60 80 L70 50 L90 50" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
    <rect x="45" y="10" width="10" height="10" />
    <rect x="45" y="80" width="10" height="10" />
  </svg>
);

export const BrutalBottle = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
    {/* Bottle Body */}
    <path d="M35 30 L65 30 L75 45 L75 85 L25 85 L25 45 Z" fill="none" stroke="currentColor" strokeWidth="4" />
    {/* Bottle Neck */}
    <rect x="42" y="15" width="16" height="15" fill="none" stroke="currentColor" strokeWidth="4" />
    {/* Bottle Cap */}
    <rect x="40" y="10" width="20" height="5" />
    {/* Liquid inside */}
    <rect x="30" y="60" width="40" height="20" opacity="0.2" />
    {/* Bubbles */}
    <circle cx="40" cy="50" r="3" />
    <circle cx="60" cy="65" r="2" />
    <circle cx="50" cy="75" r="4" />
  </svg>
);
