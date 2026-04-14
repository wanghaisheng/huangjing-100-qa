import { SITE_CONFIG } from '../config/siteConfig';

export const PAGES_STRINGS = {
  en: {
    ABOUT: {
      TITLE: 'About Project',
      WELCOME_PREFIX: 'Welcome to the',
      WELCOME_SUFFIX: 'Medicinal & Edible Homology Series.',
      MISSION: SITE_CONFIG.aboutMissionEn,
      BELIEF: 'We believe that health practices should be informed by evidence. This platform serves as a comprehensive knowledge base for researchers, practitioners, and enthusiasts alike, ensuring that every recommendation is backed by scientific data.'
    },
    DATA_SOURCE: {
      TITLE: 'Data Source',
      INTRO: 'The data presented on this platform is meticulously curated from publicly available academic resources and databases.',
      SOURCES_TITLE: 'Primary Sources',
      SOURCES: [
        { name: 'CNKI (China National Knowledge Infrastructure)', desc: 'A comprehensive database of Chinese academic journals, dissertations, and conference proceedings.' },
        { name: 'PubMed', desc: 'For international peer-reviewed literature on pharmacological properties.' },
        { name: 'Pharmacopoeia of the People\'s Republic of China', desc: 'For official standards and guidelines.' }
      ],
      PROCESSING_TITLE: 'Data Processing',
      PROCESSING_DESC: 'We utilize DuckDB for efficient, in-browser querying of our extensive datasets. This ensures fast, privacy-preserving search capabilities directly on your device without the need for constant server communication.',
      DISCLAIMER: 'Disclaimer: The information provided is for educational and research purposes only and should not replace professional medical advice.'
    },
    CONTACT: {
      TITLE: 'Contact Us',
      INTRO: 'We welcome feedback, collaboration inquiries, and questions regarding our research and platform.',
      EMAIL_LABEL: 'Email',
      EMAIL_ADDRESS: 'support@heytcm.com',
      EMAIL_DESC: 'For general inquiries and support.',
      COMMUNITY_LABEL: 'Community',
      COMMUNITY_DESC: 'Join our WeChat Group',
      COMMUNITY_SUB: 'Connect with other researchers and enthusiasts.'
    },
    HEADER: {
      TITLE: `Medicinal & Edible Homology Series • ${SITE_CONFIG.herbNameEn} Chapter`,
      TABS: {
        PAPERS: 'Representative Papers',
        FAQ: 'FAQ',
        FULL_DB: 'Full Database',
        ABOUT: 'About Project',
        DATA_SOURCE: 'Data Source',
        CONTACT: 'Contact'
      }
    },
    HERO: {
      TAG: `Medicinal & Edible Homology Series • ${SITE_CONFIG.herbNameEn} Chapter`,
      TITLE_1: 'Traditional Wisdom',
      TITLE_2: 'Modern Science',
      DESC: SITE_CONFIG.heroDescEn,
      CTA_PAPERS: 'Explore Literature →',
      CTA_FAQ: 'Scientific FAQ →',
    },
    METHODOLOGY: {
      SECTION_ID: '01 // Our Methodology',
      CARDS: [
        { title: 'Literature Mining', desc: 'Deep dive into thousands of academic studies to extract core conclusions.' },
        { title: 'Data-Driven', desc: 'Visualization of processing techniques and pharmacological mechanisms.' },
        { title: 'Safety Control', desc: 'Scientific assessment of heavy metals and pesticide residues.' },
      ]
    },
    FAQ_OVERVIEW: {
      SECTION_ID: '02 // FAQ Overview',
      CATEGORIES: [
        { title: 'Varieties & History', cat: '品种、历史与感官基础' },
        { title: 'Processing', cat: '炮制工艺与化学成分转化' },
        { title: 'Intestinal Health', cat: '肠道健康与微环境调节' },
        { title: 'Metabolic Protection', cat: '肝脏保护、降糖与代谢' },
        { title: 'Brain Health', cat: '脑健康、神经保护与综合应用' },
        { title: 'Safety', cat: '安全性与质量控制' },
      ]
    },
    CONCERNS: {
      SECTION_ID: '03 // Core Concerns & Scientific Answers',
      SUBTITLE: 'Based on literature data, we provide hard-core answers to the 4 core dimensions users care about most',
      CARDS: SITE_CONFIG.concernsEn
    },
    COMMUNITY: {
      SECTION_ID: '04 // Community & Digital Resources',
      TITLE: 'Medicinal & Edible Homology Series',
      SUBTITLE: 'This platform content is just the tip of the iceberg. Join the community to get the complete 110+ chapters real-time updated version.',
      SINGLE_PRICE: '¥29 / item',
      SINGLE_DESC: 'Single product buyout version',
      SINGLE_SUB: 'Permanently own single product data • Real-time sync',
      BUNDLES: [
        { count: '10 items', price: '¥99', saving: 'Save ¥191', type: 'Permanent Buyout' },
        { count: '50 items', price: '¥399', saving: 'Save ¥1051', type: 'Permanent Buyout' },
        { count: '100 items', price: '¥599', saving: 'Save ¥2301', type: 'Permanent Buyout' }
      ],
      MEMBERSHIP: {
        PRICE: '¥399',
        UNIT: '/year',
        TAG: 'Early Bird Special • Limited to first 100',
        BENEFIT: 'Unlock all chapters + Real-time updates + Community service',
        RULE: 'Annual fee increases by ¥100 for every 100 new members',
        PROGRESS: 68,
        CURRENT_STATUS: 'Only 32 seats left before next price increase'
      }
    },
    SHAKE: {
      SECTION_ID: '05 // Random Inspiration Bottle',
      TITLE: 'Random Inspiration Bottle',
      DESC: 'Shake the inspiration bottle on the left\nRandomly get a deep research paper',
      CTA: 'Shake a paper',
      CLICK_PROMPT: 'Click to Shake',
      LOADING: 'Mixing data...',
      LUCKY_PICK: 'Lucky Pick',
      READ_MORE: 'View Details'
    },
    APP: {
      SEARCH_PLACEHOLDER: 'Search papers or questions...',
      DUCKDB_ACTIVE: 'DuckDB WASM Active',
      FILTER_TITLE: 'Research Field Classification',
      ALL_PAPERS: 'All Papers',
      ITEMS_SUFFIX: 'ITEMS',
      READ_MORE: 'READ MORE',
      NO_RESULTS: 'NO RESULTS FOUND',
      TRY_DIFFERENT: 'TRY DIFFERENT KEYWORDS OR CATEGORIES',
      FAQ_TITLE: SITE_CONFIG.faqTitleEn,
      FAQ_SUBTITLE: 'BASED ON LATEST SCIENTIFIC RESEARCH',
      ALL_QUESTIONS: 'All Questions',
      FULL_DB_TITLE: 'Full Database',
      FULL_DB_SUBTITLE: '1100+ SCIENTIFIC PAPERS & THESES',
      QUERYING: 'Querying DuckDB...',
      TABLE_HEADERS: {
        YEAR: 'Year',
        TITLE: 'Title',
        AUTHOR: 'Author',
        INSTITUTION: 'Institution',
        DATABASE: 'Database'
      },
      NO_DB_RESULTS: 'No results found in DuckDB',
      POWERED_BY: 'Powered by DuckDB-Wasm',
      PREV_PAGE: 'Previous Page',
      NEXT_PAGE: 'Next Page',
      PAGE_INFO: 'Page {current} / {total}',
      TOTAL_RECORDS: '{total} records in total'
    },
    FOOTER: {
      COPYRIGHT: `© ${new Date().getFullYear()} HeyTCM. All rights reserved.`,
      PRIVACY_POLICY: 'Privacy Policy',
      TERMS_OF_USE: 'Terms of Use',
      LANGUAGE_ZH: 'ZH',
      LANGUAGE_EN: 'EN',
      DESC: 'This platform aims to provide convenient literature indexing services for researchers and enthusiasts. All data is sourced from publicly available academic resources.',
      SERIES_TITLE: 'Full Series 110+ Chapters',
      SERIES_COLLECTION: 'SERIES COLLECTION',
      CHAPTERS: 'CHAPTERS',
      DB_INDEX_FULL: 'DATABASE INDEX // FULL ACCESS',
      SERIES_NAME: 'Medicinal & Edible Homology Series',
      LINKS: [
        { label: 'About Project', href: '#' },
        { label: 'Data Source', href: '#' },
        { label: 'Contact', href: '#' },
      ]
    },
    ADMIN: {
      TITLE: 'Data Management (Admin)',
      UPLOAD_CSV: 'Upload CSV File',
      TABLE_NAME: 'Target Table Name',
      PROCESS_GEMINI: 'Process with Gemini',
      GENERATED_SQL: 'Generated SQL',
      EXECUTE_SQL: 'Execute SQL in DuckDB',
      DOWNLOAD_SQL: 'Download SQL File',
      PROCESSING: 'Processing...',
      SUCCESS: 'Operation Successful!',
      ERROR: 'Error',
      SITE_CONFIG_TITLE: 'Site Configuration',
      HERB_NAME_ZH: 'Herb Name (ZH)',
      HERB_NAME_EN: 'Herb Name (EN)',
      HERB_SCIENTIFIC_NAME: 'Scientific Name',
      HERO_DESC_ZH: 'Hero Description (ZH)',
      HERO_DESC_EN: 'Hero Description (EN)',
      ABOUT_MISSION_ZH: 'About Mission (ZH)',
      ABOUT_MISSION_EN: 'About Mission (EN)',
      FAQ_TITLE_ZH: 'FAQ Title (ZH)',
      FAQ_TITLE_EN: 'FAQ Title (EN)',
      DOWNLOAD_CONFIG: 'Download Config (siteConfig.ts)',
      CONFIG_INSTRUCTION: 'After downloading, replace the file at src/config/siteConfig.ts'
    },
    PRIVACY: {
      TITLE: 'Privacy Policy',
      CONTENT: `Last Updated: ${new Date().toLocaleDateString()}

1. Information Collection
We do not collect any personal information. All data processing (such as search queries) is done locally on your device using DuckDB.

2. Cookies and Tracking
We do not use tracking cookies or third-party analytics that compromise your privacy.

3. Data Security
Since no personal data is transmitted to our servers, your usage remains completely private and secure on your local device.

4. Changes to This Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

5. Contact Us
If you have any questions about this Privacy Policy, please contact us at support@heytcm.com.`
    },
    TERMS: {
      TITLE: 'Terms of Use',
      CONTENT: `Last Updated: ${new Date().toLocaleDateString()}

1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

2. Educational Purposes Only
The content on this platform is provided for educational and research purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.

3. Intellectual Property
The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws and are owned by HeyTCM or its licensors.

4. Disclaimer of Warranties
This website is provided "as is" without any representations or warranties, express or implied.

5. Limitation of Liability
HeyTCM will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website.

6. Contact Us
If you have any questions about these Terms, please contact us at support@heytcm.com.`
    }
  },
  zh: {
    ABOUT: {
      TITLE: '关于项目',
      WELCOME_PREFIX: '欢迎来到',
      WELCOME_SUFFIX: '药食同源百问百答系列。',
      MISSION: SITE_CONFIG.aboutMissionZh,
      BELIEF: '我们相信健康实践应基于证据。本平台旨在为研究人员、从业者和爱好者提供一个全面的知识库，确保每一项建议都有科学数据支持。'
    },
    DATA_SOURCE: {
      TITLE: '数据来源',
      INTRO: '本平台展示的数据均经过精心筛选，来源于公开的学术资源和数据库。',
      SOURCES_TITLE: '主要来源',
      SOURCES: [
        { name: 'CNKI (中国知网)', desc: '中国学术期刊、学位论文和会议论文的综合数据库。' },
        { name: 'PubMed', desc: '用于国际同行评审的药理学文献。' },
        { name: '中华人民共和国药典', desc: '用于官方标准和指南。' }
      ],
      PROCESSING_TITLE: '数据处理',
      PROCESSING_DESC: '我们利用 DuckDB 进行高效的浏览器内数据集查询。这确保了直接在您的设备上实现快速、保护隐私的搜索功能，无需持续与服务器通信。',
      DISCLAIMER: '免责声明：所提供的信息仅供教育和研究目的，不能替代专业的医疗建议。'
    },
    CONTACT: {
      TITLE: '联系我们',
      INTRO: '我们欢迎关于我们的研究和平台的反馈、合作咨询和问题。',
      EMAIL_LABEL: '邮箱',
      EMAIL_ADDRESS: 'support@heytcm.com',
      EMAIL_DESC: '用于一般咨询和支持。',
      COMMUNITY_LABEL: '社群',
      COMMUNITY_DESC: '加入我们的微信群',
      COMMUNITY_SUB: '与其他研究人员和爱好者交流。'
    },
    HEADER: {
      TITLE: `药食同源百问百答 • ${SITE_CONFIG.herbNameZh}篇`,
      TABS: {
        PAPERS: '代表文献',
        FAQ: '常见问题',
        FULL_DB: '全量大库',
        ABOUT: '关于项目',
        DATA_SOURCE: '数据来源',
        CONTACT: '联系我们'
      }
    },
    HERO: {
      TAG: `药食同源百问百答系列 • ${SITE_CONFIG.herbNameZh}篇`,
      TITLE_1: '传统智慧',
      TITLE_2: '现代科学',
      DESC: SITE_CONFIG.heroDescZh,
      CTA_PAPERS: '探索文献库 →',
      CTA_FAQ: '科学知识库 →',
    },
    METHODOLOGY: {
      SECTION_ID: '01 // 我们的方法',
      CARDS: [
        { title: '文献挖掘', desc: '深入数千篇学术研究，提炼核心结论。' },
        { title: '数据驱动', desc: '炮制工艺与药理机制可视化。' },
        { title: '安全把控', desc: '重金属与农残科学评估。' },
      ]
    },
    FAQ_OVERVIEW: {
      SECTION_ID: '02 // 百问百答概览',
      CATEGORIES: [
        { title: '品种、历史', cat: '品种、历史与感官基础' },
        { title: '炮制工艺', cat: '炮制工艺与化学成分转化' },
        { title: '肠道健康', cat: '肠道健康与微环境调节' },
        { title: '代谢保护', cat: '肝脏保护、降糖与代谢' },
        { title: '脑健康', cat: '脑健康、神经保护与综合应用' },
        { title: '安全性', cat: '安全性与质量控制' },
      ]
    },
    CONCERNS: {
      SECTION_ID: '03 // 核心关切与科学解答',
      SUBTITLE: '针对用户最关心的 4 大核心维度，基于文献数据给出硬核答复',
      CARDS: SITE_CONFIG.concernsZh
    },
    COMMUNITY: {
      SECTION_ID: '04 // 社群与数字资源',
      TITLE: '药食同源百问百答',
      SUBTITLE: '本平台内容仅为冰山一角，加入社群获取完整 110+ 章节实时更新版',
      SINGLE_PRICE: '¥29 / 款',
      SINGLE_DESC: '单款产品买断版',
      SINGLE_SUB: '永久拥有单款产品数据 • 实时同步',
      BUNDLES: [
        { count: '10份', price: '¥99', saving: '立省 ¥191', type: '永久买断' },
        { count: '50份', price: '¥399', saving: '立省 ¥1051', type: '永久买断' },
        { count: '100份', price: '¥599', saving: '立省 ¥2301', type: '永久买断' }
      ],
      MEMBERSHIP: {
        PRICE: '¥399',
        UNIT: '/年',
        TAG: '早鸟特惠 • 限前100名',
        BENEFIT: '全集解锁 + 实时更新 + 社群服务',
        RULE: '每增加 100 人，年费上涨 100 元',
        PROGRESS: 68,
        CURRENT_STATUS: '距离下次涨价仅剩 32 席'
      }
    },
    SHAKE: {
      SECTION_ID: '05 // 随机灵感瓶',
      TITLE: '随机灵感瓶',
      DESC: '摇动左侧的灵感瓶\n随机获取一篇深度研究文献',
      CTA: '摇出一篇文献',
      CLICK_PROMPT: '点击摇动',
      LOADING: '正在混合数据...',
      LUCKY_PICK: '幸运抽取',
      READ_MORE: '查看详情'
    },
    APP: {
      SEARCH_PLACEHOLDER: '搜索文献或问题...',
      DUCKDB_ACTIVE: 'DuckDB WASM 已启动',
      FILTER_TITLE: '研究领域分类',
      ALL_PAPERS: '全部文献',
      ITEMS_SUFFIX: '条记录',
      READ_MORE: '阅读更多',
      NO_RESULTS: '未找到结果',
      TRY_DIFFERENT: '尝试不同的关键词或分类',
      FAQ_TITLE: SITE_CONFIG.faqTitleZh,
      FAQ_SUBTITLE: '基于最新科学研究',
      ALL_QUESTIONS: '全部问题',
      FULL_DB_TITLE: '全量文献大库',
      FULL_DB_SUBTITLE: '1100+ 篇学术论文与研究',
      QUERYING: '正在查询 DuckDB...',
      TABLE_HEADERS: {
        YEAR: '年度',
        TITLE: '中文题名',
        AUTHOR: '作者',
        INSTITUTION: '单位',
        DATABASE: '库'
      },
      NO_DB_RESULTS: 'DuckDB 中未找到结果',
      POWERED_BY: '由 DuckDB-Wasm 驱动',
      PREV_PAGE: '上一页',
      NEXT_PAGE: '下一页',
      PAGE_INFO: '第 {current} 页 / 共 {total} 页',
      TOTAL_RECORDS: '共 {total} 条记录'
    },
    FOOTER: {
      COPYRIGHT: `© ${new Date().getFullYear()} HeyTCM. 保留所有权利。`,
      PRIVACY_POLICY: '隐私政策',
      TERMS_OF_USE: '使用条款',
      LANGUAGE_ZH: '中文',
      LANGUAGE_EN: '英文',
      DESC: '本平台旨在为研究人员及爱好者提供便捷的文献索引服务。所有数据均来源于公开学术资源。',
      SERIES_TITLE: '全系列 110+ 章节',
      SERIES_COLLECTION: 'SERIES COLLECTION',
      CHAPTERS: 'CHAPTERS',
      DB_INDEX_FULL: 'DATABASE INDEX // FULL ACCESS',
      SERIES_NAME: '药食同源百问百答系列',
      LINKS: [
        { label: '关于项目', href: '#' },
        { label: '数据来源', href: '#' },
        { label: '联系我们', href: '#' },
      ]
    },
    PRIVACY: {
      TITLE: '隐私政策',
      CONTENT: `最后更新日期：${new Date().toLocaleDateString()}

1. 信息收集
我们不收集任何个人信息。所有数据处理（如搜索查询）均使用 DuckDB 在您的设备本地完成。

2. Cookie 和追踪
我们不使用任何侵犯您隐私的追踪 Cookie 或第三方分析工具。

3. 数据安全
由于没有个人数据传输到我们的服务器，您的使用在本地设备上保持完全私密和安全。

4. 政策变更
我们可能会不时更新本隐私政策。如有任何更改，我们将通过在此页面发布新的隐私政策来通知您。

5. 联系我们
如果您对本隐私政策有任何疑问，请联系我们：support@heytcm.com。`
    },
    TERMS: {
      TITLE: '使用条款',
      CONTENT: `最后更新日期：${new Date().toLocaleDateString()}

1. 接受条款
通过访问和使用本网站，您接受并同意受本协议的条款和规定的约束。

2. 仅限教育目的
本平台提供的内容仅供教育和研究目的使用。它不能替代专业的医疗建议、诊断或治疗。

3. 知识产权
本网站上的内容、布局、设计、数据、数据库和图形受知识产权法保护，归 HeyTCM 或其许可方所有。

4. 免责声明
本网站按“原样”提供，不提供任何明示或暗示的陈述或保证。

5. 责任限制
HeyTCM 不对您因本网站内容、使用或与本网站相关的其他方面而承担任何责任。

6. 联系我们
如果您对这些条款有任何疑问，请联系我们：support@heytcm.com。`
    },
    ADMIN: {
      TITLE: '数据管理 (Admin)',
      UPLOAD_CSV: '上传 CSV 文件',
      TABLE_NAME: '目标表名',
      PROCESS_GEMINI: '使用 Gemini 处理',
      GENERATED_SQL: '生成的 SQL',
      EXECUTE_SQL: '在 DuckDB 中执行 SQL',
      DOWNLOAD_SQL: '下载 SQL 文件',
      PROCESSING: '处理中...',
      SUCCESS: '操作成功！',
      ERROR: '错误',
      SITE_CONFIG_TITLE: '网站配置管理',
      HERB_NAME_ZH: '中药名称 (中文)',
      HERB_NAME_EN: '中药名称 (英文)',
      HERB_SCIENTIFIC_NAME: '学名',
      HERO_DESC_ZH: '主页简介 (中文)',
      HERO_DESC_EN: '主页简介 (英文)',
      ABOUT_MISSION_ZH: '关于我们使命 (中文)',
      ABOUT_MISSION_EN: '关于我们使命 (英文)',
      FAQ_TITLE_ZH: 'FAQ 标题 (中文)',
      FAQ_TITLE_EN: 'FAQ 标题 (英文)',
      DOWNLOAD_CONFIG: '下载配置文件 (siteConfig.ts)',
      CONFIG_INSTRUCTION: '下载后，请将文件替换到 src/config/siteConfig.ts'
    }
  }
};
