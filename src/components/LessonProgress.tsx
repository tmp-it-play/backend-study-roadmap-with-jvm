'use client';

import { useLearning } from './LearningProvider';

export default function LessonProgress({ chapterKey }: { chapterKey: string }) {
  const { completed, toggle, ready } = useLearning();
  const learned = completed.includes(chapterKey);
  return <label className="chapter-check lesson-progress">
    <input type="checkbox" checked={learned} disabled={!ready} onChange={() => toggle(chapterKey)} />
    <span>{learned ? '이 단원 학습 완료' : '이 단원 학습 완료 표시'}</span>
    <span className="check-description">실습과 셀프 체크를 마쳤나요?</span>
  </label>;
}
