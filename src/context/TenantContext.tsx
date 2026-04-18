import React, { createContext, useContext, useMemo } from 'react';
import { DataService } from '@heytcm/core';
import { resolveTenantByHost, TenantConfig } from '@heytcm/config';

interface TenantContextType {
  config: TenantConfig;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = useMemo(() => {
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'default';
    const resolvedConfig = resolveTenantByHost(hostname);

    // Automatically inject appId into the DataService/Storage layer
    DataService.initAppId(resolvedConfig.appId);
    
    return resolvedConfig;
  }, []);

  return (
    <TenantContext.Provider value={{ config }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
