# 药食同源百问百答 • 黄精篇 (Huangjing Research Explorer)

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![WASM](https://img.shields.io/badge/WASM-Powered-orange.svg)](https://webassembly.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个基于现代 Web 技术构建的“药食同源”知识检索与科研探索工具。本项目通过可视化数据库和结构化知识库，将深奥的黄精科研成果转化为普通大众和专业人士均能轻松访问的知识图谱。

## 🌟 核心特性 (Key Features)

- **双层文献系统**:
  - **代表文献 (50+)**: 深度策展的标志性研究成果。
  - **全量大库 (1100+)**: 基于 DuckDB-Wasm 的海量数据实时检索。
- **结构化百问百答 (106+)**: 涵盖品种、炮制、药理、安全性等全方位的科学指南。
- **现代化技术栈**: 采用 Monorepo 架构，逻辑与视图深度解耦。
- **极致响应**: 核心查询逻辑全部在浏览器端（WASM）完成。
- **双语支持**: 完整的中文与英文国际化方案。

## 📁 项目结构 (Project Structure)

```text
├── packages/
│   ├── core/           # 核心逻辑与适配器 (DataService, StorageAdapters)
│   ├── api/            # API 客户端定义
│   ├── config/         # 全局配置 (SiteConfig, AppConfig)
│   ├── i18n/           # 国际化文案
│   └── ui/             # 共享 UI 组件
├── src/                # 应用前端
│   ├── components/     # 业务组件
│   └── App.tsx         # 主入口
├── docs/               # 技术与设计标准文档
└── GOLDEN_CIRCLE.md    # 项目愿景与使命
```

## 🛠 技术实现 (Technical Stack)

- **Frontend**: React 18, Vite 6, Tailwind CSS
- **Database**: DuckDB-Wasm, SQL.js
- **Logic**: TypeScript Monorepo
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 📖 文档指南 (Documentation)

- [项目使命 (Golden Circle)](./GOLDEN_CIRCLE.md)
- [核心思考与设计哲学](./docs/THOUGHTS.md)
- [技术架构标准](./docs/guidelines/ARCH_STANDARDS.md)
- [类型安全指南](./docs/guidelines/TYPE_SAFETY.md)

---

## 🚀 开发者 (Developer)

本项目由 **HeyTCM 研发团队** 驱动，旨在探索中医药数字化的未来边界。
