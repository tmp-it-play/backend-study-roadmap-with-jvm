# JVM 백엔드 학습 로드맵

Java·Kotlin 기본기부터 JVM, Spring Boot, 데이터베이스, 테스트와 운영까지 이어지는 한국어 학습 로드맵입니다. 도로와 표지판을 따라 전체 과정을 탐색하고, 단계별 세부 목차·실습·완료 기준을 확인할 수 있습니다.

## 학습 구성

- 기본 15단계와 선택 심화 1구간
- 학습 단위 110개와 세부 주제 440개
- Groovy DSL·Kotlin DSL 등 바로 읽을 수 있는 보충 설명 32개
- 하나의 주문·재고 프로젝트로 연결하는 단계별 실습과 완료 기준
- 목차·보충 지식 검색, 도로·목록 보기, 브라우저에 저장하는 학습 진도

전체 설계는 [상세 로드맵](docs/ROADMAP.md), 화면의 방향과 구현 범위는 [화면 설계](docs/DESIGN.md)를 참고하세요. 현재 학습 단위는 **상세 목차**이며, 110개 강의 본문과 Spring 실행 예제 및 시뮬레이터는 후속 집필 대상입니다. 보충 설명 32개는 본문과 공식 참고 링크를 포함합니다.

## 로컬 실행

Node.js 22 이상이 필요합니다. 검증 환경은 Node.js 24입니다.

```sh
npm ci
npm run dev
```

기본 주소는 http://127.0.0.1:3000 입니다.

```sh
npm run typecheck
npm run check:content
npm run build
```

사이트는 Next.js 정적 내보내기를 사용합니다. 빌드 결과는 `out/`에 생성되며, 임의의 정적 호스팅에서 제공할 수 있습니다. 정적 결과를 로컬에서 확인하려면 다음 명령을 사용합니다.

```sh
npm start
```

포트를 바꾸려면 `PORT=3100 npm start`를 사용합니다. 페이지를 직접 열거나 새로고침할 수 있도록 각 경로는 디렉터리의 `index.html`로 내보냅니다.

`next start`는 정적 내보내기 배포에 사용하지 않습니다. 외부 서비스 배포나 Git push는 수행하지 않았습니다.

## 콘텐츠 수정

| 파일 | 역할 |
| --- | --- |
| `src/content/curriculum.json` | 학습 순서, 선수 지식, 상세 목차, 실습, 완료 기준, 공식 출처 |
| `src/content/notes.json` | 보충 설명, 주의점, 비교 예제, 관련 단계 |
| `src/components/` | 로드맵, 단계 상세, 보충 지식, 탐색과 진도 |
| `src/app/globals.css` | 도로 테마와 반응형 레이아웃 |
| `scripts/generate-roadmap.mjs` | 같은 콘텐츠에서 전체 목차 문서 생성 |
| `scripts/check-content.mjs` | ID·참조·선수 지식 순환·문서 동기화 검증 |

콘텐츠를 수정한 뒤 문서를 갱신합니다.

```sh
npm run docs
npm run check:content
```

단계와 학습 단위의 ID는 링크·진도 저장에 사용하므로 안정적으로 유지합니다. 진도는 계정 없이 현재 브라우저의 `jvm-roadmap:learned:v1`에 저장합니다. 선택 심화의 진행은 기본 과정 104개 학습 단위의 완료율에 포함하지 않습니다.

## 참고한 프로젝트

[tmp-it-play/backend-study-roadmap-with-nest](https://github.com/tmp-it-play/backend-study-roadmap-with-nest/tree/246353e98b5db66b004fc7e5e0cc34449078c768)의 하늘·도시·도로 표지판 스타일과 학습 방식에서 출발했습니다. `src/lib/scenery.ts`는 해당 커밋의 SVG 일러스트 생성기를 활용합니다. 커리큘럼, 보충 설명, 탐색 및 진도 상태 구현은 JVM 과정에 맞게 새로 작성했습니다.

사이트 도구의 버전과 학습 예제의 JVM 버전은 별개입니다. 학습 예제의 기준 후보와 공식 호환성 자료는 [상세 로드맵](docs/ROADMAP.md)에 기록합니다.
