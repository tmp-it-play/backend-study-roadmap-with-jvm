import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '@/components/Icons';
import PracticePlayground from '@/components/PracticePlayground';
import CodeBlock from '@/components/CodeBlock';
import practice from '@/content/practice.json';
import { stages } from '@/lib/curriculum';
export const metadata:Metadata={title:'직접 해보는 실습',description:'브라우저 실험과 Java·Kotlin·Spring Boot 실행 프로젝트'};
export default function PracticePage() {
  return <div className="detail-page practice-page">
    <header className="detail-hero"><Link className="breadcrumb" href="/">로드맵 / 실습</Link><p className="detail-level">예상하고, 실행하고, 비교하기</p><h1>직접 해보는 실습</h1><p>브라우저에서 동작을 살펴보고, 내 컴퓨터에서 같은 원리를 코드로 확인하세요.</p><div className="practice-links"><a href="#browser-labs">브라우저 실험 5개 ↓</a><a href="#projects">실행 프로젝트 ↓</a><a href="/downloads/jvm-labs.zip" download>실습 코드 내려받기</a></div></header>
    <div className="practice-content"><section id="browser-labs"><PracticePlayground/></section>
    <section id="projects" className="project-intro"><h2>내 컴퓨터에서 실행하기</h2><p>코드를 내려받아 압축을 풀고 jvm-labs 폴더에서 시작하세요. JDK 25가 필요하며 DB 실습에는 Docker, HTTP 요청 확인에는 Python 3도 사용합니다. Windows에서는 ./gradlew 대신 gradlew.bat를 실행합니다.</p><p>처음에는 jvm-core의 테스트, 다음에는 orders의 memory 모드, 그다음 PostgreSQL 순서로 진행합니다. 자세한 실행법은 압축 파일의 examples/README.md에 있습니다.</p>
    <a className="chapter-read" href="/downloads/jvm-labs.zip" download>Java·Kotlin·Spring Boot 실습 코드 내려받기 →</a></section>
    <nav className="practice-stage-index" aria-label="단계별 실습">{practice.map(l=><a href={'#lab-'+l.stage} key={l.stage}>{stages.find(s=>s.id===l.stage)!.title}</a>)}</nav>
    {practice.map(l=><section className="project-lab" id={'lab-'+l.stage} key={l.stage}><span className="callout-label">{stages.find(s=>s.id===l.stage)!.title}</span><h2>{l.title}</h2><p className="practice-requires">준비: {l.requires}</p><h3>시작</h3><CodeBlock code={l.command} label="시작 명령" /><h3>직접 바꿔 보기</h3><p>{l.task}</p><h3>기대 결과</h3><p>{l.expected}</p><h3>확인 명령</h3><CodeBlock code={l.verify} label="확인 명령" /><details><summary>살펴볼 파일</summary><ul>{l.files.map(file=><li key={file}><code>examples/{file}</code></li>)}</ul></details><div className="practice-links"><Link href={'/stages/'+l.stage}>관련 본문 읽기 <ArrowIcon direction="up-right" /></Link>{l.simulator&&<a href={'#'+l.simulator}>브라우저에서 먼저 해보기 ↑</a>}</div></section>)}
    </div>
  </div>;
}
