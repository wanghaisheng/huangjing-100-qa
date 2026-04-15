# 技术架构与零硬编码规范 (Technical Architecture & Zero Hardcoding)

## 1. 核心架构原则
本架构旨在通过严格的层级解耦，实现代码在不同环境（本地、Edge Worker、Cloud）之间的无缝迁移，并确保 UI 与业务逻辑的物理分离。

### 1.1 职责分层 (Layered Responsibility)
*   **展示层 (React Components)**: 纯 UI 渲染。禁止包含硬编码文字、样式、URL 或复杂的业务逻辑。仅负责接收 Props 和触发事件回调。
*   **交互层 (Hooks)**: 处理客户端状态与副作用编排。通过调用 Service 层获取数据，不直接感知底层存储实现。
*   **编排层 (Astro/Server)**: 负责路由控制、SEO 数据获取、请求上下文传递以及环境配置注入。
*   **逻辑层 (Services)**: 纯业务逻辑函数，处理数据转换、校验和业务规则。
*   **持久层 (Storage Adapters)**: 抽象存储访问。通过统一的 `IStorageAdapter` 接口屏蔽具体数据库（Supabase, D1, SQL.js）的差异。

## 2. 零硬编码准则 (Zero Hardcoding)

### 2.1 字符串与国际化
*   禁止在 UI 组件中直接写入展示文本。
*   **规范**: 所有静态文本必须存储在 `i18n` 定义文件或配置常量中。

### 2.2 样式与设计语言
*   禁止硬编码颜色值（#FFF）、间距（16px）或字体大小。
*   **规范**: 必须使用设计系统定义的 Token（如 Tailwind 类名或 CSS 变量）。

### 2.3 URL 与端点
*   禁止在组件或 Hooks 中直接写 `fetch('/api/v1/...')`。
*   **规范**: 所有端点由环境配置（Environment Config）提供，并经由 Service 层统一调用。

### 2.4 存储提供商透明化
*   逻辑层不得直接导入 `supabase-js` 或 `d1-client`。
*   **规范**: 必须通过适配器模式注入，切换存储引擎只需修改配置文件中的 `Provider` 标识。

## 3. 存储适配器模式 (Storage Adapter Pattern)

### 3.1 统一契约 (Interface)
```typescript
interface IStorageAdapter {
  query<T>(collection: string, params: QueryParams): Promise<Result<T[]>>;
  upsert<T>(collection: string, data: T): Promise<Result<T>>;
  delete(collection: string, id: string): Promise<Result<void>>;
  auth: IAuthModule;
}
```
### 3.2 切换逻辑
实现 SqljsAdapter 用于客户端离线存储。
实现 SupabaseAdapter 用于云端快速原型。
实现 D1Adapter 用于 Edge 端生产环境。
在初始化阶段根据 CONFIG.STORAGE_TYPE 注入实例。

## 4. 数据流向规则
读取流: Server/Astro → Service → Adapter → Adapter Implementation。
操作流: User Action → Component Event → Hook → Service → Adapter。

## 5. 动态预渲染与缓存策略 (Analytics-Driven SSG)
为了平衡构建性能与运行速度，项目采用“流量驱动型预渲染”模式，避免对全量数据（如 100k+ 页面）进行静态生成。

### 5.1 混合渲染逻辑
构建期 (Build Time):
流量回溯: 构建脚本查询 Cloudflare Analytics API，获取过去 30 天流量前 N (如 500) 的路由。
选择性预渲染: Astro 仅对这 N 个路由进行静态生成 (SSG)。
零数据库耦合: 预渲染所需数据从边缘缓存或备份中提取，不强制连接生产数据库。
运行时 (Runtime - SSR/ISR):
按需回退: 非高频页面使用 Cloudflare Workers 进行 SSR。
边缘缓存: SSR 渲染后的 HTML 自动推送到 Cloudflare KV/Cache，实现 ISR (增量静态再生) 效果。
自动发现: 流量激增的新页面将在下一次 CI/CD 循环中自动进入“高频预渲染列表”。

### 5.2 存储适配器扩展
为了支持此模式，Storage Adapter 必须实现以下能力：
AnalyticsProvider: 抽象查询接口，用于获取热门路径。
KVProvider: 抽象键值存储接口，用于缓存 SSR 生成的 HTML 代码片段。

## 6. 零硬编码准则 (补充)
无硬编码路由参数: 禁止使用手动维护的 generateStaticParams。
动态注入: 预渲染列表必须作为构建参数通过环境变量或动态 JSON 注入。
