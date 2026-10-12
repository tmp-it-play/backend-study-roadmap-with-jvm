import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function renderRoadmap(curriculum, notes) {
  const stages = curriculum.stages;
  const name = (id) => stages.find((s) => s.id === id)?.title ?? id;
  const core = stages.filter((s) => !s.optional);
  const chapterCount = stages.reduce((n, s) => n + s.chapters.length, 0);
  const lines = [
    '# JVM 백엔드 전체 로드맵과 상세 목차', '',
    'Java와 Kotlin, JVM 실행 원리, Spring Boot 개발과 운영을 연결하는 학습 과정입니다. 기본 문법을 처음 배우는 사람은 준비 단계에서 출발하고, 한 언어를 이미 아는 사람은 해당 언어의 완료 기준을 확인한 뒤 공통 과정으로 합류합니다.', '',
    `기본 ${core.length}단계와 선택 심화 ${stages.length - core.length}구간, 학습 단위 ${chapterCount}개, 보충 설명 ${notes.length}개로 구성합니다. 아래 목록은 집필할 학습 단위의 상세 설계이며 전체 강의 본문이나 실행 예제의 완성을 뜻하지 않습니다.`, '',
    '## 학습 경로', '',
    '- 처음 시작: 개발 환경 → Java → Kotlin → JVM → HTTP·SQL → Spring 공통 과정.',
    '- Java 경험자: 개발 환경 확인 → Kotlin → JVM 상호운용 → Spring 공통 과정. Java의 동등성·제네릭·Stream은 진단 문제로 점검합니다.',
    '- Kotlin 경험자: 개발 환경 확인 → Java의 객체·제네릭·예외·Stream을 비교 학습 → JVM 상호운용 → Spring 공통 과정.',
    '- Spring 경험자: 단계별 완료 기준으로 부족한 부분을 찾고 트랜잭션·테스트·동시성·운영을 우선 보강합니다.',
    '- 테스트는 첫 단계부터 작성합니다. 테스트 전략 단계는 앞서 작성한 테스트를 체계화하는 구간입니다.',
    '- 선택 심화는 기본 과정의 완료율에 포함하지 않습니다. 기술을 선택한 이유와 운영 비용을 설명할 수 있을 때 확장합니다.', '',
    '## 버전과 공통 실습', '',
    `- 설계 기준일: ${curriculum.reviewedAt}. 기준 후보는 Java ${curriculum.baseline.java}, Spring Boot ${curriculum.baseline.springBoot}, Gradle ${curriculum.baseline.gradle}입니다.`,
    '- Kotlin 컴파일러·플러그인 버전은 선택한 Boot 및 Gradle의 호환 조합으로 고정하고 예제 CI에서 검증합니다. Preview 기능은 별도 표시합니다.',
    '- Gradle Kotlin DSL을 기본 예제에 사용하며 Groovy DSL의 같은 설정을 비교합니다. Maven은 개념 대응과 기존 프로젝트 읽기에 필요한 범위를 다룹니다.',
    '- 공통 프로젝트는 회원·상품·주문·재고입니다. 순수 언어 구현 → 메모리 REST API → PostgreSQL·트랜잭션 → 접근 제어 → 동시 주문 → 배포·운영 순으로 확장합니다.',
    '- Java와 Kotlin은 같은 요구사항·입출력·검증 기준을 공유합니다. 각 언어의 관용적인 구현과 상호운용상의 차이를 설명합니다.', '',
    '## 전체 단계', '',
    '| 단계 | 영역 | 학습 단위 | 목표 |', '| --- | --- | ---: | --- |',
    ...stages.map((s, i) => `| ${s.optional ? '' : `${String(i + 1).padStart(2, '0')} `}${s.title} | ${s.area} | ${s.chapters.length} | ${s.goal} |`), '',
    '## 문서 집필 기준', '',
    '각 학습 단위는 학습 목표 → 선수 지식 → 한눈에 보기 → 비유와 개념 → Java·Kotlin 코드 또는 설정 비교 → 관찰 가능한 실습 → 흔한 오류 → 셀프 체크와 해설 → 공식 출처 순서로 집필합니다. 언어별 차이가 없는 설명은 공통 본문을 사용합니다.', '',
    '보충 설명은 관련 단원의 옆에 연결하고 별도 색인에서도 찾을 수 있게 합니다. 어디서 만나는지, 핵심 차이, 짧은 예제, 흔한 오해를 1~3분 분량으로 설명합니다.', '',
    '실행 예제에는 JDK·Boot·Kotlin·Gradle 버전과 실행 명령을 명시합니다. 핵심 동작·실패·동시성 시나리오를 테스트로 검증하고, 브라우저 시뮬레이터는 실제 JVM 실행기와 구분합니다.', '',
    '## 단계별 상세 목차', '',
  ];
  for (const [index, stage] of stages.entries()) {
    lines.push(`### ${stage.optional ? '' : `${String(index + 1).padStart(2, '0')} `}${stage.title}`, '', stage.summary, '',
      `**목표:** ${stage.goal}`, '',
      `**선수 지식:** ${stage.prerequisites.map(name).join(', ') || '없음'}${stage.anyPrerequisites ? `; ${stage.anyPrerequisites.map(name).join(' 또는 ')} 중 한 과정의 기초` : ''}`, '');
    for (const [i, chapter] of stage.chapters.entries()) {
      lines.push(`#### ${index + 1}.${i + 1} ${chapter.title}`, '', ...chapter.topics.map((t) => `- ${t}`), '');
    }
    lines.push('**실습 산출물**', '', stage.lab, '', '**완료 기준**', '', ...stage.checks.map((c) => `- [ ] ${c}`), '');
    const related = notes.filter((n) => n.stages.includes(stage.id));
    if (related.length) lines.push('**함께 읽을 보충 지식**', '', ...related.map((n) => `- ${n.title}`), '');
    lines.push('**공식 참고 자료**', '', ...stage.sources.map((s) => `- [${s.title}](${s.url})`), '');
  }
  lines.push('## 보충 지식 색인', '');
  for (const note of notes) {
    lines.push(`### ${note.title}`, '', `연결 단계: ${note.stages.map(name).join(', ')}`, '', note.body, '', `**주의:** ${note.pitfall}`, '');
    if (note.code) for (const [label, code] of Object.entries(note.code)) {
      const lang = label.includes('Groovy') ? 'groovy' : label.includes('Kotlin') ? 'kotlin' : 'java';
      lines.push(label, '', '```' + lang, code, '```', '');
    }
    lines.push(`[공식 참고 자료](${note.source})`, '');
  }
  lines.push('## 시뮬레이터 제작 순서', '',
    '1. Bean 생성과 의존성 해결: 정상 주입·후보 중복·순환 의존성.',
    '2. MVC 요청 처리: 정상·검증 실패·인증 실패·도메인 예외.',
    '3. 트랜잭션과 프록시: 외부 호출·내부 호출·롤백·전파.',
    '4. 영속성 컨텍스트와 N+1: 조회·수정·flush·fetch 전략.',
    '5. 동시 재고 차감: 경쟁 상태·조건부 갱신·낙관적 락.', '',
    '## 버전 확인 자료', '',
    '- [Java 지원 로드맵](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)',
    '- [Spring Boot 시스템 요구사항](https://docs.spring.io/spring-boot/system-requirements.html)',
    '- [Gradle Java 호환성](https://docs.gradle.org/current/userguide/compatibility.html)',
    '- [Kotlin Gradle 설정](https://kotlinlang.org/docs/gradle-configure-project.html)', '',
  );
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const curriculum = JSON.parse(readFileSync('src/content/curriculum.json', 'utf8'));
  const notes = JSON.parse(readFileSync('src/content/notes.json', 'utf8'));
  mkdirSync('docs', { recursive: true });
  writeFileSync('docs/ROADMAP.md', renderRoadmap(curriculum, notes));
  console.log('docs/ROADMAP.md generated');
}
