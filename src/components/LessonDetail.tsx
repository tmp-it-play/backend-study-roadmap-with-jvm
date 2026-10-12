import Link from 'next/link';
import { stages, chapterKey, lessonHref, numberOf, stageHref, relatedNotes, type Stage, type Chapter } from '@/lib/curriculum';
import type { Lesson } from '@/lib/lesson-types';
import CodeExample from './CodeExample';
import LessonProgress from './LessonProgress';

export default function LessonDetail({ stage, chapter, lesson }: { stage: Stage; chapter: Chapter; lesson: Lesson }) {
  const all = stages.flatMap((s) => s.chapters.map((c) => ({ stage: s, chapter: c })));
  const index = all.findIndex((item) => item.stage.id === stage.id && item.chapter.id === chapter.id);
  const previous = all[index - 1];
  const next = all[index + 1];
  const chapterNumber = stage.chapters.findIndex((c) => c.id === chapter.id) + 1;
  const related = relatedNotes(stage);
  return <div className="detail-page lesson-page">
    <header className="detail-hero">
      <Link className="breadcrumb" href={stageHref(stage)}>로드맵 / {stage.title}</Link>
      <p className="detail-level">{numberOf(stage)}.{String(chapterNumber).padStart(2, '0')} · {stage.level}</p>
      <h1>{chapter.title}</h1><p>{lesson.goal}</p>
      <div className="detail-meta"><span>개념 {lesson.sections.length}개</span><span>예제 · 실습 · 해설</span><span>{stage.optional ? '선택 심화' : '기본 과정'}</span></div>
    </header>
    <div className="detail-layout"><article className="study-paper lesson-paper">
      <p className="lesson-intro">{lesson.intro}</p>
      <section className="lesson-prerequisites"><h2>읽기 전에</h2><p>이전 단원의 용어가 익숙하지 않다면 <Link href={stageHref(stage)}>단계별 목차와 선수 지식</Link>을 확인하세요. 예제는 각 단원의 동작을 설명하는 코드 조각입니다. 필요한 클래스·의존성·실행 환경은 설명과 <Link href="/stages/getting-started">개발 환경 과정</Link>을 함께 확인합니다.</p></section>
      {lesson.sections.map((body, i) => <section className="lesson-section" id={`concept-${i + 1}`} key={chapter.topics[i]}><h2><span>{i + 1}.</span> {chapter.topics[i]}</h2><p>{body}</p></section>)}
      <section id="example" className="lesson-section"><h2>예제로 확인하기</h2><CodeExample examples={lesson.examples} /><p>{lesson.explanation}</p></section>
      <section id="exercise" className="lab-panel"><span className="callout-label">직접 확인할 것</span><h2>실습</h2><ol>{lesson.exercise.steps.map((step) => <li key={step}>{step}</li>)}</ol><h3>기대 결과</h3><p>{lesson.exercise.expected}</p><Link className="chapter-read" href={`/practice#lab-${stage.id}`}>실행 프로젝트와 브라우저 실습 →</Link></section>
      <section id="pitfalls" className="lesson-section lesson-pitfall"><h2>흔한 오류</h2>{lesson.pitfalls.map((pitfall) => <p key={pitfall}>{pitfall}</p>)}</section>
      <section id="quiz" className="lesson-section"><h2>셀프 체크</h2>{lesson.quiz.map((item, i) => <div className="lesson-question" key={item.question}><h3>{i + 1}. {item.question}</h3><details><summary>해설 확인</summary><p>{item.answer}</p></details></div>)}</section>
      <LessonProgress chapterKey={chapterKey(stage, chapter)} />
      {related.length > 0 && <section id="related" className="lesson-section"><h2>함께 읽을 보충 지식</h2><div className="lesson-related">{related.map((note) => <Link href={`/notes/#${note.id}`} key={note.id}>{note.title} ↗</Link>)}</div></section>}
      <section id="sources" className="sources"><h2>공식 문서에서 더 읽기</h2><ul>{lesson.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul></section>
      <nav className="stage-pager" aria-label="이전 다음 단원">
        {previous ? <Link href={lessonHref(previous.stage, previous.chapter)}><small>이전 단원</small><strong>← {previous.chapter.title}</strong></Link> : <Link href={stageHref(stage)}><small>현재 구간</small><strong>← 단계 목차</strong></Link>}
        {next ? <Link href={lessonHref(next.stage, next.chapter)}><small>{next.stage.optional && !stage.optional ? '선택 심화로 이어가기' : '다음 단원'}</small><strong>{next.chapter.title} →</strong></Link> : <Link href="/"><small>전체 경로</small><strong>로드맵 →</strong></Link>}
      </nav>
    </article><aside className="page-toc"><p>이 단원에서</p>{chapter.topics.map((topic, i) => <a href={`#concept-${i + 1}`} key={topic}>{i + 1}. {topic}</a>)}<a href="#example">예제로 확인하기</a><a href="#exercise">실습과 기대 결과</a><a href="#pitfalls">흔한 오류</a><a href="#quiz">셀프 체크</a>{related.length > 0 && <a href="#related">보충 지식</a>}<a href="#sources">공식 문서</a></aside></div>
  </div>;
}
