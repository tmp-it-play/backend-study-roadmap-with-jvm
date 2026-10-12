'use client';

import { useEffect, useRef, useState } from 'react';

export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = useRef(true);
  useEffect(() => {
    active.current = true;
    return () => { active.current = false; clearTimeout(timer.current); };
  }, []);

  const copy = async () => {
    clearTimeout(timer.current);
    setStatus('copying');
    try {
      await navigator.clipboard.writeText(text);
      if (!active.current) return;
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      if (active.current) setStatus('error');
    }
  };

  return <>
    <button type="button" className="copy-button" onClick={copy} disabled={status === 'copying'} aria-label={`${label} 복사`}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
      <span role="status">{status === 'copied' ? '복사됨' : status === 'copying' ? '복사 중' : '복사'}</span>
    </button>
    {status === 'error' && <span className="copy-error" role="alert">복사하지 못했습니다. 코드를 선택해 직접 복사해 주세요.</span>}
  </>;
}
