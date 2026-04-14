import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DuckDBService } from '../services/duckdbService';
import { PAGES_STRINGS } from '../i18n/pages';
import { Language } from '../i18n/config';
import { SITE_CONFIG } from '../config/siteConfig';

export const AdminPage = ({ language }: { language: Language }) => {
  const t = PAGES_STRINGS[language].ADMIN;
  
  // CSV to SQL State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [tableName, setTableName] = useState('papers');
  const [sql, setSql] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  // Site Config State
  const [siteConfig, setSiteConfig] = useState(SITE_CONFIG);
  const [concernsZhStr, setConcernsZhStr] = useState(JSON.stringify(SITE_CONFIG.concernsZh, null, 2));
  const [concernsEnStr, setConcernsEnStr] = useState(JSON.stringify(SITE_CONFIG.concernsEn, null, 2));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!csvFile) return;
    setIsProcessing(true);
    setMessage('');
    try {
      const text = await csvFile.text();
      // Using the API key from Vite environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
      if (!apiKey) {
        throw new Error('Gemini API Key not found in environment variables.');
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a data conversion assistant. Convert the following CSV data into valid SQL INSERT statements for DuckDB.
      The table name is "${tableName}".
      Return ONLY the raw SQL statements. Do NOT wrap them in markdown code blocks (like \`\`\`sql).
      CSV Data:
      ${text}`;

      const result = await model.generateContent(prompt);
      let generatedSql = result.response.text().trim();
      // Clean up markdown if model still adds it
      if (generatedSql.startsWith('\`\`\`sql')) {
        generatedSql = generatedSql.replace(/^\`\`\`sql\n/, '').replace(/\n\`\`\`$/, '');
      } else if (generatedSql.startsWith('\`\`\`')) {
        generatedSql = generatedSql.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
      }
      setSql(generatedSql);
      setMessage(t.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setMessage(`${t.ERROR}: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecute = async () => {
    if (!sql) return;
    setIsProcessing(true);
    setMessage('');
    try {
      await DuckDBService.init();
      await DuckDBService.query(sql);
      setMessage(t.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setMessage(`${t.ERROR}: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tableName}_data.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadConfig = () => {
    const configContent = `export const SITE_CONFIG = {
  herbNameZh: '${siteConfig.herbNameZh}',
  herbNameEn: '${siteConfig.herbNameEn}',
  herbScientificName: '${siteConfig.herbScientificName}',
  heroDescZh: '${siteConfig.heroDescZh}',
  heroDescEn: '${siteConfig.heroDescEn}',
  aboutMissionZh: '${siteConfig.aboutMissionZh}',
  aboutMissionEn: '${siteConfig.aboutMissionEn}',
  faqTitleZh: '${siteConfig.faqTitleZh}',
  faqTitleEn: '${siteConfig.faqTitleEn}',
  concernsZh: ${JSON.stringify(siteConfig.concernsZh, null, 4)},
  concernsEn: ${JSON.stringify(siteConfig.concernsEn, null, 4)}
};
`;
    const blob = new Blob([configContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siteConfig.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConfigChange = (key: keyof typeof SITE_CONFIG, value: any) => {
    setSiteConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* CSV to SQL Section */}
      <div className="bg-[var(--color-gallery-white)] brutal-border brutal-shadow p-8">
        <h2 className="text-4xl font-display uppercase mb-8">{t.TITLE}</h2>
        
        <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="font-bold uppercase tracking-widest text-sm">{t.TABLE_NAME}</label>
          <input 
            type="text" 
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-bold uppercase tracking-widest text-sm">{t.UPLOAD_CSV}</label>
          <input 
            type="file" 
            accept=".csv"
            onChange={handleFileChange}
            className="p-3 brutal-border bg-white"
          />
        </div>

        <button
          onClick={handleProcess}
          disabled={!csvFile || isProcessing}
          className={`px-6 py-3 font-bold uppercase tracking-widest brutal-border transition-all ${
            !csvFile || isProcessing 
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
              : 'bg-[var(--color-neon-orange)] text-white hover:bg-black brutal-shadow'
          }`}
        >
          {isProcessing ? t.PROCESSING : t.PROCESS_GEMINI}
        </button>

        {message && (
          <div className={`p-4 brutal-border font-bold ${message.includes(t.ERROR) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {sql && (
          <div className="space-y-4 mt-8">
            <h3 className="text-2xl font-display uppercase">{t.GENERATED_SQL}</h3>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleExecute}
                disabled={isProcessing}
                className="px-6 py-3 bg-black text-white font-bold uppercase tracking-widest brutal-border hover:bg-[var(--color-neon-orange)] brutal-shadow transition-all"
              >
                {t.EXECUTE_SQL}
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest brutal-border hover:bg-slate-100 brutal-shadow transition-all"
              >
                {t.DOWNLOAD_SQL}
              </button>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Site Configuration Section */}
      <div className="bg-[var(--color-gallery-white)] brutal-border brutal-shadow p-8">
        <h2 className="text-4xl font-display uppercase mb-8">{t.SITE_CONFIG_TITLE}</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.HERB_NAME_ZH}</label>
              <input 
                type="text" 
                value={siteConfig.herbNameZh}
                onChange={(e) => handleConfigChange('herbNameZh', e.target.value)}
                className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.HERB_NAME_EN}</label>
              <input 
                type="text" 
                value={siteConfig.herbNameEn}
                onChange={(e) => handleConfigChange('herbNameEn', e.target.value)}
                className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.HERB_SCIENTIFIC_NAME}</label>
              <input 
                type="text" 
                value={siteConfig.herbScientificName}
                onChange={(e) => handleConfigChange('herbScientificName', e.target.value)}
                className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.HERO_DESC_ZH}</label>
              <textarea 
                value={siteConfig.heroDescZh}
                onChange={(e) => handleConfigChange('heroDescZh', e.target.value)}
                className="p-3 h-24 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.HERO_DESC_EN}</label>
              <textarea 
                value={siteConfig.heroDescEn}
                onChange={(e) => handleConfigChange('heroDescEn', e.target.value)}
                className="p-3 h-24 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.ABOUT_MISSION_ZH}</label>
              <textarea 
                value={siteConfig.aboutMissionZh}
                onChange={(e) => handleConfigChange('aboutMissionZh', e.target.value)}
                className="p-3 h-24 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.ABOUT_MISSION_EN}</label>
              <textarea 
                value={siteConfig.aboutMissionEn}
                onChange={(e) => handleConfigChange('aboutMissionEn', e.target.value)}
                className="p-3 h-24 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.FAQ_TITLE_ZH}</label>
              <input 
                type="text" 
                value={siteConfig.faqTitleZh}
                onChange={(e) => handleConfigChange('faqTitleZh', e.target.value)}
                className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-bold uppercase tracking-widest text-sm">{t.FAQ_TITLE_EN}</label>
              <input 
                type="text" 
                value={siteConfig.faqTitleEn}
                onChange={(e) => handleConfigChange('faqTitleEn', e.target.value)}
                className="p-3 brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">核心关切 (中文 JSON)</label>
              <textarea 
                value={concernsZhStr}
                onChange={(e) => {
                  setConcernsZhStr(e.target.value);
                  try {
                    const parsed = JSON.parse(e.target.value);
                    handleConfigChange('concernsZh', parsed);
                  } catch (err) {
                    // Ignore invalid JSON while typing
                  }
                }}
                className="p-3 h-48 font-mono text-xs brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="font-bold uppercase tracking-widest text-sm">Core Concerns (English JSON)</label>
              <textarea 
                value={concernsEnStr}
                onChange={(e) => {
                  setConcernsEnStr(e.target.value);
                  try {
                    const parsed = JSON.parse(e.target.value);
                    handleConfigChange('concernsEn', parsed);
                  } catch (err) {
                    // Ignore invalid JSON while typing
                  }
                }}
                className="p-3 h-48 font-mono text-xs brutal-border focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-orange)]"
              />
            </div>
          </div>

          <div className="pt-6 border-t-2 border-[var(--color-brutal-black)]">
            <p className="text-sm text-slate-500 mb-4">{t.CONFIG_INSTRUCTION}</p>
            <button
              onClick={handleDownloadConfig}
              className="px-6 py-3 bg-[var(--color-neon-orange)] text-white font-bold uppercase tracking-widest brutal-border hover:bg-black brutal-shadow transition-all"
            >
              {t.DOWNLOAD_CONFIG}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
