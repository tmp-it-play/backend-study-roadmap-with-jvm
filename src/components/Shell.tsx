'use client';

import Link from 'next/link';
import { ArrowIcon, CoffeeEmoji } from '@/components/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { coreKeys, stages, numberOf, notes, stageHref, chapterKey } from '@/lib/curriculum';
import { useLearning } from './LearningProvider';

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/$/, '') || '/';
  const router = useRouter();
  const menu = useRef<HTMLDetailsElement>(null);
  const { completed, storageError } = useLearning();
  const count = coreKeys.filter((key) => completed.includes(key)).length;
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        const input = document.getElementById('search');
        if (input) { input.scrollIntoView({ block: 'center' }); input.focus(); }
        else router.push('/#search');
      }
      if (event.key === 'Escape' && menu.current) menu.current.open = false;
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [router]);
  const nav = <>
    <Link href="/" className="nav-home" aria-current={pathname === '/' ? 'page' : undefined}>전체 로드맵 <span>{count}/{coreKeys.length}</span></Link>
    <p className="nav-label">기본 과정</p>
    {stages.map((s) => {
      const done = s.chapters.filter((c) => completed.includes(chapterKey(s, c))).length;
      return <Link key={s.id} href={stageHref(s)} className={`stage-nav ${s.optional ? 'optional-nav' : ''}`} aria-current={pathname === stageHref(s) ? 'page' : pathname.startsWith(`${stageHref(s)}/`) ? 'location' : undefined}>
        <span className="nav-number">{s.optional ? '+' : numberOf(s)}</span><span>{s.title}</span>
        {done > 0 && <span className="nav-done" aria-label={`${done}개 완료`}>{done === s.chapters.length ? '✓' : done}</span>}
      </Link>;
    })}
    <Link href="/practice" className="nav-notes" aria-current={pathname === '/practice' ? 'page' : undefined}>직접 해보는 실습 <span><ArrowIcon direction="up-right" /></span></Link>
    <Link href="/notes" className="nav-notes" aria-current={pathname === '/notes' ? 'page' : undefined}><span><CoffeeEmoji /> 보충 지식</span><span>{notes.length}</span></Link>
    <p className="nav-foot">Java와 Kotlin에서 출발해<br />Spring Boot 운영까지.</p>
  </>;
  return <>
    <a className="skip-link" href="#main">본문으로 건너뛰기</a>
    <header className="top"><div className="top-inner">
      <details ref={menu} className="mobile-menu"><summary aria-label="학습 메뉴">☰</summary><nav aria-label="접이식 학습 단계" onClick={() => { if (menu.current) menu.current.open = false; }}>{nav}</nav></details>
      <Link href="/" className="brand">JVM <b>로드맵</b></Link>
      <Link href="/#search" className="search-link" aria-label="학습 내용 검색"><span aria-hidden="true">⌕</span> <span>어떤 개념이 궁금한가요?</span><kbd>⌘ K</kbd></Link>
      <Link className="header-notes" href="/notes">보충 지식 <span>{notes.length}</span></Link>
    </div></header>
    <aside className="sidebar"><nav aria-label="학습 단계">{nav}</nav></aside>
    <main id="main" className="main">{storageError && <p role="status" className="storage-warning">브라우저 저장 공간을 사용할 수 없어 이번 진도는 새로고침하면 사라질 수 있습니다.</p>}{children}</main>
  </>;
}
