'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { allKeys } from '@/lib/curriculum';

const STORAGE_KEY = 'jvm-roadmap:learned:v1';
const Learning = createContext<{
  completed: string[]; ready: boolean; storageError: boolean; toggle: (key: string) => void; markComplete: (key: string) => void;
}>({ completed: [], ready: false, storageError: false, toggle: () => {}, markComplete: () => {} });

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
  const save = useCallback((next: string[]) => {
    setCompleted(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }, []);
  const toggle = useCallback((key: string) => {
    if (!allKeys.has(key) || !ready) return;
    save(completed.includes(key) ? completed.filter((k) => k !== key) : [...completed, key]);
  }, [completed, ready, save]);
  const markComplete = useCallback((key: string) => {
    if (!ready || !allKeys.has(key) || completed.includes(key)) return;
    save([...completed, key]);
  }, [completed, ready, save]);
  return <Learning.Provider value={{ completed, ready, toggle, markComplete, storageError }}>{children}</Learning.Provider>;
}
export const useLearning = () => useContext(Learning);
