'use client';
import { useState } from 'react';
import { beanTrace, mvcTrace, transactionTrace, queryTrace, newStock, stockStep, type Trace } from '@/lib/practice-models';

function TracePlayer({trace}:{trace:Trace}) {
  const [step,setStep]=useState(0);
  return <div className="trace-player">
    <div className="practice-actions"><button onClick={()=>setStep(Math.min(trace.steps.length,step+1))} disabled={step===trace.steps.length}>다음 동작</button><button onClick={()=>setStep(trace.steps.length)} disabled={step===trace.steps.length}>끝까지 실행</button><button onClick={()=>setStep(0)} disabled={step===0}>처음으로</button><span>{step} / {trace.steps.length}</span></div>
    <ol className="trace-log" aria-live="polite">{trace.steps.slice(0,step).map((line,i)=><li key={i}><span>{i+1}</span>{line}</li>)}</ol>
    {step===0&&<p className="trace-idle">결과를 예상한 뒤 다음 동작을 눌러 보세요.</p>}
    {step===trace.steps.length&&<div className="trace-result" role="status"><strong>{trace.result}</strong><p>{trace.why}</p></div>}
  </div>;
}
const experiments=[
  {id:'beans',title:'01. Bean을 고르는 과정',question:'같은 타입의 Bean이 두 개라면 무엇을 주입할까요?',options:[['single','후보 하나'],['ambiguous','후보 둘'],['cycle','생성자 순환'],['prototype','prototype 조회']],trace:beanTrace,href:'/stages/spring-core/ioc-di'},
  {id:'request',title:'02. 주문 요청의 이동 경로',question:'어느 계층에서 요청이 멈추는지 예상해 보세요.',options:[['ok','정상 주문'],['anonymous','로그인 없음'],['csrf','CSRF 토큰 없음'],['invalid','수량 0'],['missing','없는 상품'],['stock','재고 부족']],trace:mvcTrace,href:'/stages/spring-mvc/request-flow'},
  {id:'transaction',title:'03. 예외 뒤에 남는 데이터',question:'예외가 나면 이미 실행한 SQL도 항상 취소될까요?',options:[['runtime','외부 호출 · 런타임 예외'],['self','내부 호출 · 외부 트랜잭션 없음'],['checked','checked 예외 · 기본 설정'],['required','REQUIRED · 내부 예외 catch'],['new','REQUIRES_NEW · 감사 기록']],trace:transactionTrace,href:'/stages/persistence/transaction-boundary'}
];
function Scenario({experiment}:{experiment:typeof experiments[number]}) {
  const [mode,setMode]=useState(experiment.options[0][0]);
  return <section className="experiment" id={experiment.id}><div className="experiment-heading"><h2>{experiment.title}</h2><a href={experiment.href}>본문 읽기 ↗</a></div><p>{experiment.question}</p>
    <label className="practice-field">실행 조건<select value={mode} onChange={e=>setMode(e.target.value)} aria-label={experiment.title+' 실행 조건'}>{experiment.options.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
    <TracePlayer key={mode} trace={experiment.trace(mode)}/>
  </section>;
}
function Queries() {
  const [count,setCount]=useState(3); const [fetch,setFetch]=useState(false);
  return <section className="experiment" id="queries"><div className="experiment-heading"><h2>04. 목록 조회와 N+1</h2><a href="/stages/persistence/fetching">본문 읽기 ↗</a></div><p>서로 다른 상품을 주문한 목록입니다. 상품 이름을 모두 읽을 때 SQL은 몇 번 실행될까요?</p>
    <div className="practice-fields"><label className="practice-field">주문 수: {count}<input type="range" min={1} max={12} value={count} onChange={e=>setCount(Number(e.target.value))}/></label>
    <label className="practice-field">조회 전략<select value={String(fetch)} onChange={e=>setFetch(e.target.value==='true')}><option value="false">지연 로딩</option><option value="true">fetch join</option></select></label></div>
    <TracePlayer key={count+String(fetch)} trace={queryTrace(count,fetch)}/>
  </section>;
}
function Stock() {
  const [atomic,setAtomic]=useState(false); const [state,setState]=useState(newStock);
  return <section className="experiment" id="stock"><div className="experiment-heading"><h2>05. 마지막 재고 1개</h2><a href="/stages/concurrency/thread-safety">본문 읽기 ↗</a></div>
    <p>{atomic ? 'A와 B 중 먼저 주문한 요청의 검사와 차감이 끝난 뒤 다음 요청이 실행됩니다. 순서를 바꿔 결과를 비교하세요.' : 'A와 B가 같은 상품을 주문합니다. A 읽기 → B 읽기 → A 쓰기 → B 쓰기 순서로 실행해 보세요.'}</p>
    <label className="practice-field">차감 방식<select value={String(atomic)} onChange={e=>{setAtomic(e.target.value==='true');setState(newStock());}}><option value="false">읽고 나중에 쓰기</option><option value="true">조건 검사와 차감을 원자적으로</option></select></label>
    <div className="stock-board" aria-live="polite"><div><span>남은 재고</span><strong>{state.stock}</strong></div><div><span>성공한 주문</span><strong>{state.sold}</strong></div><div><span>판매할 수 있는 수량</span><strong>1</strong></div></div>
    <div className="practice-actions">{(['A','B'] as const).map(actor=><button key={actor} disabled={state.done.includes(actor)} onClick={()=>setState(s=>stockStep(s,actor,atomic))}>{actor} {atomic?'주문':state.reads[actor]===undefined?'읽기':'쓰기'}</button>)}<button onClick={()=>setState(newStock())}>재고 초기화</button></div>
    <ol className="trace-log" aria-live="polite">{state.log.map((line,i)=><li key={i}><span>{i+1}</span>{line}</li>)}</ol>
    {state.done.length===2&&<div className={'trace-result '+(state.sold>1?'trace-failure':'')} role="status"><strong>{state.sold>1?'초과 판매: 재고 1개에 주문 2개 성공':'재고 범위 안에서 주문 처리'}</strong><p>{atomic?'실행 프로젝트는 DB 행 락으로 최신 재고를 읽고 차감합니다. 조건부 UPDATE도 비교할 수 있습니다.':'잔량이 0이어도 판매가 정확하다는 뜻은 아닙니다. 두 요청이 같은 옛값을 읽었는지 살펴보세요.'}</p></div>}
  </section>;
}
export default function PracticePlayground() {
  return <div className="playgrounds"><p className="practice-scope">브라우저에서는 동작 순서를 단순화한 모형을 실험합니다. 실제 JVM·Spring·PostgreSQL의 동작은 아래 실행 프로젝트에서 확인하세요.</p>{experiments.map(e=><Scenario key={e.id} experiment={e}/>)}<Queries/><Stock/></div>;
}
