export const TENANT_MAP: Record<string, { appId: string; name: string; theme: string }> = {
  // 开发与预览环境回退
  'localhost': { appId: 'dev_001', name: '中医智库 (Dev)', theme: 'blue' },
  'default': { appId: 'tcm_000', name: '中医大全 (默认)', theme: 'blue' },
  
  // 生产环境真实域名映射
  'shanyao.heytcm.com': { appId: 'sy_001', name: '山药百科', theme: 'green' },
  'renshen.heytcm.com': { appId: 'rs_002', name: '人参研究', theme: 'red' },
};

export type TenantConfig = typeof TENANT_MAP[keyof typeof TENANT_MAP];

// 获取当前租户配置的辅助函数
export const resolveTenantByHost = (hostname: string): TenantConfig => {
  // 优先匹配精确域名
  if (TENANT_MAP[hostname]) {
    return TENANT_MAP[hostname];
  }
  
  // AI Studio 预览环境处理 / 本地开发
  if (hostname.includes('run.app') || hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return TENANT_MAP['localhost'];
  }
  
  // 匹配失败启用默认降级
  return TENANT_MAP['default'];
};
