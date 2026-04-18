# 技术架构与零硬编码规范 (Architecture & Decoupling Standards)

## 1. 核心分层架构：动作契约化
系统不再区分传统的 Hooks 和 Services，而是统一抽象为 **API 层 (Action Layer)**。UI 仅通过契约调用动作，不关心是本地执行还是远程执行。

### 1.1 分层职责
*   **表现层 (React/RN UI)**: 纯视图。通过统一的 API 客户端发起动作，接收 `Result` 对象。
*   **API 层 (Actions/Procedures)**: 【契约中心】定义所有可执行的操作（如 `getUser`, `updateHealthLog`）。
    *   **tRPC 实现**: 用于 Web/PWA，提供端到端类型安全的远程调用，直接连接 Cloudflare Workers。
    *   **HTTP/REST 实现**: 用于兼容性场景或第三方集成。
    *   **Local 实现**: 用于 React Native 或 PWA 离线模式，直接在本地运行业务逻辑。
*   **持久层 (Storage Adapters)**: 【存储契约】API 层不直接操作数据库，而是调用 `StorageAdapter` 实现增删改查。

## 2. 存储适配器模式 (Storage Adapter Pattern)
为了支持从 Supabase 到 Cloudflare D1 的无缝迁移，存储层必须契约化：
*   **实现类**: `SupabaseAdapter`, `D1Adapter`, `SqliteAdapter` (RN/Local)。
*   **原则**: 业务逻辑仅通过 `IStorageAdapter` 接口操作数据，屏蔽具体厂商 SDK。

## 3. 渲染策略：流量驱动型 SSG (Analytics-Driven)
*   **90/10 法则**: Astro 构建时获取 Cloudflare 流量统计，仅预渲染前 10% 的高频页面。
*   **动态回退**: 剩余 90% 页面由 Edge Worker 通过 API 层进行 SSR 渲染，并缓存至 KV。

## 4. 零硬编码准则 (Zero Hardcoding Policy)
*   **配置化**: 所有的 API Endpoint、存储提供商标识、功能开关必须存储在 `AppConfig` 中。
*   **设计令牌 (Design Tokens)**: 样式必须使用 Token（如 `theme.spacing.md`），以便 Web (Tailwind) 与 RN (StyleSheet) 共享一套视觉逻辑。
*   **文案国际化**: 严禁在 API 返回值或 UI 中硬编码中文/英文，必须通过 i18n ID 引用。

---

## 5. RN 迁移就绪清单
- [ ] API 层是否实现了双端适配（tRPC 远程 / Local 运行）？
- [ ] 所有的样式是否基于 Token 抽象，而非硬编码 CSS？
- [ ] 是否存在逻辑层直接引用 `window` 或 `localStorage` 的情况？
