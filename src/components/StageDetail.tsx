'use client';

import Link from 'next/link';
import { stages, chapterKey, lessonHref, numberOf, relatedNotes, stageHref, type Stage } from '@/lib/curriculum';
import { useLearning } from './LearningProvider';
import NoteCard from './NoteCard';

export default function StageDetail({ stage }: { stage: Stage }) {
  const { completed, toggle, ready } = useLearning();
  const index = stages.findIndex((s) => s.id === stage.id);
  const done = stage.chapters.filter((c) => completed.includes(chapterKey(stage, c))).length;
  const related = relatedNotes(stage);
  return <div className="detail-page">
    <header className="detail-hero"><Link href="/" className="breadcrumb">로드맵 / {stage.optional ? '선택 심화' : `${numberOf(stage)}단계`}</Link>
      <p className="detail-level">{stage.area} · {stage.level}</p><h1>{stage.title}</h1><p>{stage.summary}</p>
      <div className="detail-meta"><span>학습 단위 {stage.chapters.length}개</span><span>보충 설명 {related.length}개</span><span>{done}/{stage.chapters.length} 완료</span></div>
    </header>
    <div className="detail-layout"><article className="study-paper">
      <section className="goal-panel" aria-label="학습 목표"><span className="callout-label">이 구간의 목표</span><p>{stage.goal}</p></section>
      <div className="prerequisites"><strong>먼저 알아두면 좋아요</strong><div>
        {stage.prerequisites.length ? stage.prerequisites.map((id) => { const s = stages.find((s) => s.id === id)!; return <Link key={id} href={stageHref(s)}>{s.title}</Link>; }) : <span>처음 시작해도 괜찮습니다.</span>}
        {stage.anyPrerequisites && <span className="either-prerequisite">언어 기초: {stage.anyPrerequisites.map((id, i) => <span key={id}>{i > 0 && ' 또는 '}<Link href={`/stages/${id}`}>{stages.find((s) => s.id === id)!.title}</Link></span>)}</span>}
      </div></div>
      <section id="outline"><div className="section-heading"><h2>상세 학습 목차</h2><span>{stage.chapters.length}개 학습 단위</span></div><p className="outline-intro">각 단원에서 개념과 예제를 읽고 실습의 기대 결과를 확인하세요. 셀프 체크 해설까지 검토한 뒤 학습 완료를 표시할 수 있습니다.</p>
        <div className="chapters">{stage.chapters.map((chapter, i) => {
          const key = chapterKey(stage, chapter); const learned = completed.includes(key);
          return <section id={chapter.id} key={chapter.id} className={`chapter ${learned ? 'chapter-complete' : ''}`}>
            <div className="chapter-heading"><span>{numberOf(stage)}.{String(i + 1).padStart(2, '0')}</span><h3><Link href={lessonHref(stage, chapter)}>{chapter.title}</Link></h3></div>
            <ul>{chapter.topics.map((t) => <li key={t}>{t}</li>)}</ul>
            <Link className="chapter-read" href={lessonHref(stage, chapter)}>본문 · 예제 · 실습 읽기 <span aria-hidden="true">→</span></Link>
            <label className="chapter-check"><input type="checkbox" checked={learned} disabled={!ready} onChange={() => toggle(key)} /><span>{learned ? '학습 완료' : '학습 완료 표시'}</span><span className="check-description">스스로 설명할 수 있나요?</span></label>
          </section>;
        })}</div>
      </section>
      <section className="lab-panel" id="practice"><span className="callout-label">직접 만들어 보기</span><h2>이번 구간의 실습</h2><p>{stage.lab}</p><Link className="chapter-read" href={`/practice#lab-${stage.id}`}>실습 코드와 실행 안내 →</Link><span className="project-tag">공통 프로젝트: 회원 · 상품 · 주문 · 재고</span></section>
      <section className="completion-section" id="checkpoint"><h2>다음 단계로 가기 전</h2><p>코드, 테스트 결과 또는 짧은 설명으로 확인해 보세요.</p><ul>{stage.checks.map((check) => <li key={check}><span aria-hidden="true">✓</span>{check}</li>)}</ul></section>
      {related.length > 0 && <section className="related-notes" id="side-notes"><div className="section-heading"><h2>잠깐, 이것도 알아두세요</h2><Link href="/notes">전체 보충 지식 ↗</Link></div>{related.map((note) => <NoteCard key={note.id} note={note} anchorId={`note-${note.id}`} />)}</section>}
      <section className="sources" id="sources"><h2>공식 문서에서 더 읽기</h2><ul>{stage.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul><p>예제 코드를 실행할 때는 사용하는 JDK·Kotlin·Spring Boot 버전의 문서를 확인하세요.</p></section>
      <nav className="stage-pager" aria-label="이전 다음 단계">{index > 0 ? <Link href={stageHref(stages[index - 1])}><small>이전 구간</small><strong>← {stages[index - 1].title}</strong></Link> : <Link href="/"><small>전체 경로</small><strong>← 로드맵</strong></Link>}
        {index < stages.length - 1 ? <Link href={stageHref(stages[index + 1])}><small>다음 구간</small><strong>{stages[index + 1].title} →</strong></Link> : <Link href="/"><small>돌아가기</small><strong>전체 로드맵 →</strong></Link>}
      </nav>
    </article><aside className="page-toc"><p>이번 구간 안내</p><a href="#outline">상세 학습 목차</a>{stage.chapters.map((chapter, i) => <a className="toc-chapter" key={chapter.id} href={`#${chapter.id}`}>{i + 1}. {chapter.title}</a>)}<a href="#practice">직접 만들어 보기</a><a href="#checkpoint">완료 기준</a>{related.length > 0 && <a href="#side-notes">보충 지식</a>}<a href="#sources">공식 문서</a></aside></div>
  </div>;
}
