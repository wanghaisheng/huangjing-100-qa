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
1. 实现 `SqljsAdapter` 用于客户端离线存储。
2. 实现 `SupabaseAdapter` 用于云端快速原型。
3. 实现 `D1Adapter` 用于 Edge 端生产环境。
4. 在初始化阶段根据 `CONFIG.STORAGE_TYPE` 注入实例。

---

## 4. 数据流向规则
1. **读取流**: `Server/Astro` → `Service` → `Adapter` → `Adapter Implementation`。
2. **操作流**: `User Action` → `Component Event` → `Hook` → `Service` → `Adapter`。
