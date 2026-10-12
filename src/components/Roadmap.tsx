'use client';

import Link from 'next/link';
import { ArrowIcon, CoffeeEmoji } from '@/components/Icons';
import { useEffect, useRef, useState } from 'react';
import { stages, coreStages, coreKeys, notes, totalChapters, chapterKey, lessonHref, numberOf, stageHref, stageText } from '@/lib/curriculum';
import { useLearning } from './LearningProvider';
import { Skyline } from './Scenery';
import ScrollCar from './ScrollCar';

const areas = ['전체', ...new Set(stages.map((s) => s.area))];

export default function Roadmap() {
  const { completed, ready } = useLearning();
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('전체');
  const [view, setView] = useState<'road' | 'list'>('road');
  const input = useRef<HTMLInputElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const q = query.trim().toLocaleLowerCase();
  const filtered = stages.filter((s) => (area === '전체' || s.area === area) && (!q || stageText(s).includes(q)));
  const noteResults = q ? notes.filter((n) => `${n.title} ${n.body}`.toLocaleLowerCase().includes(q)) : [];
  const done = coreKeys.filter((key) => completed.includes(key)).length;
  const percent = Math.round(done / coreKeys.length * 100);
  const nextStage = coreStages.find((s) => s.chapters.some((c) => !completed.includes(chapterKey(s, c))));
  const nextChapter = nextStage?.chapters.find((c) => !completed.includes(chapterKey(nextStage, c)));
  useEffect(() => {
    const focus = () => { if (location.hash === '#search') input.current?.focus(); };
    focus(); window.addEventListener('hashchange', focus);
    return () => window.removeEventListener('hashchange', focus);
  }, []);
  return <div className="home">
    <section className="hero"><span className="cloud cloud-one" /><span className="cloud cloud-two" /><span className="sun" />
      <p className="hero-languages"><span>Java</span><i /> <span>Kotlin</span><i /> <span>Spring Boot</span></p>
      <h1>JVM 백엔드 학습</h1><div className="road-sign-title">로드맵 <span aria-hidden="true"><ArrowIcon /></span></div>
      <p className="hero-description">언어의 기본기부터 서비스 운영까지.<br />표지판을 따라, 하나씩 이해하며 나아가세요.</p>
      <div className="hero-stats"><span>기본 <b>15</b>단계</span><span>학습 본문 <b>{totalChapters}</b>개</span><span>보충 지식 <b>{notes.length}</b>개</span></div>
      <Skyline />
    </section>
    <div className="journey-intro">
      <section className="next-destination" aria-label="학습 진행률">
        <div><p className="destination-label">{nextStage ? (done ? '다음 목적지' : '첫 번째 목적지') : '기본 과정 완주'}</p>
          <h2>{nextChapter?.title ?? '이제 나만의 서비스를 만들어 보세요'}</h2>
          <p>{nextStage ? `${numberOf(nextStage)}단계 · ${nextStage.title}` : '선택 심화에서 필요한 기술을 더 탐색해 보세요.'}</p>
        </div>
        <Link className="go-button" href={nextStage && nextChapter ? lessonHref(nextStage, nextChapter) : '/stages/advanced'}>{done ? '이어서 보기' : '출발하기'} <span aria-hidden="true"><ArrowIcon /></span></Link>
        <div className="overall-progress"><span>기본 과정</span><progress value={done} max={coreKeys.length} aria-label="기본 과정 완료율" /><span>{ready ? `${done} / ${coreKeys.length}` : `0 / ${coreKeys.length}`}</span><strong>{percent}%</strong></div>
      </section>
      <details className="route-guide"><summary>어디서부터 시작하면 좋을까요?<span aria-hidden="true">⌄</span></summary><div>
        <p><strong>처음이라면</strong> 환경 설정 → Java → Kotlin → JVM → Spring 순서로 이동하세요.</p>
        <p><strong>Java를 안다면</strong> Kotlin과 상호운용부터, <strong>Kotlin을 안다면</strong> Java의 객체·제네릭·예외를 비교하며 시작하세요.</p>
        <p><strong>Spring을 써 봤다면</strong> 단계별 완료 기준으로 점검하고 트랜잭션·동시성·운영을 보강하세요.</p>
      </div></details>
      <div className="curriculum-notice"><span aria-hidden="true">▤</span><p><strong>개념을 읽고, 예제로 확인하세요.</strong> 110개 단원의 본문과 실습, 셀프 체크 해설을 제공합니다. 궁금한 용어는 보충 지식에서 함께 살펴보세요.</p></div>
      <div className="roadmap-controls"><div className="search-field"><span aria-hidden="true">⌕</span><input ref={input} id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="개념이나 목차 검색 · 예: 트랜잭션, DSL" aria-label="로드맵 검색" /></div>
        <div className="view-toggle" role="group" aria-label="로드맵 보기 방식"><button aria-pressed={view === 'road'} onClick={() => setView('road')}>도로</button><button aria-pressed={view === 'list'} onClick={() => setView('list')}>목록</button></div>
      </div>
      <div className="filter-row"><label htmlFor="area">학습 영역</label><select id="area" value={area} onChange={(e) => setArea(e.target.value)}>{areas.map((a) => <option key={a}>{a}</option>)}</select><span role="status">{filtered.length}개 구간{q && ` · 보충 지식 ${noteResults.length}개`}</span></div>
    </div>
    {q && noteResults.length > 0 && <section className="note-results" aria-label="보충 지식 검색 결과"><h2>함께 찾은 보충 지식</h2><div>{noteResults.map((n) => <Link key={n.id} href={`/notes#${n.id}`}><CoffeeEmoji /> {n.title}</Link>)}</div></section>}
    {filtered.length ? <div ref={track} className={`track ${view === 'list' ? 'list-view' : ''}`}>
      {filtered.map((s, index) => {
        const stageDone = s.chapters.filter((c) => completed.includes(chapterKey(s, c))).length;
        const isNext = nextStage?.id === s.id;
        const chapters = q ? s.chapters.filter((c) => `${s.title} ${s.area} ${c.title} ${c.topics.join(' ')}`.toLocaleLowerCase().includes(q)) : s.chapters;
        return <section key={s.id} className={`lap ${index % 2 ? 'left' : 'right'} ${s.optional ? 'optional-lap' : ''}`} id={`stage-${s.id}`}>
          <div className="lap-body"><div className="lap-heading"><Link href={stageHref(s)} className="stage-sign"><small>{s.optional ? '선택 심화' : `${numberOf(s)}단계`} · {s.level}</small><h2>{s.title}</h2><span className="stage-sign-direction"><ArrowIcon className="stage-sign-arrow" /></span></Link>
            <p className="stage-goal"><span>이 구간의 목표</span>{s.goal}</p>
            <p className="stage-summary">{s.summary}</p>
            <div className="stage-progress"><span className={`signal ${stageDone === s.chapters.length ? 'complete' : stageDone ? 'started' : ''}`} aria-hidden="true" /><span>{stageDone === s.chapters.length ? '학습 완료' : stageDone ? '학습 중' : '시작 전'}</span>{isNext && <span className="current-destination">현재 목적지</span>}<span>{stageDone}/{s.chapters.length}</span></div>
          </div><ol className="stops">{chapters.map((c) => {
            const learned = completed.includes(chapterKey(s, c));
            return <li key={c.id}><Link href={lessonHref(s, c)}><span className={`stop-number ${learned ? 'learned' : ''}`}>{learned ? '✓' : s.chapters.indexOf(c) + 1}</span><span className="stop-title"><strong>{c.title}</strong><span>{c.topics.slice(0, 2).join(' · ')}</span></span><span className="stop-arrow" aria-hidden="true">›</span></Link></li>;
          })}</ol></div>
          <Link className="lap-more" href={stageHref(s)}>세부 목차와 실습 보기 <span aria-hidden="true"><ArrowIcon direction="up-right" /></span></Link>
        </section>;
      })}
      {view === 'road' && <ScrollCar trackRef={track} layoutKey={`${area}:${q}`} />}
    </div> : <div className="empty-result"><h2>일치하는 목차가 없습니다</h2><p>검색어를 짧게 바꾸거나 학습 영역을 전체로 선택해 보세요.</p><button onClick={() => { setQuery(''); setArea('전체'); input.current?.focus(); }}>검색 초기화</button></div>}
    <footer className="road-footer"><div className="finish-sign">도착 <strong>직접 만든 서비스</strong></div><p>설명할 수 있고, 구현할 수 있고, 운영할 수 있도록.</p><Link href="/notes">잠깐 쉬어가는 보충 지식 <CoffeeEmoji /></Link><small>진도는 이 브라우저에 저장됩니다. 선택 심화는 기본 진도에 포함되지 않습니다.</small></footer>
  </div>;
}
