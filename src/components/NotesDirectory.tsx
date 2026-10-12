'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notes, stages } from '@/lib/curriculum';
import NoteCard from './NoteCard';
import SelectField from './SelectField';

export default function NotesDirectory() {
  const [query, setQuery] = useState('');
  const [stage, setStage] = useState('all');
  const [active, setActive] = useState('');
  useEffect(() => {
    const read = () => { setActive(decodeURIComponent(location.hash.slice(1))); };
    read(); window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  useEffect(() => { if (active) document.getElementById(active)?.scrollIntoView({ block: 'start' }); }, [active]);
  const filtered = notes.filter((n) => (stage === 'all' || n.stages.includes(stage)) && `${n.title} ${n.body}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <div className="notes-page"><header className="detail-hero notes-hero"><Link href="/" className="breadcrumb">로드맵 / 보충 지식</Link><p className="detail-level">잠깐 쉬어가는 지식 휴게소</p><h1>알아두면 연결되는 것들</h1><p>낯선 이름과 헷갈리는 차이를 짧게 정리했습니다.<br />학습 중 궁금할 때, 필요한 설명만 찾아 읽으세요.</p></header>
    <div className="notes-content"><div className="notes-controls"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="예: Groovy, val, 트랜잭션" aria-label="보충 지식 검색" /></label><SelectField label="관련 단계" value={stage} onValueChange={setStage} options={[{ value: 'all', label: '모든 단계' }, ...stages.filter((s) => notes.some((n) => n.stages.includes(s.id))).map((s) => ({ value: s.id, label: s.title }))]} /></div>
      <p className="notes-count" role="status">{filtered.length}개의 보충 설명</p>
      {filtered.length ? filtered.map((note) => <NoteCard key={note.id} note={note} expanded={note.id === active} />) : <div className="empty-result"><h2>찾는 설명이 없습니다</h2><p>다른 검색어나 관련 단계를 선택해 보세요.</p><button onClick={() => { setQuery(''); setStage('all'); }}>검색 초기화</button></div>}
      <div className="notes-return"><Link href="/">← 학습 경로로 돌아가기</Link><p>각 설명은 관련 단계에서도 만날 수 있습니다.</p></div>
    </div>
  </div>;
}
