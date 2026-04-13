import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrutalScience, BrutalData, BrutalShield, BrutalHistory, BrutalProcess, BrutalMetabolism, BrutalPlant, BrutalBottle } from './BrutalArt';
import { STRINGS, APP_CONFIG, HERBS_LIST } from '../constants/config';
import { DataService } from '../services/dataService';
import { BookOpen, GraduationCap, Calendar, RefreshCw } from 'lucide-react';

const HerbGrid = () => (
  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-px bg-[var(--color-brutal-black)] border-2 border-[var(--color-brutal-black)]">
    {HERBS_LIST.map((herb, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: (i % 10) * 0.05 + Math.floor(i / 10) * 0.02 }}
        whileHover={{ zIndex: 10, scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
        className="aspect-square bg-[var(--color-gallery-white)] flex flex-col items-center justify-center p-2 text-center text-[var(--color-brutal-black)] hover:bg-[var(--color-neon-orange)] hover:text-white transition-colors cursor-pointer group relative"
      >
        <span className="text-[10px] font-mono font-bold opacity-30 mb-1 group-hover:opacity-100">{String(i + 1).padStart(3, '0')}</span>
        <span className="text-sm sm:text-base font-display font-bold leading-none break-all px-1">
          {herb}
        </span>
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/10 group-hover:border-white/40" />
      </motion.div>
    ))}
    {/* Fillers to make it look like a complete wall */}
    {Array.from({ length: 10 - (HERBS_LIST.length % 10) }).map((_, i) => (
      <div key={`filler-${i}`} className="aspect-square bg-white/5 hidden lg:block" />
    ))}
  </div>
);

interface LandingPageProps {
  onNavigate: (tab: 'papers' | 'faq', category?: string) => void;
}

