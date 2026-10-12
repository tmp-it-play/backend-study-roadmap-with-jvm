'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { allKeys } from '@/lib/curriculum';

const STORAGE_KEY = 'jvm-roadmap:learned:v1';
const Learning = createContext<{
  completed: string[]; ready: boolean; storageError: boolean; toggle: (key: string) => void;
}>({ completed: [], ready: false, storageError: false, toggle: () => {} });

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const sync = () => {
      try {
        const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
        setCompleted(Array.isArray(stored) ? [...new Set(stored.filter((key): key is string => typeof key === 'string' && allKeys.has(key)))] : []);
      } catch { setStorageError(true); }
      setReady(true);
    };
    sync();
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) sync(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  const toggle = useCallback((key: string) => {
    if (!allKeys.has(key) || !ready) return;
    const next = completed.includes(key) ? completed.filter((k) => k !== key) : [...completed, key];
    setCompleted(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }, [completed, ready]);
  return <Learning.Provider value={{ completed, ready, toggle, storageError }}>{children}</Learning.Provider>;
}
export const useLearning = () => useContext(Learning);
