import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, GraduationCap, Calendar, Tag, ChevronRight, HelpCircle, FileText, ChevronDown, ChevronUp, ArrowUpDown, ArrowUp, ArrowDown, RotateCcw, Share2, Check } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FaqDetailOverlay } from './components/FaqDetailOverlay';
import { Paper, FaqItem, I18nString, DataService } from '@heytcm/core';
import { apiClient } from '@heytcm/api';
import { APP_CONFIG } from '@heytcm/config';
import { PAGES_STRINGS, Language } from '@heytcm/i18n';

console.log("APP_CONFIG AT TOP OF APP", APP_CONFIG);

import { AboutProject } from './components/AboutProject';
import { DataSource } from './components/DataSource';
import { Contact } from './components/Contact';
import { AdminPage } from './components/AdminPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { TenantProvider, useTenant } from './context/TenantContext';

function AppContent() {
  const { config: tenantConfig } = useTenant();
  console.log(`[Tenant Runtime] Active AppID: ${tenantConfig.appId}`);

  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<'papers' | 'faq' | 'full_database' | 'about' | 'data_source' | 'contact' | 'admin' | 'privacy' | 'terms'>('papers');
  const [language, setLanguage] = useState<Language>('zh');
  const t = PAGES_STRINGS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isDuckDBReady, setIsDuckDBReady] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [sqlResult, setSqlResult] = useState<unknown[] | null>(null);
  const [fullPapers, setFullPapers] = useState<unknown[]>([]);
  const [isSearchingFull, setIsSearchingFull] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFullPapers, setTotalFullPapers] = useState(0);
  const [sortField, setSortField] = useState<string>(APP_CONFIG.DUCKDB_COLUMNS.YEAR);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  const handleInlineShare = async (e: React.MouseEvent, faq: FaqItem, faqId: string) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?faq=${faqId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'HeyTCM FAQ',
          text: getString(faq.question),
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${getString(faq.question)}\n${shareUrl}`);
        setCopiedFaqId(faqId);
        setTimeout(() => setCopiedFaqId(null), 2000);
      }
    } catch (err) {
      console.warn('Share failed:', err);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortOrder('ASC');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
    return sortOrder === 'ASC' ? <ArrowUp className="w-3 h-3 text-[var(--color-neon-orange)]" /> : <ArrowDown className="w-3 h-3 text-[var(--color-neon-orange)]" />;
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedFaqCategory(null);
    setExpandedFaq(null);
    setCurrentPage(1);
  };

  const [papers, setPapers] = useState<Paper[]>([]);
  const [categories, setCategories] = useState<(string | I18nString)[]>([]);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [faqCategories, setFaqCategories] = useState<(string | I18nString)[]>([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      // First seed the database
      await DataService.seedDemoData();
      
      setPapers(await apiClient.papers.list());
      setCategories(await apiClient.papers.getCategories());
      setFaqData(await apiClient.faq.list());
      setFaqCategories(await apiClient.faq.getCategories());
      setIsDuckDBReady(true);

      // Handle deep links
      const params = new URLSearchParams(window.location.search);
      const faqId = params.get('faq');
      if (faqId) {
        setActiveTab('faq');
        setShowLanding(false);
        setSelectedFaqId(faqId);
        
        // Remove param from URL to keep it clean
        window.history.replaceState({}, '', window.location.pathname);
      }
    };
    fetchData();
  }, []);

  // Data ready
  useEffect(() => {
    // setIsDuckDBReady moved inside fetchData to trigger after seed
  }, []);

  const getString = (val: string | { zh: string; en: string } | undefined, lang: Language = language): string => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[lang] || val.zh || val.en || '';
    }
    return '';
  };

  const getZhString = (val: string | { zh: string; en: string } | undefined): string => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val.zh || val.en || '';
    }
    return '';
  };

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const titleStr = getString(paper.title);
      const sourceStr = getString(paper.source);
      const sigStr = getString(paper.significance);
      const catZh = getZhString(paper.category);

      const matchesSearch = titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sourceStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sigStr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? catZh === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [papers, searchQuery, selectedCategory, language]);

  const filteredFaq = useMemo(() => {
    return faqData.filter(item => {
      const qStr = getString(item.question);
      const aStr = getString(item.answer);
      const catZh = getZhString(item.category);

      const matchesSearch = qStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            aStr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedFaqCategory ? catZh === selectedFaqCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchQuery, selectedFaqCategory, language]);

  const getRelatedPapers = (faq: FaqItem) => {
    const faqCatZh = getZhString(faq.category);
    // Find papers with matching category or whose title contains keywords from the question
    return papers.filter(p => {
      const pCatZh = getZhString(p.category);
      if (pCatZh === faqCatZh) return true;
      
      const qStr = getString(faq.question).toLowerCase();
      const pTitleStr = getString(p.title).toLowerCase();
      
      // Simple keyword match (at least one word > 2 chars matches)
      const keywordArr = qStr.split(/\s+/).filter(w => w.length > 1);
      return keywordArr.some(k => pTitleStr.includes(k));
    }).slice(0, 3); // Return top 3 related papers
  };

  const handleTabChange = (tab: 'papers' | 'faq' | 'full_database' | 'about' | 'data_source' | 'contact' | 'admin' | 'privacy' | 'terms', category?: string) => {
    setActiveTab(tab);
    setShowLanding(false);
    if (category) {
      if (tab === 'papers') {
        setSelectedCategory(category);
      } else if (tab === 'faq') {
        setSelectedFaqCategory(category);
        setExpandedFaq(null);
      }
    } else {
      // Reset filters if no category provided
      if (tab === 'papers') setSelectedCategory(null);
      else if (tab === 'faq') setSelectedFaqCategory(null);
    }
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setShowLanding(true);
  };

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch full papers from DuckDB when tab is active or search/page changes
  useEffect(() => {
    if (activeTab === 'full_database' && isDuckDBReady) {
      const fetchFull = async () => {
        setIsSearchingFull(true);
        try {
          const { results, total } = await apiClient.fullDatabase.search(
            searchQuery, 
            currentPage, 
            APP_CONFIG.ITEMS_PER_PAGE,
            sortField,
            sortOrder
          );
          setTotalFullPapers(total);
          setFullPapers(results);
        } catch (err) {
          console.error('DuckDB Search Error:', err);
        } finally {
          setIsSearchingFull(false);
        }
      };
      fetchFull();
    }
  }, [activeTab, searchQuery, currentPage, isDuckDBReady, sortField, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onLogoClick={handleLogoClick} 
        onTabChange={handleTabChange} 
        activeTab={activeTab} 
        showLanding={showLanding}
        language={language}
      />

      <main className="flex-1 w-full">
        {showLanding ? (
          <LandingPage onNavigate={handleTabChange} language={language} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Bar (Client Side Interaction) */}
            {['papers', 'faq', 'full_database'].includes(activeTab) && (
              <div className="mb-8 relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.APP.SEARCH_PLACEHOLDER}
                  className="w-full pl-12 pr-4 py-4 bg-[var(--color-gallery-white)] brutal-border text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)] transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}

            {activeTab === 'papers' ? (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* selected papers view */}
                <aside className="lg:w-64 flex-shrink-0 space-y-6">
                  <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Filter className="w-3 h-3" /> {t.APP.FILTER_TITLE}
                    </h2>
                    <div className="flex flex-wrap lg:flex-col gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-3 font-bold text-sm transition-all text-left flex items-center justify-between brutal-border ${
                          selectedCategory === null 
                            ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                            : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{t.APP.ALL_PAPERS}</span>
                        <span className={`text-xs px-2 py-1 brutal-border ${selectedCategory === null ? 'bg-[var(--color-gallery-white)] text-black' : 'bg-slate-100 text-slate-500'}`}>
                          {papers.length}
                        </span>
                      </button>
                      {categories.map((catObj) => {
                        const catZh = getZhString(catObj);
                        const catDisplay = getString(catObj);
                        const count = papers.filter(p => getZhString(p.category) === catZh).length;
                        return (
                          <button
                            key={catZh}
                            onClick={() => setSelectedCategory(catZh)}
                            className={`px-4 py-3 font-bold text-sm transition-all text-left flex items-center justify-between brutal-border ${
                              selectedCategory === catZh 
                                ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                                : 'bg-[var(--color-gallery-white)] text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate mr-2">{catDisplay}</span>
                            <span className={`text-xs px-2 py-1 brutal-border flex-shrink-0 ${selectedCategory === catZh ? 'bg-[var(--color-gallery-white)] text-black' : 'bg-slate-100 text-slate-500'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {(selectedCategory !== null || searchQuery !== '') && (
                      <button
                        onClick={resetAllFilters}
                        className="w-full mt-6 px-4 py-3 bg-white text-[var(--color-neon-orange)] font-bold text-xs uppercase tracking-[0.2em] brutal-border border-[var(--color-neon-orange)] hover:bg-[var(--color-neon-orange)] hover:text-white transition-all flex items-center justify-center gap-2 group"
                      >
                        <RotateCcw className="w-3 h-3 group-hover:rotate-[-120deg] transition-transform duration-500" />
                        {t.APP.RESET_FILTERS}
                      </button>
                    )}
                  </div>
                </aside>

                <section className="flex-1">
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-4xl font-display uppercase tracking-tighter">
                      {selectedCategory || t.APP.ALL_PAPERS}
                      <span className="text-sm font-bold text-slate-400 ml-4 tracking-widest">[{filteredPapers.length} {t.APP.ITEMS_SUFFIX}]</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {filteredPapers.map((paper, index) => (
                        <motion.div
                          key={paper.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                          className="group relative bg-[var(--color-gallery-white)] brutal-border p-6 hover:brutal-shadow transition-all overflow-hidden"
                        >
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                              <div className="text-[10px] font-bold text-white uppercase tracking-wider bg-[var(--color-brutal-black)] px-2 py-1">
                                {getString(paper.category)}
                              </div>
                              <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                <Calendar className="w-3 h-3" />
                                {paper.year}
                              </div>
                            </div>

                            <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-[var(--color-neon-orange)] transition-colors">
                              {getString(paper.title)}
                            </h3>

                            <div className="space-y-4 mb-6">
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <GraduationCap className="w-4 h-4" />
                                <span className="truncate">{getString(paper.source)}</span>
                              </div>
                              <div className="text-sm font-bold text-slate-600 bg-slate-50 p-4 brutal-border border-slate-200 italic leading-relaxed line-clamp-3">
                                {paper.abstract ? getString(paper.abstract) : getString(paper.significance)}
                              </div>
                            </div>

                            <div className="flex items-center justify-end">
                              <a 
                                href={`${APP_CONFIG.CNKI_BASE_URL}${encodeURIComponent(getString(paper.title))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-[var(--color-brutal-black)] flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest"
                              >
                                {t.APP.READ_MORE} <ChevronRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {filteredPapers.length === 0 && (
                    <div className="py-20 text-center">
                      <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 brutal-border">
                        <Search className="w-10 h-10 text-slate-300" />
                      </div>
                      <h3 className="text-2xl font-bold uppercase tracking-widest">{t.APP.NO_RESULTS}</h3>
                      <p className="text-slate-500 font-bold mt-2">{t.APP.TRY_DIFFERENT}</p>
                    </div>
                  )}
                </section>
              </div>
            ) : activeTab === 'faq' ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                  <h2 className="text-5xl font-display uppercase tracking-tighter mb-4">{t.APP.FAQ_TITLE}</h2>
                  <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">{t.APP.FAQ_SUBTITLE}</p>
                </div>

                {/* FAQ Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  <button
                    onClick={() => {setSelectedFaqCategory(null); setExpandedFaq(null);}}
                    className={`px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all brutal-border ${
                      selectedFaqCategory === null 
                        ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                        : 'bg-[var(--color-gallery-white)] text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {t.APP.ALL_QUESTIONS}
                  </button>
                  {faqCategories.map(catObj => {
                    const catZh = getZhString(catObj);
                    const catDisplay = getString(catObj);
                    return (
                      <button
                        key={catZh}
                        onClick={() => {setSelectedFaqCategory(catZh); setExpandedFaq(null);}}
                        className={`px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all brutal-border ${
                          selectedFaqCategory === catZh 
                            ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                            : 'bg-[var(--color-gallery-white)] text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {catDisplay}
                      </button>
                    );
                  })}
                </div>

                {(selectedFaqCategory !== null || searchQuery !== '') && (
                  <div className="flex justify-center mb-12">
                    <button
                      onClick={resetAllFilters}
                      className="px-8 py-3 bg-white text-[var(--color-neon-orange)] font-bold text-xs uppercase tracking-[0.2em] brutal-border border-[var(--color-neon-orange)] hover:bg-[var(--color-neon-orange)] hover:text-white transition-all flex items-center justify-center gap-2 group"
                    >
                      <RotateCcw className="w-3 h-3 group-hover:rotate-[-120deg] transition-transform duration-500" />
                      {t.APP.RESET_FILTERS}
                    </button>
                  </div>
                )}

                <div className="space-y-6">
                  {filteredFaq.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-[var(--color-gallery-white)] brutal-border overflow-hidden transition-all hover:brutal-shadow"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-3xl font-display text-[var(--color-neon-orange)]">Q{index + 1}</span>
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[var(--color-neon-orange)] transition-colors">
                            {getString(item.question)}
                          </h3>
                        </div>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-6 h-6 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-slate-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-8 pb-8 pt-2 border-t-2 border-slate-100">
                              <div className="mb-4">
                                <span className="text-[10px] font-bold text-white bg-[var(--color-brutal-black)] px-2 py-1 uppercase tracking-wider">
                                  {getString(item.category)}
                                </span>
                              </div>
                              <div className="text-lg font-bold text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {getString(item.answer)}
                              </div>
                              <div className="mt-6 flex justify-end gap-4">
                                <button
                                  onClick={(e) => handleInlineShare(e, item, item.id || `faq_${index + 1}`)}
                                  className="px-6 py-2 bg-white text-slate-500 brutal-border border-slate-200 text-[10px] font-bold uppercase tracking-widest hover:border-[var(--color-neon-orange)] hover:text-[var(--color-neon-orange)] transition-all flex items-center gap-2"
                                >
                                  {copiedFaqId === (item.id || `faq_${index + 1}`) ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                                  {copiedFaqId === (item.id || `faq_${index + 1}`) ? t.APP.COPIED : t.APP.SHARE}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFaqId(item.id || `faq_${index + 1}`);
                                  }}
                                  className="px-6 py-2 bg-[var(--color-brutal-black)] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[var(--color-neon-orange)] transition-all flex items-center gap-2 brutal-shadow-small"
                                >
                                  {t.APP.VIEW_DETAILS} <ChevronRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'full_database' ? (
              <div className="w-full overflow-hidden">
                <div className="mb-12 text-center">
                  <h2 className="text-5xl font-display uppercase tracking-tighter mb-4">{t.APP.FULL_DB_TITLE}</h2>
                  <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">{t.APP.FULL_DB_SUBTITLE}</p>
                </div>

                {isSearchingFull ? (
                  <div className="py-20 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[var(--color-neon-orange)] border-t-transparent"></div>
                    <p className="mt-4 font-mono text-sm text-slate-400 uppercase tracking-widest">{t.APP.QUERYING}</p>
                  </div>
                ) : (
                  <div className="brutal-border bg-[var(--color-gallery-white)] overflow-x-auto relative">
                    <table className="w-full text-left border-collapse border-b border-black">
                      <thead>
                        <tr className="bg-[var(--color-brutal-black)] text-white font-mono text-[10px] uppercase tracking-[0.2em]">
                          <th className="px-6 py-4 border-r border-white/10 w-16">ID</th>
                          <th 
                            className="px-6 py-4 border-r border-white/10 w-24 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => handleSort(APP_CONFIG.DUCKDB_COLUMNS.YEAR)}
                          >
                            <div className="flex items-center gap-1">
                              {t.APP.TABLE_HEADERS.YEAR}
                              <SortIcon field={APP_CONFIG.DUCKDB_COLUMNS.YEAR} />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-4 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => handleSort(APP_CONFIG.DUCKDB_COLUMNS.TITLE)}
                          >
                            <div className="flex items-center gap-1">
                              {t.APP.TABLE_HEADERS.TITLE}
                              <SortIcon field={APP_CONFIG.DUCKDB_COLUMNS.TITLE} />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-4 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => handleSort(APP_CONFIG.DUCKDB_COLUMNS.AUTHOR)}
                          >
                            <div className="flex items-center gap-1">
                              {t.APP.TABLE_HEADERS.AUTHOR}
                              <SortIcon field={APP_CONFIG.DUCKDB_COLUMNS.AUTHOR} />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-4 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => handleSort(APP_CONFIG.DUCKDB_COLUMNS.INSTITUTION)}
                          >
                            <div className="flex items-center gap-1">
                              {t.APP.TABLE_HEADERS.INSTITUTION}
                              <SortIcon field={APP_CONFIG.DUCKDB_COLUMNS.INSTITUTION} />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-4 cursor-pointer hover:bg-white/10 transition-colors"
                            onClick={() => handleSort(APP_CONFIG.DUCKDB_COLUMNS.DATABASE)}
                          >
                            <div className="flex items-center gap-1">
                              {t.APP.TABLE_HEADERS.DATABASE}
                              <SortIcon field={APP_CONFIG.DUCKDB_COLUMNS.DATABASE} />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fullPapers.map((paper: any, idx) => (
                          <tr key={idx} className="border-b border-black/10 hover:bg-[var(--color-brutal-black)] hover:text-white transition-all group cursor-crosshair">
                            <td className="px-6 py-4 border-r border-black/10 font-mono text-xs opacity-40 group-hover:opacity-100">{(currentPage - 1) * APP_CONFIG.ITEMS_PER_PAGE + idx + 1}</td>
                            <td className="px-6 py-4 border-r border-black/10 font-mono text-xs italic">{paper[APP_CONFIG.DUCKDB_COLUMNS.YEAR]}</td>
                            <td className="px-6 py-4 border-r border-black/10 font-bold tracking-tight">
                              <div className="flex flex-col gap-1">
                                <span className="text-base">{paper[APP_CONFIG.DUCKDB_COLUMNS.TITLE]}</span>
                                {paper[APP_CONFIG.DUCKDB_COLUMNS.ABSTRACT] ? (
                                  <span className="text-xs font-normal text-slate-500 line-clamp-2 italic">
                                    {paper[APP_CONFIG.DUCKDB_COLUMNS.ABSTRACT].split(/[。！？]/)[0]}...
                                  </span>
                                ) : (
                                  <span className="text-xs font-normal text-slate-400 italic opacity-50">
                                    [{t.APP.NO_ABSTRACT}]
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 border-r border-black/10 text-sm italic">{paper[APP_CONFIG.DUCKDB_COLUMNS.AUTHOR]}</td>
                            <td className="px-6 py-4 border-r border-black/10 text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">{paper[APP_CONFIG.DUCKDB_COLUMNS.INSTITUTION]}</td>
                            <td className="px-6 py-4 font-mono text-[10px] opacity-40 group-hover:opacity-100">{paper[APP_CONFIG.DUCKDB_COLUMNS.DATABASE] || 'CNKI'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {fullPapers.length === 0 && (
                      <div className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
                        {t.APP.NO_DB_RESULTS}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Pagination Controls */}
                {!isSearchingFull && totalFullPapers > 0 && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                      {t.APP.TOTAL_RECORDS.replace('{total}', totalFullPapers.toString())}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`px-6 py-3 brutal-border font-bold text-xs uppercase tracking-widest transition-all ${
                          currentPage === 1 
                            ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                            : 'bg-[var(--color-gallery-white)] text-black hover:bg-black hover:text-white hover:brutal-shadow'
                        }`}
                      >
                        {t.APP.PREV_PAGE}
                      </button>
                      
                      <div className="px-4 py-3 brutal-border bg-black text-white font-mono text-xs font-bold tracking-widest">
                        {t.APP.PAGE_INFO
                          .replace('{current}', currentPage.toString())
                          .replace('{total}', Math.ceil(totalFullPapers / APP_CONFIG.ITEMS_PER_PAGE).toString())
                        }
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalFullPapers / APP_CONFIG.ITEMS_PER_PAGE), prev + 1))}
                        disabled={currentPage >= Math.ceil(totalFullPapers / APP_CONFIG.ITEMS_PER_PAGE)}
                        className={`px-6 py-3 brutal-border font-bold text-xs uppercase tracking-widest transition-all ${
                          currentPage >= Math.ceil(totalFullPapers / APP_CONFIG.ITEMS_PER_PAGE)
                            ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' 
                            : 'bg-[var(--color-gallery-white)] text-black hover:bg-black hover:text-white hover:brutal-shadow'
                        }`}
                      >
                        {t.APP.NEXT_PAGE}
                      </button>
                    </div>
                    
                  </div>
                )}
              </div>
            ) : activeTab === 'about' ? (
              <AboutProject language={language} />
            ) : activeTab === 'data_source' ? (
              <DataSource language={language} />
            ) : activeTab === 'contact' ? (
              <Contact language={language} />
            ) : activeTab === 'admin' ? (
              <AdminPage language={language} />
            ) : activeTab === 'privacy' ? (
              <PrivacyPolicy language={language} />
            ) : activeTab === 'terms' ? (
              <TermsOfUse language={language} />
            ) : null}

          </div>
        )}
      </main>

      <Footer onNavigate={(tab) => handleTabChange(tab)} language={language} setLanguage={setLanguage} />

      <AnimatePresence>
        {selectedFaqId && (
          (() => {
            const selectedFaq = faqData.find(f => f.id === selectedFaqId);
            if (!selectedFaq) return null;
            return (
              <FaqDetailOverlay
                faq={selectedFaq}
                relatedPapers={getRelatedPapers(selectedFaq)}
                language={language}
                onClose={() => setSelectedFaqId(null)}
              />
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <TenantProvider>
      <AppContent />
    </TenantProvider>
  );
}