const BrutalCard = ({ title, description, children, className = "", index = 0 }: { title: string, description: string, children: React.ReactNode, className?: string, index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`p-8 bg-[var(--color-gallery-white)] brutal-border brutal-shadow hover:brutal-shadow-orange transition-all duration-300 ${className}`}
  >
    <div className="mb-6 w-16 h-16">{children}</div>
    <h3 className="text-3xl font-display uppercase tracking-tighter mb-3">{title}</h3>
    <p className="text-lg font-bold leading-relaxed">{description}</p>
  </motion.div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isShaking, setIsShaking] = React.useState(false);
  const [randomPaper, setRandomPaper] = React.useState<any | null>(null);

  const handleShake = () => {
    setIsShaking(true);
    setRandomPaper(null);
    
    // Simulate shaking duration
    setTimeout(() => {
      const papers = DataService.getPapers();
      const randomIndex = Math.floor(Math.random() * papers.length);
      setRandomPaper(papers[randomIndex]);
      setIsShaking(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-brutal-black)]">
      {/* Hero Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rotate-12"><BrutalPlant /></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 -rotate-12"><BrutalScience /></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border-[100px] border-black/5 rounded-full" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto relative z-10 text-left md:pl-12"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-[var(--color-brutal-black)]"></span>
            <span className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--color-neon-orange)]">
              {STRINGS.HERO.TAG}
            </span>
          </div>
          
          <h1 className="text-[12vw] md:text-[10vw] font-display font-bold mb-10 leading-[0.85] tracking-tighter uppercase">
            {STRINGS.HERO.TITLE_1}<br />
            <span className="ml-[10vw] text-[var(--color-neon-orange)]">{STRINGS.HERO.TITLE_2}</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-start gap-12 mt-16">
            <p className="text-2xl font-bold max-w-xl leading-tight">
              {STRINGS.HERO.DESC}
            </p>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button 
                onClick={() => onNavigate('papers')}
                className="px-12 py-6 bg-[var(--color-brutal-black)] text-white font-bold text-xl hover:bg-[var(--color-neon-orange)] transition-all brutal-shadow-orange active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {STRINGS.HERO.CTA_PAPERS}
              </button>
              <button 
                onClick={() => onNavigate('faq')}
                className="px-12 py-6 bg-[var(--color-gallery-white)] brutal-border font-bold text-xl hover:bg-[var(--color-neon-orange)] hover:text-white transition-all brutal-shadow active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {STRINGS.HERO.CTA_FAQ}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Methodology - HOW */}
      <section className="py-32 px-6 border-y-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase bg-black text-white px-3 py-1">{STRINGS.METHODOLOGY.SECTION_ID}</h2>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div onClick={() => onNavigate('papers', '药理作用与机制')} className="md:col-span-2 cursor-pointer">
              <BrutalCard 
                index={0}
                title={STRINGS.METHODOLOGY.CARDS[0].title} 
                description={STRINGS.METHODOLOGY.CARDS[0].desc}
              >
                <BrutalScience />
              </BrutalCard>
            </div>
            <div onClick={() => onNavigate('papers', '炮制工艺研究')} className="md:col-span-1 cursor-pointer">
              <BrutalCard 
                index={1}
                title={STRINGS.METHODOLOGY.CARDS[1].title} 
                description={STRINGS.METHODOLOGY.CARDS[1].desc}
              >
                <BrutalData />
              </BrutalCard>
            </div>
            <div onClick={() => onNavigate('papers', '质量评价与资源')} className="md:col-span-3 cursor-pointer">
              <BrutalCard 
                index={2}
                title={STRINGS.METHODOLOGY.CARDS[2].title} 
                description={STRINGS.METHODOLOGY.CARDS[2].desc}
              >
                <BrutalShield />
              </BrutalCard>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Overview */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase bg-black text-white px-3 py-1">{STRINGS.FAQ_OVERVIEW.SECTION_ID}</h2>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <BrutalHistory />, title: "品种、历史", cat: "品种、历史与感官基础" },
              { icon: <BrutalProcess />, title: "炮制工艺", cat: "炮制工艺与化学成分转化" },
              { icon: <BrutalMetabolism />, title: "肠道健康", cat: "肠道健康与微环境调节" },
              { icon: <BrutalMetabolism />, title: "代谢保护", cat: "肝脏保护、降糖与代谢" },
              { icon: <BrutalScience />, title: "脑健康", cat: "脑健康、神经保护与综合应用" },
              { icon: <BrutalShield />, title: "安全性", cat: "安全性与质量控制" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                onClick={() => onNavigate('faq', item.cat)}
                className="p-10 bg-[var(--color-gallery-white)] brutal-border hover:bg-[var(--color-neon-orange)] hover:text-white transition-all duration-300 flex flex-col items-center text-center gap-8 brutal-shadow hover:brutal-shadow-orange cursor-pointer"
              >
                <div className="w-20 h-20 flex-shrink-0">{item.icon}</div>
                <span className="font-display text-4xl tracking-tight uppercase">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Concerns Section */}
      <section className="py-32 px-6 bg-[var(--color-neon-orange)] text-white relative overflow-hidden border-y-2 border-black">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] border-[40px] border-white rounded-full" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase bg-[var(--color-gallery-white)] text-[var(--color-neon-orange)] inline-block px-3 py-1 mb-6">
              {STRINGS.CONCERNS.SECTION_ID}
            </h2>
            <h3 className="text-6xl md:text-7xl font-display uppercase tracking-tighter leading-none mb-8">
              回应你的<br />核心疑虑
            </h3>
            <p className="text-xl font-bold opacity-90 max-w-2xl">
              {STRINGS.CONCERNS.SUBTITLE}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {STRINGS.CONCERNS.CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--color-gallery-white)] text-[var(--color-brutal-black)] p-10 brutal-border brutal-shadow group hover:translate-x-2 hover:-translate-y-2 transition-transform"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-xs font-mono font-bold tracking-widest px-2 py-1 bg-black text-white uppercase">
                    {card.tag}
                  </span>
                  <span className="text-4xl font-display text-[var(--color-neon-orange)]">
                    {card.stat}
                  </span>
                </div>
                <h4 className="text-3xl font-display uppercase mb-4 tracking-tighter group-hover:text-[var(--color-neon-orange)] transition-colors">
                  {card.title}
                </h4>
                <p className="text-lg font-bold leading-relaxed opacity-70 mb-8">
                  {card.desc}
                </p>
                <button 
                  onClick={() => {
                    if (i === 0) onNavigate('papers', '质量评价与资源');
                    else if (i === 1) onNavigate('faq', '肠道健康与微环境调节');
                    else if (i === 2) onNavigate('faq', '炮制工艺与化学成分转化');
                    else onNavigate('faq', '脑健康、神经保护与综合应用');
                  }}
                  className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all text-[var(--color-neon-orange)]"
                >
                  查看科学证据 →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Pricing Section */}
      <section className="py-32 px-6 bg-[var(--color-gallery-white)] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase bg-black text-white px-3 py-1">{STRINGS.COMMUNITY.SECTION_ID}</h2>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Single & Bundles */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {/* Single Item */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 brutal-border bg-[var(--color-gallery-white)] flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest rotate-90 origin-top-right translate-y-4">
                  Ownership
                </div>
                <div>
                  <h4 className="text-2xl font-display uppercase mb-2">{STRINGS.COMMUNITY.SINGLE_DESC}</h4>
                  <p className="text-slate-500 font-bold mb-8">{STRINGS.COMMUNITY.SINGLE_SUB}</p>
                </div>
                <div className="text-5xl font-display text-[var(--color-neon-orange)]">
                  {STRINGS.COMMUNITY.SINGLE_PRICE.split(' / ')[0]}
                  {STRINGS.COMMUNITY.SINGLE_PRICE.includes(' / ') && (
                    <span className="text-2xl text-slate-400 ml-2">/ {STRINGS.COMMUNITY.SINGLE_PRICE.split(' / ')[1]}</span>
                  )}
                </div>
              </motion.div>

              {/* Bundles */}
              <div className="grid grid-cols-1 gap-4">
                {STRINGS.COMMUNITY.BUNDLES.map((bundle, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-4 brutal-border bg-[var(--color-gallery-white)] flex items-center justify-between group cursor-pointer relative"
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[var(--color-neon-orange)] mb-0.5">{bundle.saving}</div>
                      <div className="text-xl font-display uppercase">{bundle.count}打包</div>
                      <div className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-widest">{bundle.type}</div>
                    </div>
                    <div className="text-2xl font-display group-hover:text-[var(--color-neon-orange)] transition-colors">{bundle.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Membership (The Big Deal) */}
            <motion.div 
              initial={{ rotate: 1 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="p-10 bg-[var(--color-brutal-black)] text-white brutal-border brutal-shadow-orange relative overflow-hidden flex flex-col"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-neon-orange)] rotate-45 flex items-end justify-center pb-2">
                <span className="text-xs font-bold uppercase tracking-tighter -rotate-45">Best Value</span>
              </div>
              
              <div className="mb-2">
                <span className="text-[10px] font-mono font-bold text-[var(--color-neon-orange)] uppercase tracking-[0.3em]">
                  {STRINGS.COMMUNITY.MEMBERSHIP.TAG}
                </span>
              </div>
              <h4 className="text-4xl font-display uppercase mb-4 leading-none">加入社群<br />获取全集</h4>
              <p className="text-slate-400 font-bold mb-8 text-sm leading-relaxed">
                {STRINGS.COMMUNITY.SUBTITLE}
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-display text-[var(--color-neon-orange)]">{STRINGS.COMMUNITY.MEMBERSHIP.PRICE}</span>
                  <span className="text-xl font-bold opacity-50">{STRINGS.COMMUNITY.MEMBERSHIP.UNIT}</span>
                </div>
                <div className="mt-2 text-sm font-mono font-bold text-[var(--color-neon-orange)] uppercase tracking-widest">
                  {STRINGS.COMMUNITY.MEMBERSHIP.BENEFIT}
                </div>
              </div>

              <div className="mt-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
                    <span className="opacity-50">当前席位进度</span>
                    <span className="text-[var(--color-neon-orange)]">{STRINGS.COMMUNITY.MEMBERSHIP.PROGRESS}/100</span>
                  </div>
                  <div className="h-2 bg-white/10 brutal-border border-white/20 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${STRINGS.COMMUNITY.MEMBERSHIP.PROGRESS}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-[var(--color-neon-orange)]"
                    />
                  </div>
                </div>

                <div className="p-4 border border-white/20 bg-white/5 font-mono text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="opacity-50">涨价规则:</span>
                    <span className="text-[var(--color-neon-orange)]">{STRINGS.COMMUNITY.MEMBERSHIP.RULE}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">当前状态:</span>
                    <span className="animate-pulse text-[var(--color-neon-orange)]">● {STRINGS.COMMUNITY.MEMBERSHIP.CURRENT_STATUS}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-[var(--color-neon-orange)] text-white font-display text-xl uppercase tracking-widest hover:bg-[var(--color-gallery-white)] hover:text-black transition-all brutal-border border-white">
                  立即加入社群
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shake the Bottle Section */}
      <section className="py-32 px-6 bg-[var(--color-gallery-white)] border-b-2 border-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-sm font-mono font-bold tracking-widest uppercase bg-black text-white px-3 py-1">{STRINGS.SHAKE.SECTION_ID}</h2>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col items-center justify-center">
              <motion.div
                animate={isShaking ? {
                  rotate: [0, -10, 10, -10, 10, 0],
                  x: [0, -5, 5, -5, 5, 0],
                  y: [0, -2, 2, -2, 2, 0]
                } : {}}
                transition={{ duration: 0.5, repeat: isShaking ? Infinity : 0 }}
                onClick={handleShake}
                className="w-64 h-80 cursor-pointer relative group"
              >
                <div className="absolute inset-0 bg-[var(--color-neon-orange)] opacity-0 group-hover:opacity-5 blur-2xl transition-opacity" />
                <div className="text-[var(--color-brutal-black)] group-hover:text-[var(--color-neon-orange)] transition-colors">
                  <BrutalBottle />
                </div>
                
                {!randomPaper && !isShaking && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                    <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] opacity-40">{STRINGS.SHAKE.CLICK_PROMPT}</span>
                  </div>
                )}
              </motion.div>
              
              <button
                onClick={handleShake}
                disabled={isShaking}
                className="mt-12 px-8 py-4 bg-black text-white font-bold uppercase tracking-widest brutal-shadow hover:bg-[var(--color-neon-orange)] transition-all flex items-center gap-3 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isShaking ? 'animate-spin' : ''}`} />
                {STRINGS.SHAKE.CTA}
              </button>
            </div>

            <div className="min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {randomPaper ? (
                  <motion.div
                    key={randomPaper.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    className="w-full bg-[var(--color-gallery-white)] brutal-border p-8 brutal-shadow-orange relative"
                  >
                    <div className="absolute -top-4 -left-4 bg-[var(--color-neon-orange)] text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-widest brutal-border border-white">
                      {STRINGS.SHAKE.LUCKY_PICK}
                    </div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono font-bold px-2 py-1 bg-black text-white uppercase tracking-widest">
                        {randomPaper.category}
                      </span>
                      <span className="text-sm font-bold text-slate-400">
                        {randomPaper.year}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-6 leading-tight text-[var(--color-brutal-black)]">
                      {randomPaper.title}
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <GraduationCap className="w-4 h-4" />
                        <span className="truncate">{randomPaper.source}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-600 bg-slate-50 p-6 brutal-border border-slate-200 italic leading-relaxed">
                        “{randomPaper.significance}”
                      </div>
                    </div>
                    
                    <a 
                      href={`${APP_CONFIG.CNKI_BASE_URL}${encodeURIComponent(randomPaper.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 border-2 border-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      {STRINGS.SHAKE.READ_MORE} <BookOpen className="w-4 h-4" />
                    </a>
                  </motion.div>
                ) : isShaking ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-4">🧪</div>
                    <p className="font-mono text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                      {STRINGS.SHAKE.LOADING}
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center p-12 brutal-border border-dashed border-slate-300">
                    <p className="text-slate-400 font-bold uppercase tracking-widest leading-relaxed whitespace-pre-line">
                      {STRINGS.SHAKE.DESC}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Series Section - Standalone */}
      <section className="py-32 bg-[var(--color-brutal-black)] text-white overflow-hidden relative">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-neon-orange)]/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block font-mono text-[var(--color-neon-orange)] mb-6 tracking-[0.5em] uppercase">{STRINGS.FOOTER.SERIES_COLLECTION}</div>
              <h2 className="text-8xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-10 leading-[0.8]">
                {APP_CONFIG.SERIES_NAME}
              </h2>
              <p className="text-2xl font-bold opacity-60 max-w-xl leading-relaxed italic">
                {STRINGS.FOOTER.DESC}
              </p>
            </motion.div>
            <div className="hidden md:block relative">
              <motion.div 
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full aspect-square brutal-border border-white/30 p-16 flex items-center justify-center bg-white/5 backdrop-blur-sm"
              >
                <div className="text-center">
                  <span className="text-[18vw] font-display leading-none text-[var(--color-neon-orange)] drop-shadow-[10px_10px_0px_rgba(0,0,0,1)]">110+</span>
                  <p className="text-3xl font-mono font-bold uppercase tracking-[0.2em] mt-6 opacity-40">{STRINGS.FOOTER.CHAPTERS}</p>
                </div>
              </motion.div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -left-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-[var(--color-neon-orange)] animate-pulse"></div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.4em] opacity-60">{STRINGS.FOOTER.DB_INDEX_FULL}</h3>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-12"></div>
            <span className="font-mono text-xs opacity-40">v1.0.42</span>
          </div>
          <HerbGrid />
        </div>
      </section>
    </div>
  );
};
