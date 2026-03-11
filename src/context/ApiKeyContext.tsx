'use client';

import { createContext, useMemo, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  hasKey: boolean;
}

export const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: '',
  setApiKey: () => {},
  clearApiKey: () => {},
  hasKey: false,
});

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey, clearApiKey] = useLocalStorage('sb-gemini-key', '');

  const value = useMemo(
    () => ({ apiKey, setApiKey, clearApiKey, hasKey: apiKey.length > 0 }),
    [apiKey, setApiKey, clearApiKey]
  );

  return (
    <ApiKeyContext.Provider value={value}>
      {children}
    </ApiKeyContext.Provider>
  );
}
