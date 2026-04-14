import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, GraduationCap, Calendar, Tag, ChevronRight, HelpCircle, FileText, ChevronDown, ChevronUp, Database } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DataService } from './services/dataService';
import { DuckDBService } from './services/duckdbService';
import { FULL_PAPERS_CSV } from './data/full_papers_csv';
import { APP_CONFIG } from './constants/config';
import { PAGES_STRINGS } from './i18n/pages';

import { AboutProject } from './components/AboutProject';
import { DataSource } from './components/DataSource';
import { Contact } from './components/Contact';
import { AdminPage } from './components/AdminPage';
import { Language } from './i18n/config';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<'papers' | 'faq' | 'full_database' | 'about' | 'data_source' | 'contact' | 'admin'>('papers');
  const [language, setLanguage] = useState<Language>('zh');
  const t = PAGES_STRINGS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isDuckDBReady, setIsDuckDBReady] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [sqlResult, setSqlResult] = useState<any[] | null>(null);
  const [fullPapers, setFullPapers] = useState<any[]>([]);
  const [isSearchingFull, setIsSearchingFull] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFullPapers, setTotalFullPapers] = useState(0);

  // Data fetching via Service (Simulation of Astro data flow)
  const papers = useMemo(() => DataService.getPapers(), []);
  const categories = useMemo(() => DataService.getCategories(), []);
  const faqData = useMemo(() => DataService.getFaqData(), []);
  const faqCategories = useMemo(() => DataService.getFaqCategories(), []);

  // Initialize DuckDB
  useEffect(() => {
    const initDB = async () => {
      try {
        await DuckDBService.init();
        await DuckDBService.loadData('papers', papers);
        await DuckDBService.loadData('faq', faqData);
        // Load the full literature list from the imported CSV string
        await DuckDBService.loadCSVText('full_papers', FULL_PAPERS_CSV);
        setIsDuckDBReady(true);
      } catch (err) {
        console.error('DuckDB Init Error:', err);
      }
    };
    initDB();
  }, [papers, faqData]);

  const getString = (val: any) => {
    if (typeof val === 'string') return val;
    if (val && typeof val === 'object') {
      return val[language] || val.zh || val.en || '';
    }
    return '';
  };

  const filteredPapers = useMemo(() => {
    return papers.filter(paper => {
      const titleStr = getString(paper.title);
      const sourceStr = getString(paper.source);
      const sigStr = getString(paper.significance);
      const catStr = getString(paper.category);

      const matchesSearch = titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sourceStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            sigStr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? catStr === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [papers, searchQuery, selectedCategory, language]);

  const filteredFaq = useMemo(() => {
    return faqData.filter(item => {
      const qStr = getString(item.question);
      const aStr = getString(item.answer);
      const catStr = getString(item.category);

      const matchesSearch = qStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            aStr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedFaqCategory ? catStr === selectedFaqCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [faqData, searchQuery, selectedFaqCategory, language]);

  const handleTabChange = (tab: 'papers' | 'faq' | 'full_database' | 'about' | 'data_source' | 'contact', category?: string) => {
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
          let whereClause = '';
          if (searchQuery) {
            whereClause = ` WHERE "${APP_CONFIG.DUCKDB_COLUMNS.TITLE}" LIKE '%${searchQuery}%' OR "${APP_CONFIG.DUCKDB_COLUMNS.AUTHOR}" LIKE '%${searchQuery}%' OR "${APP_CONFIG.DUCKDB_COLUMNS.INSTITUTION}" LIKE '%${searchQuery}%'`;
          }

          // Fetch total count
          const countQuery = `SELECT COUNT(*) as count FROM full_papers${whereClause}`;
          const countResult = await DuckDBService.query(countQuery);
          const total = Number(countResult[0]?.count || 0);
          setTotalFullPapers(total);

          // Fetch paginated results
          const offset = (currentPage - 1) * APP_CONFIG.ITEMS_PER_PAGE;
          const query = `SELECT * FROM full_papers${whereClause} LIMIT ${APP_CONFIG.ITEMS_PER_PAGE} OFFSET ${offset}`;
          
          const results = await DuckDBService.query(query);
          setFullPapers(results);
        } catch (err) {
          console.error('DuckDB Search Error:', err);
        } finally {
          setIsSearchingFull(false);
        }
      };
      fetchFull();
    }
  }, [activeTab, searchQuery, currentPage, isDuckDBReady]);

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
                {isDuckDBReady && (
                  <div className="absolute -bottom-6 right-0 flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    <Database className="w-3 h-3" />
                    {t.APP.DUCKDB_ACTIVE}
                  </div>
                )}
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
                        const cat = getString(catObj);
                        const count = papers.filter(p => getString(p.category) === cat).length;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-3 font-bold text-sm transition-all text-left flex items-center justify-between brutal-border ${
                              selectedCategory === cat 
                                ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                                : 'bg-[var(--color-gallery-white)] text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="truncate mr-2">{cat}</span>
                            <span className={`text-xs px-2 py-1 brutal-border flex-shrink-0 ${selectedCategory === cat ? 'bg-[var(--color-gallery-white)] text-black' : 'bg-slate-100 text-slate-500'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
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
                              <div className="text-sm font-bold text-slate-600 bg-slate-50 p-4 brutal-border border-slate-200 italic leading-relaxed">
                                {getString(paper.significance)}
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
                  {faqCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {setSelectedFaqCategory(cat); setExpandedFaq(null);}}
                      className={`px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all brutal-border ${
                        selectedFaqCategory === cat 
                          ? 'bg-[var(--color-brutal-black)] text-white brutal-shadow' 
                          : 'bg-[var(--color-gallery-white)] text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

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
                  <div className="brutal-border bg-[var(--color-gallery-white)] overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[var(--color-brutal-black)] text-white font-mono text-xs uppercase tracking-widest">
                          <th className="px-6 py-4 border-r border-white/10">{t.APP.TABLE_HEADERS.YEAR}</th>
                          <th className="px-6 py-4 border-r border-white/10">{t.APP.TABLE_HEADERS.TITLE}</th>
                          <th className="px-6 py-4 border-r border-white/10">{t.APP.TABLE_HEADERS.AUTHOR}</th>
                          <th className="px-6 py-4 border-r border-white/10">{t.APP.TABLE_HEADERS.INSTITUTION}</th>
                          <th className="px-6 py-4">{t.APP.TABLE_HEADERS.DATABASE}</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-bold">
                        {fullPapers.map((paper, idx) => (
                          <tr key={idx} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 border-r border-slate-100 whitespace-nowrap">{paper[APP_CONFIG.DUCKDB_COLUMNS.YEAR]}</td>
                            <td className="px-6 py-4 border-r border-slate-100 min-w-[300px]">{paper[APP_CONFIG.DUCKDB_COLUMNS.TITLE]}</td>
                            <td className="px-6 py-4 border-r border-slate-100 whitespace-nowrap">{paper[APP_CONFIG.DUCKDB_COLUMNS.AUTHOR]}</td>
                            <td className="px-6 py-4 border-r border-slate-100">{paper[APP_CONFIG.DUCKDB_COLUMNS.INSTITUTION]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{paper[APP_CONFIG.DUCKDB_COLUMNS.DATABASE]}</td>
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
                    
                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      {t.APP.POWERED_BY}
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
            ) : null}

          </div>
        )}
      </main>

      <Footer onNavigate={(tab) => handleTabChange(tab)} language={language} setLanguage={setLanguage} />
    </div>
  );
}
