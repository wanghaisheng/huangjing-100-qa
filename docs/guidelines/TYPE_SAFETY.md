# 类型安全最佳实践 (Type Safety Best Practices)

## 1. 核心目标
建立从数据源到 UI 的端到端类型链路，消除运行时由于“数据形状不匹配”导致的错误。

## 2. 类型定义准则

### 2.1 严禁 any
*   严禁使用 `any` 类型。如果类型不确定，必须使用 `unknown`。
*   **规范**: 处理外部输入（API, 存储）时，使用 `unknown` 并配合 `Type Guards` 或校验库（如 Zod）。

### 2.2 显式返回类型
*   所有导出的函数、Service 方法必须明确标注返回类型。
*   **规范**: 避免依赖 TypeScript 的自动推导，以防止逻辑变更引发意外的下游断裂。

### 2.3 判别式联合类型 (Discriminated Unions)
*   处理多种状态（加载中、成功、失败）时，使用联合类型。
```typescript
type AsyncResult<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

## 3. 边界校验 (Runtime Validation)
### 3.1 零信任原则
架构边缘（API 入口、存储读取处、用户输入）必须进行运行时校验。
推荐工具: 使用 Zod 或 Valibot 定义 Schema。
```typescript
const DataSchema = z.object({ id: z.string(), value: z.number() });
type Data = z.infer<typeof DataSchema>;
```

## 4. 函数式错误处理
### 4.1 结果包装器 (Result Pattern)
禁止在业务逻辑层滥用 throw。
规范: 异步操作统一返回 Result<T, E> 对象。
```typescript
type Result<T, E = Error> = 
  | { ok: true; value: T } 
  | { ok: false; error: E };
```

## 5. 模块化类型组织
*   Base Types: 基础原始类型（ID, Timestamp, JSON）。
*   Domain Entities: 业务领域实体（根据业务逻辑定义的纯数据结构）。
*   DTOs (Data Transfer Objects): 接口传输契约。
*   Storage Models: 对应物理数据库表的模型。

## 6. 工具类型使用限制
*   优先使用 Pick<T, K> 和 Omit<T, K> 派生新类型。
*   使用 Readonly<T> 确保状态不可变。
*   使用 Required<T> 或 Partial<T> 明确字段可选性，而非随意添加 ?。

## 7. 检查清单
*   是否存在 as any 断言？（应替换为类型守卫）
*   API 返回值是否有对应的 Zod Schema 校验？
*   所有的 Storage 调用是否使用了泛型约束？
*   状态逻辑是否使用了判别式联合类型？

## 8. 渲染与缓存层类型安全
### 8.1 流量分析模型 (Analytics Schema)
```typescript
/**
 * 流量路径元数据，用于决定构建优先级
 */
export interface PathTrafficMetrics {
  path: string;
  requestCount: number;
  priority: 'critical' | 'normal' | 'low';
  lastAccessed: Timestamp;
}
```
### 8.2 缓存契约 (Cache Contract)
为确保从 KV/Cache 读出的 HTML 内容具有可预测性，必须定义缓存对象的包装类型：
```typescript
/**
 * 存储在 KV 中的 SSR 缓存对象
 */
export interface CachedPage {
  html: string;
  metadata: {
    renderedAt: Timestamp;
    version: string; // 用于缓存失效控制
    cacheControl: string;
  };
}

// 访问时必须使用 Type Guard 校验缓存数据的结构
export function isCachedPage(data: unknown): data is CachedPage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'html' in data &&
    'metadata' in data
  );
}
```
### 8.3 环境配置类型化
```typescript
export interface RenderingConfig {
  PRE_RENDER_LIMIT: number;      // 预渲染页面上限
  ANALYTICS_WINDOW_DAYS: number; // 分析窗口期
  ISR_TTL: number;               // ISR 缓存过期时间
}
```

## 9. 检查清单 (新增)
*   预渲染列表是否由 AnalyticsProvider 动态生成？
*   SSR 路径读取 KV 缓存时是否进行了 isCachedPage 运行时校验？
*   构建脚本是否能够优雅降级（若 Analytics API 超时，是否渲染基础页面）
