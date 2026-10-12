'use client';

import { useEffect, useRef } from 'react';
import { useLearning } from './LearningProvider';

export default function LessonProgress({ chapterKey }: { chapterKey: string }) {
  const { completed, toggle, markComplete, ready } = useLearning();
  const visited = useRef<string | null>(null);
  useEffect(() => {
    if (!ready || visited.current === chapterKey) return;
    visited.current = chapterKey;
    markComplete(chapterKey);
  }, [chapterKey, ready, markComplete]);
  const learned = completed.includes(chapterKey);
  return <label className="chapter-check lesson-progress">
    <input type="checkbox" checked={learned} disabled={!ready} onChange={() => toggle(chapterKey)} />
    <span>{learned ? '이 단원 학습 완료' : '이 단원 학습 완료 표시'}</span>
    <span className="check-description">단원을 열면 자동 완료 · 필요하면 해제할 수 있어요</span>
  </label>;
}
