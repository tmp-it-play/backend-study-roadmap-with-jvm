# JVM 백엔드 전체 로드맵과 상세 목차

Java와 Kotlin, JVM 실행 원리, Spring Boot 개발과 운영을 연결하는 학습 과정입니다. 기본 문법을 처음 배우는 사람은 준비 단계에서 출발하고, 한 언어를 이미 아는 사람은 해당 언어의 완료 기준을 확인한 뒤 공통 과정으로 합류합니다.

기본 15단계와 선택 심화 1구간, 학습 단위 110개, 보충 설명 32개로 구성합니다. 아래 목록은 집필할 학습 단위의 상세 설계이며 전체 강의 본문이나 실행 예제의 완성을 뜻하지 않습니다.

## 학습 경로

- 처음 시작: 개발 환경 → Java → Kotlin → JVM → HTTP·SQL → Spring 공통 과정.
- Java 경험자: 개발 환경 확인 → Kotlin → JVM 상호운용 → Spring 공통 과정. Java의 동등성·제네릭·Stream은 진단 문제로 점검합니다.
- Kotlin 경험자: 개발 환경 확인 → Java의 객체·제네릭·예외·Stream을 비교 학습 → JVM 상호운용 → Spring 공통 과정.
- Spring 경험자: 단계별 완료 기준으로 부족한 부분을 찾고 트랜잭션·테스트·동시성·운영을 우선 보강합니다.
- 테스트는 첫 단계부터 작성합니다. 테스트 전략 단계는 앞서 작성한 테스트를 체계화하는 구간입니다.
- 선택 심화는 기본 과정의 완료율에 포함하지 않습니다. 기술을 선택한 이유와 운영 비용을 설명할 수 있을 때 확장합니다.

## 버전과 공통 실습

- 설계 기준일: 2026-10-12. 기준 후보는 Java 25 LTS, Spring Boot 4.1.x, Gradle 9.1 이상입니다.
- Kotlin 컴파일러·플러그인 버전은 선택한 Boot 및 Gradle의 호환 조합으로 고정하고 예제 CI에서 검증합니다. Preview 기능은 별도 표시합니다.
- Gradle Kotlin DSL을 기본 예제에 사용하며 Groovy DSL의 같은 설정을 비교합니다. Maven은 개념 대응과 기존 프로젝트 읽기에 필요한 범위를 다룹니다.
- 공통 프로젝트는 회원·상품·주문·재고입니다. 순수 언어 구현 → 메모리 REST API → PostgreSQL·트랜잭션 → 접근 제어 → 동시 주문 → 배포·운영 순으로 확장합니다.
- Java와 Kotlin은 같은 요구사항·입출력·검증 기준을 공유합니다. 각 언어의 관용적인 구현과 상호운용상의 차이를 설명합니다.

## 전체 단계

| 단계 | 영역 | 학습 단위 | 목표 |
| --- | --- | ---: | --- |
| 01 개발 환경과 빌드 도구 | 준비 | 6 | 명령 한 번으로 빌드하고 테스트할 수 있다. |
| 02 Java 기본기 | 언어 | 8 | 컬렉션과 객체를 이용해 주문 규칙을 구현한다. |
| 03 Kotlin 기본기 | 언어 | 8 | Kotlin의 타입 체계를 활용해 주문 규칙을 구현한다. |
| 04 JVM과 언어 상호운용 | JVM | 7 | 메모리·타입·호출 문제를 JVM 관점에서 설명한다. |
| 05 HTTP와 웹의 기본 | 백엔드 기초 | 6 | HTTP의 의미에 맞게 API 계약을 작성한다. |
| 06 SQL과 데이터베이스 | 백엔드 기초 | 7 | 정합성과 조회 요구사항에 맞는 스키마를 설계한다. |
| 07 Spring의 핵심 원리 | Spring | 7 | Bean과 프록시의 동작을 코드로 설명한다. |
| 08 Spring Boot와 애플리케이션 구성 | Spring | 6 | 자동 구성의 근거와 설정값의 출처를 찾는다. |
| 09 Spring MVC와 API 구현 | Spring | 7 | 검증과 오류 처리가 일관된 주문 API를 만든다. |
| 10 JPA와 트랜잭션 | 데이터 | 9 | 정합성과 쿼리 성능을 검증하는 영속 계층을 만든다. |
| 11 Spring Security와 접근 제어 | 보안 | 6 | 사용자와 권한에 따라 주문 접근을 제어한다. |
| 12 테스트 전략과 품질 | 검증 | 6 | 실패 원인을 구분할 수 있는 테스트 구성을 만든다. |
| 13 동시성 그리고 성능 | JVM | 7 | 병목의 근거를 수집한 뒤 개선 효과를 검증한다. |
| 14 배포와 운영 | 운영 | 7 | 서비스의 배포·관찰·복구 절차를 실행한다. |
| 15 설계와 종합 프로젝트 | 설계 | 7 | 주문 서비스의 설계·검증·운영 근거를 제시한다. |
| 선택 심화 과정 | 확장 | 6 | 필요한 기술을 골라 작은 실험으로 적용 여부를 판단한다. |

## 문서 집필 기준

각 학습 단위는 학습 목표 → 선수 지식 → 한눈에 보기 → 비유와 개념 → Java·Kotlin 코드 또는 설정 비교 → 관찰 가능한 실습 → 흔한 오류 → 셀프 체크와 해설 → 공식 출처 순서로 집필합니다. 언어별 차이가 없는 설명은 공통 본문을 사용합니다.

보충 설명은 관련 단원의 옆에 연결하고 별도 색인에서도 찾을 수 있게 합니다. 어디서 만나는지, 핵심 차이, 짧은 예제, 흔한 오해를 1~3분 분량으로 설명합니다.

실행 예제에는 JDK·Boot·Kotlin·Gradle 버전과 실행 명령을 명시합니다. 핵심 동작·실패·동시성 시나리오를 테스트로 검증하고, 브라우저 시뮬레이터는 실제 JVM 실행기와 구분합니다.

## 단계별 상세 목차

### 01 개발 환경과 빌드 도구

내 컴퓨터에서 시작해 누구나 같은 방식으로 실행할 수 있는 프로젝트를 만듭니다.

**목표:** 명령 한 번으로 빌드하고 테스트할 수 있다.

**선수 지식:** 없음

#### 1.1 JDK와 개발 환경

- JDK·JRE·JVM의 역할
- JDK 배포판과 LTS 선택
- JAVA_HOME과 PATH
- IDE SDK·Gradle JVM·Java Toolchain 구분

#### 1.2 터미널과 Git

- 경로·환경 변수·프로세스 확인
- 커밋·브랜치·PR의 기본 흐름
- gitignore와 비밀 정보 관리
- 실행 방법을 README로 남기기

#### 1.3 Gradle 프로젝트의 구조

- Wrapper와 버전 고정
- settings 파일과 build 파일
- Project·Task·Plugin의 관계
- 초기화·구성·실행 단계

#### 1.4 Groovy DSL과 Kotlin DSL

- build.gradle과 build.gradle.kts 비교
- Groovy의 클로저·문자열·괄호 생략
- Kotlin의 수신 객체 람다·타입 접근자
- 같은 플러그인·의존성·태스크를 두 DSL로 작성

#### 1.5 의존성과 플러그인

- 저장소와 의존성 좌표
- implementation·api·compileOnly·runtimeOnly
- 전이 의존성과 충돌 확인
- BOM·Version Catalog·플러그인 버전의 역할

#### 1.6 첫 빌드와 첫 테스트

- Java·Kotlin 소스 디렉터리
- Gradle test와 JUnit Jupiter
- 컴파일·테스트·패키징 구분
- Maven의 pom.xml과 주요 개념 비교

**실습 산출물**

Java와 Kotlin으로 각각 인사말 함수를 만들고 테스트한다. 동일한 빌드를 두 DSL로 표현하고 Wrapper를 통해 실행한다.

**완료 기준**

- [ ] IDE 없이 ./gradlew test를 실행할 수 있다.
- [ ] 애플리케이션 언어와 Gradle DSL 선택이 독립적임을 설명한다.

**함께 읽을 보충 지식**

- JDK, JRE, JVM은 무엇이 다를까
- Groovy DSL과 Kotlin DSL
- settings 파일과 build 파일
- gradle과 gradlew의 차이
- implementation, api, runtimeOnly
- BOM과 Version Catalog
- IDE에서는 되는데 터미널에서는 안 될 때
- Maven과 Gradle

**공식 참고 자료**

- [Gradle 사용자 가이드](https://docs.gradle.org/current/userguide/userguide.html)
- [Gradle Kotlin DSL](https://docs.gradle.org/current/userguide/kotlin_dsl.html)

### 02 Java 기본기

객체와 타입을 이해하고 테스트 가능한 작은 도메인을 구현합니다.

**목표:** 컬렉션과 객체를 이용해 주문 규칙을 구현한다.

**선수 지식:** 개발 환경과 빌드 도구

#### 2.1 값과 타입

- 기본형·참조형·박싱
- 변수·스코프·형 변환
- 조건·반복·switch 표현식
- 문자열·배열과 null

#### 2.2 클래스와 객체지향

- 생성자·접근 제어·캡슐화
- 인터페이스·추상 클래스
- 상속과 합성의 선택
- static·final과 객체 수명

#### 2.3 동등성과 불변성

- ==와 equals
- equals·hashCode 계약
- 가변 객체를 Map 키로 사용할 때의 문제
- 방어적 복사와 불변 객체

#### 2.4 컬렉션과 제네릭

- List·Set·Map 구현과 선택
- 제네릭·타입 소거
- 와일드카드와 PECS
- Comparable·Comparator

#### 2.5 예외와 자원 관리

- checked·unchecked 예외
- 예외 전환과 원인 보존
- try-with-resources
- 파일·문자 인코딩·시간 API

#### 2.6 람다와 Stream

- 함수형 인터페이스·메서드 참조
- 중간·최종 연산과 지연 평가
- map·flatMap·collect
- 부수 효과·Optional·parallelStream 주의점

#### 2.7 현대 Java의 데이터 모델링

- record의 용도와 제한
- sealed 계층과 패턴 매칭
- enum과 상태 모델
- 언어 기능의 도입 버전과 preview 구분

#### 2.8 작은 설계와 테스트

- 책임을 나누는 기준
- 의존성을 생성자로 전달
- 경계값·예외 테스트
- 가격·수량·주문 상태를 값으로 표현

**실습 산출물**

순수 Java 주문 프로그램을 만든다. 장바구니 합계·할인·주문 취소를 테스트하고 저장소를 인터페이스로 분리한다.

**완료 기준**

- [ ] equals와 hashCode가 어긋나는 실패를 재현한다.
- [ ] Spring 없이 주문 규칙을 단위 테스트한다.

**함께 읽을 보충 지식**

- Java와 Kotlin에서 ==의 의미
- val은 객체까지 불변으로 만들까
- Java record와 Kotlin data class

**공식 참고 자료**

- [Java 공식 학습 자료](https://dev.java/learn/)

### 03 Kotlin 기본기

간결한 문법에 숨은 타입·상태·호출 규칙을 이해합니다.

**목표:** Kotlin의 타입 체계를 활용해 주문 규칙을 구현한다.

**선수 지식:** 개발 환경과 빌드 도구

#### 3.1 변수와 제어 흐름

- val·var와 타입 추론
- if·when 표현식
- 범위·반복·문자열 템플릿
- Any·Unit·Nothing

#### 3.2 null 안전성과 타입 좁히기

- nullable 타입·safe call·Elvis
- 스마트 캐스트와 안정적인 참조
- !!와 오류 처리
- 플랫폼 타입을 만날 때의 경계 검증

#### 3.3 함수와 람다

- 기본값·이름 있는 인자
- 고차 함수·후행 람다
- 확장 함수의 정적 해석
- 수신 객체 람다로 DSL 읽기

#### 3.4 클래스와 프로퍼티

- 주 생성자·init·보조 생성자
- 프로퍼티·접근자·backing field
- interface·open·override
- object·companion object

#### 3.5 데이터와 상태 모델링

- data class와 copy의 범위
- sealed class·interface와 when
- enum·value class의 용도
- 구조 분해와 동등성

#### 3.6 컬렉션과 제네릭

- 읽기 전용·가변 컬렉션
- 컬렉션 연산과 Sequence
- in·out·star projection
- inline·reified 기초

#### 3.7 Kotlin다운 코드와 함정

- let·run·with·apply·also 선택
- lateinit·lazy와 초기화
- 예외·use·Result 사용 기준
- 애너테이션 use-site target

#### 3.8 도메인 구현과 테스트

- Java 예제와 같은 주문 규칙 구현
- JUnit Jupiter와 Kotlin 테스트 작성
- nullable 반환과 명시적 실패 모델
- 코루틴의 suspend가 의미하는 것 맛보기

**실습 산출물**

Java 과정과 동일한 요구사항을 Kotlin으로 구현한다. 가변 상태·null 처리·데이터 모델의 차이를 비교한다.

**완료 기준**

- [ ] val과 객체의 불변성이 같은 뜻이 아님을 설명한다.
- [ ] !! 없이 외부 입력의 null을 처리하고 테스트한다.

**함께 읽을 보충 지식**

- Java와 Kotlin에서 ==의 의미
- val은 객체까지 불변으로 만들까
- 읽기 전용 컬렉션과 불변 컬렉션
- Java record와 Kotlin data class
- Kotlin의 플랫폼 타입
- let, run, with, apply, also
- Kotlin의 @field:와 @get:
- Kotlin의 final과 Spring 프록시

**공식 참고 자료**

- [Kotlin 시작하기](https://kotlinlang.org/docs/getting-started.html)
- [Java와 Kotlin 비교](https://kotlinlang.org/docs/comparison-to-java.html)

### 04 JVM과 언어 상호운용

두 언어의 코드가 같은 런타임에서 실행되는 과정을 따라갑니다.

**목표:** 메모리·타입·호출 문제를 JVM 관점에서 설명한다.

**선수 지식:** 개발 환경과 빌드 도구; Java 기본기 또는 Kotlin 기본기 중 한 과정의 기초

#### 4.1 소스에서 실행까지

- javac·kotlinc와 바이트코드
- 클래스 로더와 클래스 초기화
- 인터프리터·JIT의 역할
- javap로 Java·Kotlin 결과 비교

#### 4.2 메모리와 객체 수명

- 스택·힙·메타스페이스의 개념
- 참조·도달 가능성과 GC Roots
- 메모리 누수와 정상적인 객체 증가
- 힙 크기와 프로세스 메모리의 차이

#### 4.3 GC와 진단 입문

- 할당·수집·일시 정지
- 처리량과 지연 시간
- GC 로그 읽는 순서
- JFR·jcmd·힙 덤프 입문

#### 4.4 스레드와 메모리 가시성

- 프로세스·스레드·동시성·병렬성
- 경쟁 상태와 원자성
- synchronized·volatile 기초
- happens-before와 안전한 공개 개념

#### 4.5 Java와 Kotlin 상호운용

- getter·setter와 프로퍼티 매핑
- 플랫폼 타입과 nullability 애너테이션
- @JvmStatic·@JvmOverloads·@JvmName
- checked 예외와 @Throws

#### 4.6 타입과 리플렉션

- 제네릭 소거·브리지 메서드
- 원시 타입·박싱·배열
- 리플렉션·애너테이션 유지 정책
- Kotlin 리플렉션과 Java 리플렉션

#### 4.7 혼합 프로젝트 설계

- Java에서 Kotlin API 호출
- Kotlin에서 Java API 호출
- 컴파일 타깃과 실행 JDK 정렬
- 경계의 null·컬렉션·예외 계약

**실습 산출물**

Java와 Kotlin이 서로 호출하는 모듈을 만든다. 바이트코드를 비교하고 공유 카운터의 경쟁 상태를 재현한다.

**완료 기준**

- [ ] 한 언어의 기초를 먼저 마친 뒤 다른 언어 예제를 비교한다.
- [ ] 플랫폼 타입과 null 안전성의 한계를 설명한다.

**함께 읽을 보충 지식**

- JDK, JRE, JVM은 무엇이 다를까
- 읽기 전용 컬렉션과 불변 컬렉션
- Kotlin의 플랫폼 타입

**공식 참고 자료**

- [JVM 학습 자료](https://dev.java/learn/jvm/)
- [Kotlin Java 상호운용](https://kotlinlang.org/docs/java-interop.html)

### 05 HTTP와 웹의 기본

클라이언트의 요청이 서버와 네트워크를 통과하는 과정을 이해합니다.

**목표:** HTTP의 의미에 맞게 API 계약을 작성한다.

**선수 지식:** 개발 환경과 빌드 도구

#### 5.1 요청이 도착하는 과정

- DNS·TCP·TLS의 역할
- URL·포트·연결·타임아웃
- 프록시·로드 밸런서 개념
- curl로 요청과 응답 관찰

#### 5.2 HTTP 메시지와 의미

- 메서드·상태 코드·헤더
- 안전성·멱등성·캐시 가능성
- Content-Type·Accept·콘텐츠 협상
- HTTP 버전별 연결 모델 개요

#### 5.3 REST API 계약

- 리소스·URI·메서드 설계
- 페이지네이션·정렬·필터
- 오류 응답과 Problem Details
- OpenAPI로 계약 표현

#### 5.4 브라우저와 서버의 경계

- 쿠키·세션·SameSite
- 동일 출처 정책과 CORS
- CSRF와 XSS의 차이
- HTTPS·인증·인가 구분

#### 5.5 실패를 고려한 API

- 타임아웃·재시도·백오프
- 중복 요청과 멱등성 키
- 조건부 요청·ETag
- 하위 호환성과 API 변경

#### 5.6 API 설계 실습

- 회원·상품·주문 리소스 정의
- 성공·실패 응답 예시
- 중복 주문과 재시도 시나리오
- 계약 리뷰와 요청 컬렉션

**실습 산출물**

주문 API의 요청·응답·오류 계약을 작성하고 curl 요청 모음을 만든다. 중복 요청을 어떻게 처리할지 명시한다.

**완료 기준**

- [ ] 401·403·404·409의 용도를 구분한다.
- [ ] CORS와 서버의 인증·인가를 구분한다.

**함께 읽을 보충 지식**

- CORS와 CSRF
- 멱등성과 중복 요청

**공식 참고 자료**

- [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)

### 06 SQL과 데이터베이스

ORM을 쓰기 전에 저장 구조와 쿼리의 비용을 이해합니다.

**목표:** 정합성과 조회 요구사항에 맞는 스키마를 설계한다.

**선수 지식:** 개발 환경과 빌드 도구

#### 6.1 관계형 모델과 제약조건

- 테이블·행·키·관계
- PK·FK·UNIQUE·CHECK·NOT NULL
- 정규화와 중복 데이터
- 금액·시간·식별자 타입

#### 6.2 SQL로 데이터 다루기

- SELECT·INSERT·UPDATE·DELETE
- WHERE·ORDER BY·LIMIT
- NULL과 3값 논리
- 바인딩과 SQL Injection 방지

#### 6.3 관계 조회와 집계

- INNER·LEFT JOIN
- GROUP BY·HAVING
- 서브쿼리·EXISTS
- 윈도 함수와 페이지네이션

#### 6.4 인덱스와 실행 계획

- B-tree 인덱스 개념
- 복합 인덱스·선두 컬럼
- 선택도와 쓰기 비용
- EXPLAIN으로 추측 확인

#### 6.5 트랜잭션과 격리

- ACID와 커밋·롤백
- 격리 수준·읽기 이상 현상
- MVCC와 DB별 동작 차이
- 락·교착 상태·재시도

#### 6.6 연결과 스키마 운영

- 커넥션 풀과 트랜잭션 연결
- Flyway 마이그레이션
- 개발·테스트 데이터 관리
- 호환 가능한 스키마 변경

#### 6.7 주문 스키마 실습

- 회원·상품·주문·주문 항목
- 재고 차감과 조건부 UPDATE
- 중복 주문을 막는 제약조건
- 조회 요구사항과 인덱스 검증

**실습 산출물**

PostgreSQL에 주문 스키마와 마이그레이션을 작성한다. 동시 재고 차감과 인덱스 전후의 실행 계획을 확인한다.

**완료 기준**

- [ ] 코드 검증과 DB 제약조건의 역할을 구분한다.
- [ ] 격리 수준의 의미를 사용 DB의 동작으로 검증한다.

**공식 참고 자료**

- [PostgreSQL 튜토리얼](https://www.postgresql.org/docs/current/tutorial.html)
- [PostgreSQL 동시성](https://www.postgresql.org/docs/current/mvcc.html)

### 07 Spring의 핵심 원리

컨테이너가 객체를 만들고 연결하고 감싸는 과정을 배웁니다.

**목표:** Bean과 프록시의 동작을 코드로 설명한다.

**선수 지식:** JVM과 언어 상호운용

#### 7.1 IoC와 의존성 주입

- 직접 조립과 컨테이너 조립 비교
- 생성자 주입과 테스트 용이성
- 의존 관계와 책임 분리
- ApplicationContext의 역할

#### 7.2 Bean 등록과 탐색

- @Component와 스테레오타입
- @Configuration·@Bean
- 컴포넌트 스캔 범위
- @Qualifier·@Primary와 후보 선택

#### 7.3 Bean 생명주기와 Scope

- 등록·생성·주입·초기화·종료
- singleton·prototype·request·session
- 공유 상태와 스레드 안전성
- ObjectProvider와 scoped proxy 개념

#### 7.4 컨테이너 설정과 확장

- Environment·PropertySource
- @Profile·@Conditional 기초
- BeanFactoryPostProcessor·BeanPostProcessor
- 순환 의존성과 설계 개선

#### 7.5 AOP와 프록시

- 횡단 관심사·Advice·Pointcut
- JDK 프록시·클래스 기반 프록시
- 메서드 호출과 self-invocation
- 프록시로 로깅·측정 구현

#### 7.6 Kotlin과 Spring의 만남

- final 기본값과 kotlin-spring
- 생성자 주입과 프로퍼티
- 애너테이션 적용 위치
- Java·Kotlin Bean 혼합

#### 7.7 컨테이너 내부 따라가기

- refresh의 큰 흐름
- Bean 정의와 인스턴스 구분
- 자동 주입 실패 로그 읽기
- 작은 DI 컨테이너 직접 구현

**실습 산출물**

주문 서비스의 객체 조립을 Spring으로 옮긴다. Bean Scope와 프록시 내부 호출을 로그·테스트로 비교한다.

**완료 기준**

- [ ] 싱글톤 Bean이 자동으로 스레드 안전해지지 않음을 설명한다.
- [ ] 어떤 호출이 프록시를 통과하는지 예측한다.

**함께 읽을 보충 지식**

- Kotlin의 final과 Spring 프록시
- Spring singleton의 범위
- 내부 호출과 @Transactional

**공식 참고 자료**

- [Spring IoC](https://docs.spring.io/spring-framework/reference/core/beans.html)
- [Spring AOP](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)

### 08 Spring Boot와 애플리케이션 구성

자동 구성과 실행 환경을 이해하고 재현 가능한 앱을 만듭니다.

**목표:** 자동 구성의 근거와 설정값의 출처를 찾는다.

**선수 지식:** Spring의 핵심 원리, 개발 환경과 빌드 도구

#### 8.1 애플리케이션 시작 과정

- SpringApplication과 실행 흐름
- @SpringBootApplication의 구성
- 내장 서버와 실행 가능한 JAR
- Spring Framework와 Boot의 역할

#### 8.2 Starter와 자동 구성

- Starter·의존성 관리·BOM
- 조건부 자동 구성
- 사용자 Bean과 자동 구성의 관계
- 조건 평가 보고서 읽기

#### 8.3 외부 설정과 프로필

- properties·YAML과 설정 우선순위
- 환경 변수·실행 인자
- @ConfigurationProperties와 검증
- 비밀값 분리와 프로필 사용

#### 8.4 시작과 종료

- ApplicationRunner·CommandLineRunner
- 시작 실패와 진단 정보
- graceful shutdown
- 외부 자원 초기화와 해제

#### 8.5 버전과 빌드 관리

- Java Toolchain·Kotlin JVM target
- Boot 플러그인과 의존성 버전
- Boot 3·4 문서의 차이를 읽는 법
- Jackson·테스트 모듈 변경 확인

#### 8.6 설정 가능한 주문 앱

- 개발·테스트 환경 분리
- 누락된 설정을 시작 시 검출
- 실행 JAR 만들기
- 실행 가이드와 예제 설정 작성

**실습 산출물**

주문 앱에 타입이 있는 설정을 적용하고 로컬·테스트 프로필을 구성한다. JAR로 실행하고 정상 종료를 확인한다.

**완료 기준**

- [ ] 자동 구성된 Bean이 생긴 이유를 찾는다.
- [ ] 설정과 비밀 정보를 코드에서 분리한다.

**함께 읽을 보충 지식**

- BOM과 Version Catalog
- IDE에서는 되는데 터미널에서는 안 될 때
- Starter와 자동 구성
- YAML과 properties
- jar, bootJar, WAR

**공식 참고 자료**

- [Spring Boot Reference](https://docs.spring.io/spring-boot/reference/index.html)
- [Boot 4 마이그레이션](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide)

### 09 Spring MVC와 API 구현

요청 하나가 들어와 응답으로 나가기까지의 경로를 구현합니다.

**목표:** 검증과 오류 처리가 일관된 주문 API를 만든다.

**선수 지식:** Spring Boot와 애플리케이션 구성, HTTP와 웹의 기본

#### 9.1 요청 처리의 전체 흐름

- Servlet Container·Filter
- DispatcherServlet·HandlerMapping·HandlerAdapter
- ArgumentResolver·MessageConverter
- Interceptor와 예외 처리 위치

#### 9.2 Controller와 입력

- 라우팅·경로·쿼리·헤더
- @RequestBody와 바인딩
- DTO와 도메인 모델 분리
- Java record·Kotlin data class 비교

#### 9.3 검증과 변환

- Bean Validation 제약조건
- @Valid·@Validated의 적용 맥락
- Kotlin @field:·@get: 타깃
- 입력 검증과 비즈니스 규칙

#### 9.4 예외와 오류 응답

- @ExceptionHandler·@RestControllerAdvice
- ProblemDetail와 응답 계약
- 도메인 예외 매핑
- 민감한 정보와 내부 오류 로그

#### 9.5 직렬화와 응답

- Jackson과 JSON 모델
- 날짜·enum·null 처리
- 상태 코드·헤더·ResponseEntity
- 엔티티 직접 반환의 문제

#### 9.6 파일과 비동기 응답

- Multipart 업로드와 크기 제한
- 다운로드와 자원 해제
- SSE·비동기 MVC 개념
- 외부 HTTP 호출과 타임아웃

#### 9.7 API 문서와 계약 검증

- OpenAPI와 REST Docs 선택
- 페이지네이션과 오류 계약
- MockMvc로 요청 검증
- 필터·인터셉터 로그로 흐름 추적

**실습 산출물**

주문 API를 메모리 저장소로 구현한다. 잘못된 입력·없는 상품·중복 요청의 응답을 테스트한다.

**완료 기준**

- [ ] Filter와 Interceptor의 실행 위치를 구분한다.
- [ ] Java·Kotlin DTO에서 검증이 실제 동작하는지 확인한다.

**함께 읽을 보충 지식**

- Kotlin의 @field:와 @get:
- Filter와 Interceptor
- Entity와 DTO

**공식 참고 자료**

- [Spring MVC](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
- [Jakarta Bean Validation](https://jakarta.ee/specifications/bean-validation/)

### 10 JPA와 트랜잭션

객체 변경이 SQL과 트랜잭션으로 이어지는 과정을 이해합니다.

**목표:** 정합성과 쿼리 성능을 검증하는 영속 계층을 만든다.

**선수 지식:** Spring MVC와 API 구현, SQL과 데이터베이스

#### 10.1 JDBC에서 JPA까지

- DataSource·JdbcTemplate
- JPA·Hibernate·Spring Data JPA의 관계
- EntityManager·Repository
- ORM 선택의 비용과 이점

#### 10.2 엔티티와 매핑

- 식별자·생성 전략·컬럼
- 연관관계 주인과 단방향·양방향
- 값 타입·임베디드 타입
- Kotlin 엔티티의 생성자·프록시·동등성

#### 10.3 영속성 컨텍스트

- 엔티티 상태와 1차 캐시
- 변경 감지·쓰기 지연
- flush와 commit
- persist·merge·save의 차이

#### 10.4 조회와 페이지네이션

- 쿼리 메서드·JPQL·Projection
- fetch join·EntityGraph
- 페이징·정렬·count 쿼리
- 복잡한 조회와 SQL 기반 접근

#### 10.5 지연 로딩과 N+1

- 프록시와 로딩 시점
- N+1 재현과 SQL 개수 확인
- fetch join과 컬렉션 페이징
- OSIV와 트랜잭션 경계

#### 10.6 트랜잭션 경계와 롤백

- @Transactional과 프록시
- 기본 롤백 규칙과 명시적 설정
- readOnly와 실제 쓰기 제어 구분
- 내부 호출·예외 포착·비동기 경계

#### 10.7 전파와 격리

- REQUIRED·REQUIRES_NEW
- 논리 트랜잭션·물리 트랜잭션
- rollback-only·UnexpectedRollbackException
- DB 격리·커넥션 풀과 전파의 관계

#### 10.8 동시 주문과 락

- 낙관적 락·@Version
- 비관적 락·조건부 갱신
- 교착 상태와 재시도 범위
- 멱등성과 유니크 제약조건

#### 10.9 영속 계층 검증

- 실제 DB 통합 테스트
- 테스트 트랜잭션의 함정
- 마이그레이션·쿼리 검증
- 엔티티·DTO·도메인 경계 리뷰

**실습 산출물**

주문 저장소를 PostgreSQL로 교체한다. 주문 실패 시 재고 롤백, N+1 개선, 동시 주문의 초과 판매 방지를 검증한다.

**완료 기준**

- [ ] flush와 commit을 구분하고 SQL 로그로 확인한다.
- [ ] 내부 호출·전파·롤백 규칙을 실패 테스트로 설명한다.

**함께 읽을 보충 지식**

- JPA, Hibernate, Spring Data JPA
- Entity와 DTO
- flush와 commit
- 내부 호출과 @Transactional
- readOnly는 쓰기를 금지할까
- 테스트의 롤백이 숨기는 것

**공식 참고 자료**

- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/)
- [Spring 트랜잭션](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)
- [Hibernate ORM](https://hibernate.org/orm/documentation/)

### 11 Spring Security와 접근 제어

인증 방식의 선택부터 리소스 소유권 검증까지 연결합니다.

**목표:** 사용자와 권한에 따라 주문 접근을 제어한다.

**선수 지식:** Spring MVC와 API 구현, JPA와 트랜잭션

#### 11.1 Security Filter Chain

- DelegatingFilterProxy·FilterChainProxy
- SecurityFilterChain과 요청 매칭
- Authentication·SecurityContext
- 인증 실패·접근 거부 처리

#### 11.2 세션 기반 인증

- 로그인·로그아웃·세션 수명
- PasswordEncoder와 비밀번호 해시
- 쿠키 속성과 세션 고정 보호
- 인증 정보를 로그에 남기지 않기

#### 11.3 인가와 소유권

- 요청 기반·메서드 기반 인가
- 역할·권한·리소스 소유권
- @PreAuthorize와 프록시
- IDOR와 권한 회귀 테스트

#### 11.4 JWT와 토큰 수명

- 서명·검증·만료·클레임
- Access·Refresh 토큰과 폐기 전략
- 저장 위치와 위협 모델
- 세션과 토큰 방식의 선택 기준

#### 11.5 OAuth2와 OIDC

- 클라이언트·리소스 서버·인가 서버
- Authorization Code와 PKCE
- 로그인과 API 접근 권한의 차이
- Spring OAuth2 Client·Resource Server

#### 11.6 웹 보안과 검증

- CORS·CSRF·SameSite 적용
- 401·403과 예외 응답
- 익명·사용자·관리자 테스트
- 보안 설정과 운영 환경 분리

**실습 산출물**

세션 기반 로그인을 우선 구현하고 주문 소유권을 검증한다. 토큰 기반 대안의 장단점을 기록하고 접근 제어 테스트를 작성한다.

**완료 기준**

- [ ] 다른 사용자의 주문 조회·취소를 차단한다.
- [ ] 인증 방식에 맞는 CSRF 정책을 설명한다.

**함께 읽을 보충 지식**

- Filter와 Interceptor
- CORS와 CSRF

**공식 참고 자료**

- [Spring Security](https://docs.spring.io/spring-security/reference/)
- [OAuth2 Resource Server](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/index.html)

### 12 테스트 전략과 품질

각 단계에서 작성한 테스트를 모아 빠르고 신뢰할 수 있는 검증 체계를 만듭니다.

**목표:** 실패 원인을 구분할 수 있는 테스트 구성을 만든다.

**선수 지식:** Spring MVC와 API 구현, JPA와 트랜잭션

#### 12.1 테스트 설계와 경계

- 행동 중심 검증
- 정상·경계·오류 시나리오
- 단위·슬라이스·통합·E2E
- 결정적인 시간·랜덤·외부 의존성

#### 12.2 JUnit Jupiter와 단위 테스트

- 생명주기·파라미터화 테스트
- AssertJ·예외 검증
- Java·Kotlin 테스트 가독성
- 테스트 데이터 빌더

#### 12.3 테스트 대역

- Dummy·Stub·Fake·Spy·Mock
- Mockito·MockK의 선택
- 상호작용 검증의 범위
- 도메인 규칙을 과도하게 모킹하지 않기

#### 12.4 Spring 테스트 계층

- @WebMvcTest·@DataJpaTest
- @SpringBootTest와 실제 HTTP
- 테스트 컨텍스트 캐시
- 트랜잭션 롤백과 서버 스레드 경계

#### 12.5 실제 의존성과 통합 테스트

- PostgreSQL Testcontainers
- @ServiceConnection과 수명 관리
- 마이그레이션·락·제약조건 검증
- 외부 HTTP 스텁과 실패 재현

#### 12.6 CI와 회귀 방지

- Gradle 검증 파이프라인
- 병렬 실행·격리·flaky test
- 커버리지의 역할과 한계
- 실패 로그·테스트 리포트 읽기

**실습 산출물**

주문 앱의 단위·MVC·DB·보안 테스트를 묶어 CI에서 실행한다. 의도적으로 결함을 넣어 테스트가 검출하는지 확인한다.

**완료 기준**

- [ ] 테스트를 위해 전체 컨텍스트가 필요한지 판단한다.
- [ ] DB 제약조건과 동시성 실패가 CI에서도 재현된다.

**함께 읽을 보충 지식**

- Mock, Stub, Fake
- 테스트의 롤백이 숨기는 것

**공식 참고 자료**

- [Spring Boot 테스트](https://docs.spring.io/spring-boot/reference/testing/index.html)
- [Testcontainers 연동](https://docs.spring.io/spring-boot/reference/testing/testcontainers.html)

### 13 동시성 그리고 성능

스레드와 외부 자원의 한계를 측정하고 처리량과 응답 시간을 개선합니다.

**목표:** 병목의 근거를 수집한 뒤 개선 효과를 검증한다.

**선수 지식:** JVM과 언어 상호운용, JPA와 트랜잭션, 테스트 전략과 품질

#### 13.1 공유 상태와 동기화

- 원자성·가시성·순서 보장
- Lock·Atomic·동시성 컬렉션
- 교착·기아·경쟁 상태
- 불변 객체와 상태 격리

#### 13.2 실행기와 비동기 작업

- ExecutorService·스레드 풀
- 큐·거부 정책·백프레셔
- CompletableFuture·예외·타임아웃
- @Async와 프록시·컨텍스트 전달

#### 13.3 가상 스레드

- 플랫폼 스레드와 가상 스레드
- 블로킹 I/O와 CPU 작업
- DB 풀·외부 시스템의 동시성 제한
- JDK 버전에 따른 제약 확인

#### 13.4 Kotlin 코루틴 입문

- suspend와 실제 중단 지점
- CoroutineScope·Job·Dispatcher
- 구조적 동시성·취소·예외
- 블로킹 API·트랜잭션과의 경계

#### 13.5 캐시의 기본 전략

- Cache Aside·TTL·무효화
- 로컬 캐시와 Redis
- 캐시 스탬피드·일관성
- Spring Cache와 측정

#### 13.6 측정과 프로파일링

- 처리량·p50·p95·p99
- JFR·스레드 덤프·GC 로그
- 커넥션 풀·SQL·외부 API 병목
- 부하 모델과 워밍업

#### 13.7 병목 개선 실습

- 기준 성능 측정
- 한 번에 하나의 가설 검증
- 부하 중 실패·타임아웃 관찰
- 개선 전후와 부작용 기록

**실습 산출물**

상품 조회·주문 생성에 부하를 준다. SQL·풀·캐시 중 실제 병목 하나를 찾고 처리량과 지연 시간을 비교한다.

**완료 기준**

- [ ] 비동기·가상 스레드·코루틴이 같은 개념이 아님을 설명한다.
- [ ] 캐시나 스레드 수를 바꾸기 전에 기준 지표를 수집한다.

**함께 읽을 보충 지식**

- Spring singleton의 범위
- 스레드, 가상 스레드, 코루틴

**공식 참고 자료**

- [Java 가상 스레드](https://dev.java/learn/new-features/virtual-threads/)
- [Kotlin 코루틴](https://kotlinlang.org/docs/coroutines-overview.html)
- [Spring 작업 실행](https://docs.spring.io/spring-boot/reference/features/task-execution-and-scheduling.html)

### 14 배포와 운영

빌드한 애플리케이션을 배포하고 실패를 관찰하고 복구합니다.

**목표:** 서비스의 배포·관찰·복구 절차를 실행한다.

**선수 지식:** Spring Boot와 애플리케이션 구성, Spring Security와 접근 제어, 테스트 전략과 품질

#### 14.1 패키징과 컨테이너

- JAR·bootJar·WAR
- Dockerfile·빌드팩·이미지 계층
- 컨테이너 사용자·리소스 제한
- Docker Compose로 개발 환경 구성

#### 14.2 CI와 배포 흐름

- 테스트·이미지 빌드·배포 분리
- 환경 변수·비밀 관리
- 배포 버전과 재현성
- 롤백과 스키마 호환성

#### 14.3 상태 확인과 종료

- Actuator 노출 범위
- liveness·readiness의 역할
- graceful shutdown과 진행 중 요청
- 애플리케이션·DB 연결 상태

#### 14.4 로그와 메트릭과 추적

- 구조화 로그·상관관계 ID
- Micrometer·메트릭 태그
- 분산 추적과 컨텍스트 전파
- 개인 정보·시크릿과 로그

#### 14.5 외부 의존성의 실패

- 연결·응답 타임아웃
- 재시도 예산·서킷 브레이커
- rate limit·과부하 제어
- DB·외부 API 장애 시나리오

#### 14.6 장애 대응과 데이터 보호

- 알림·SLO·대시보드 기초
- 배포 직후 오류율 증가 조사
- 백업·복원과 마이그레이션 실패
- 사후 분석과 재발 방지

#### 14.7 운영 가능한 주문 서비스

- 테스트를 통과한 이미지 배포
- 정상 종료·재시작·복원 검증
- 부하 중 배포 관찰
- 실행 절차와 장애 대응 문서

**실습 산출물**

주문 앱과 DB를 컨테이너로 실행한다. 상태·로그·메트릭을 확인하고 의존성 장애와 롤백을 연습한다.

**완료 기준**

- [ ] health 응답만으로 모든 요청의 성공을 판단하지 않는다.
- [ ] 배포·롤백·복원 절차를 다른 사람이 재현할 수 있다.

**함께 읽을 보충 지식**

- jar, bootJar, WAR
- liveness와 readiness

**공식 참고 자료**

- [Spring Boot 운영 기능](https://docs.spring.io/spring-boot/reference/actuator/index.html)
- [Docker 시작하기](https://docs.docker.com/get-started/)

### 15 설계와 종합 프로젝트

완성한 기능의 경계를 정리하고 선택한 설계의 근거를 설명합니다.

**목표:** 주문 서비스의 설계·검증·운영 근거를 제시한다.

**선수 지식:** JPA와 트랜잭션, Spring Security와 접근 제어, 테스트 전략과 품질, 배포와 운영

#### 15.1 패키지와 모듈 경계

- 계층별·기능별 패키지
- 도메인·애플리케이션·인프라 책임
- 헥사고날 구조의 비용과 이점
- 순환 의존성과 모듈 테스트

#### 15.2 도메인 모델과 변경

- 엔티티·값 객체·애그리거트
- 불변식과 트랜잭션 경계
- 외부 서비스와 포트·어댑터
- 과도한 추상화 피하기

#### 15.3 이벤트와 일관성

- 도메인 이벤트와 처리 시점
- @TransactionalEventListener
- 동기·비동기 후처리 선택
- Outbox가 필요한 실패 시나리오

#### 15.4 프레임워크 소스 읽기

- 문제 재현에서 시작하기
- Bean 생성·MVC 호출 경로
- 트랜잭션 인터셉터 추적
- 버전을 고정한 소스 링크 기록

#### 15.5 개념을 설명하는 연습

- Java·Kotlin·JVM 비교 질문
- DI·프록시·MVC 질문
- JPA·트랜잭션·동시성 질문
- 선택 근거·반례·측정 결과로 답변

#### 15.6 직접 구현하는 연습

- 작은 DI 컨테이너
- 동시성 안전한 재고 차감
- 멱등성 키 처리
- N+1과 프록시 내부 호출 재현

#### 15.7 종합 프로젝트 리뷰

- 회원·상품·주문·재고의 흐름
- 요구사항과 테스트 추적
- ADR·ERD·API·운영 가이드
- 실패 시나리오 데모와 개선 계획

**실습 산출물**

주문 서비스의 코드·테스트·배포·운영 문서를 하나의 결과물로 정리한다. Java와 Kotlin의 구현 차이 및 설계 결정을 설명한다.

**완료 기준**

- [ ] 정상 동작뿐 아니라 동시 주문·중복 요청·장애 상황을 시연한다.
- [ ] 기술 선택을 요구사항·비용·검증 결과로 설명한다.

**함께 읽을 보충 지식**

- 멱등성과 중복 요청

**공식 참고 자료**

- [Spring 코드 구조](https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html)
- [Spring Modulith](https://docs.spring.io/spring-modulith/reference/)

### 선택 심화 과정

기본 서비스를 완성한 뒤 해결할 문제에 맞춰 확장합니다.

**목표:** 필요한 기술을 골라 작은 실험으로 적용 여부를 판단한다.

**선수 지식:** 설계와 종합 프로젝트

#### 16.1 WebFlux와 Reactor

- Reactive Streams·백프레셔
- Mono·Flux와 연산자
- 이벤트 루프·블로킹 경계
- R2DBC·코루틴 연동과 선택 기준

#### 16.2 메시징과 이벤트 처리

- Kafka·RabbitMQ의 모델
- 순서·중복·전달 보장
- 재처리·DLQ·멱등 소비자
- Outbox·CDC와 일관성

#### 16.3 Spring Batch

- Job·Step·Chunk
- 트랜잭션과 재시작
- 실패·skip·retry
- 대량 데이터와 파티셔닝

#### 16.4 분산 시스템과 서비스 분리

- 모듈형 모놀리스에서 분리하기
- 네트워크 실패·시간·일관성
- Saga·분산 추적
- 분산 락의 전제와 대안

#### 16.5 AOT와 Native Image

- JIT·AOT와 시작 시간
- 리플렉션·리소스 힌트
- 빌드 비용과 런타임 제약
- JVM 배포와 성능 비교

#### 16.6 요구사항별 확장

- 검색 엔진·검색 인덱스 일관성
- WebSocket·SSE 선택
- Kubernetes의 배포·자원 모델
- 멀티 테넌시와 데이터 격리

**실습 산출물**

실제 요구사항 하나를 정해 선택 기술의 도입 전후를 비교하는 작은 실험과 ADR을 작성한다.

**완료 기준**

- [ ] 기본 과정의 완료율과 선택 심화의 진행률을 별도로 관리한다.
- [ ] 기술을 추가해야 하는 이유와 운영 비용을 설명한다.

**공식 참고 자료**

- [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html)
- [Spring Batch](https://docs.spring.io/spring-batch/reference/)
- [Spring for Apache Kafka](https://docs.spring.io/spring-kafka/reference/)

## 보충 지식 색인

### JDK, JRE, JVM은 무엇이 다를까

연결 단계: 개발 환경과 빌드 도구, JVM과 언어 상호운용

JVM은 바이트코드를 실행하는 가상 머신입니다. JRE는 실행 환경을, JDK는 컴파일러와 진단 도구까지 포함한 개발 도구 모음을 뜻합니다. 현대 JDK 배포에서는 별도 JRE 설치 없이 JDK로 개발과 실행을 시작할 수 있습니다.

**주의:** JDK 버전, 컴파일 타깃, 배포 서버의 실행 버전은 각각 확인해야 합니다.

[공식 참고 자료](https://dev.java/learn/first-steps/first-java-code/getting-started/)

### Groovy DSL과 Kotlin DSL

연결 단계: 개발 환경과 빌드 도구

build.gradle은 Groovy, build.gradle.kts는 Kotlin으로 Gradle 빌드를 표현합니다. Groovy DSL은 괄호를 생략하는 등 유연한 문법을 쓰며, Kotlin DSL은 정적 타입 검사와 타입 기반 IDE 지원을 활용합니다. 애플리케이션을 Java로 작성해도 Kotlin DSL을 사용할 수 있습니다.

**주의:** 확장자만 바꾸면 문법과 API 접근 방식의 차이 때문에 빌드가 깨질 수 있습니다.

Groovy DSL

```groovy
plugins {
    id 'java'
}

repositories {
    mavenCentral()
}
```

Kotlin DSL

```kotlin
plugins {
    java
}

repositories {
    mavenCentral()
}
```

[공식 참고 자료](https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html)

### settings 파일과 build 파일

연결 단계: 개발 환경과 빌드 도구

settings.gradle(.kts)는 빌드에 참여하는 프로젝트와 이름 등을 정의합니다. build.gradle(.kts)는 각 프로젝트의 플러그인, 의존성, 태스크를 구성합니다. 멀티 프로젝트 빌드에서는 하나의 settings가 여러 하위 프로젝트를 연결합니다.

**주의:** settings에서의 저장소 설정과 프로젝트의 저장소 설정은 적용 대상과 정책을 구분해 읽어야 합니다.

[공식 참고 자료](https://docs.gradle.org/current/userguide/intro_multi_project_builds.html)

### gradle과 gradlew의 차이

연결 단계: 개발 환경과 빌드 도구

Gradle Wrapper는 프로젝트가 지정한 Gradle 버전을 내려받아 실행하는 진입점입니다. macOS와 Linux에서는 ./gradlew, Windows에서는 gradlew.bat를 사용합니다. Wrapper 파일을 버전 관리하면 개발 환경과 CI의 Gradle 버전을 맞출 수 있습니다.

**주의:** 개발자 컴퓨터에 설치된 gradle 명령과 Wrapper의 버전은 다를 수 있습니다.

[공식 참고 자료](https://docs.gradle.org/current/userguide/gradle_wrapper.html)

### implementation, api, runtimeOnly

연결 단계: 개발 환경과 빌드 도구

implementation은 구현에 필요한 의존성을 선언합니다. java-library 플러그인의 api는 소비자에게 공개되는 컴파일 API의 의존성을 표현합니다. runtimeOnly는 실행 시 필요한 의존성을, compileOnly는 컴파일에만 필요한 의존성을 지정합니다.

**주의:** 모든 의존성을 api로 노출하면 소비자가 불필요한 구현 세부사항에 결합됩니다.

[공식 참고 자료](https://docs.gradle.org/current/userguide/java_library_plugin.html)

### BOM과 Version Catalog

연결 단계: 개발 환경과 빌드 도구, Spring Boot와 애플리케이션 구성

BOM은 함께 사용하는 라이브러리의 버전 제약을 묶습니다. Version Catalog는 의존성과 버전의 별칭을 중앙에서 관리하는 수단입니다. 두 기능은 함께 쓸 수 있으며, 별칭을 정의하는 것과 실제 의존성 버전을 정렬하는 것은 구분해야 합니다.

**주의:** Version Catalog에 적은 버전이 모든 전이 의존성을 강제로 고정하는 것은 아닙니다.

[공식 참고 자료](https://docs.gradle.org/current/userguide/platforms.html)

### IDE에서는 되는데 터미널에서는 안 될 때

연결 단계: 개발 환경과 빌드 도구, Spring Boot와 애플리케이션 구성

IDE의 프로젝트 SDK, Gradle 자체를 실행하는 JVM, 컴파일에 사용하는 Java Toolchain은 서로 다를 수 있습니다. java -version과 ./gradlew --version을 확인하고 프로젝트가 선언한 toolchain을 비교하면 원인을 좁힐 수 있습니다.

**주의:** Kotlin의 JVM target도 Java 컴파일 타깃과 일관되게 맞춰야 합니다.

[공식 참고 자료](https://kotlinlang.org/docs/gradle-configure-project.html)

### Maven과 Gradle

연결 단계: 개발 환경과 빌드 도구

Maven은 pom.xml과 표준 생명주기를 중심으로 빌드를 구성합니다. Gradle은 플러그인이 제공하는 모델과 태스크의 의존 관계로 빌드를 구성합니다. 두 도구 모두 의존성 관리, 테스트, 패키징을 수행하며 같은 Maven 저장소의 라이브러리를 사용할 수 있습니다.

**주의:** Gradle을 쓴다고 모든 프로젝트의 빌드가 자동으로 더 빨라지는 것은 아닙니다.

[공식 참고 자료](https://docs.gradle.org/current/userguide/migrating_from_maven.html)

### Java와 Kotlin에서 ==의 의미

연결 단계: Java 기본기, Kotlin 기본기

Java에서 참조형의 ==는 같은 객체인지 비교하고 equals는 객체가 정의한 동등성을 비교합니다. Kotlin의 ==는 null을 고려한 equals 호출에 해당하며, ===는 참조 동일성을 비교합니다. HashMap이나 HashSet에서는 equals와 hashCode의 계약도 함께 지켜야 합니다.

**주의:** 배열의 내용 비교는 언어별 배열 API를 따로 확인해야 합니다.

Java

```java
String a = new String("jvm");
String b = new String("jvm");
// a == b          → false
// a.equals(b)     → true
```

Kotlin

```kotlin
val a = String(charArrayOf('j', 'v', 'm'))
val b = String(charArrayOf('j', 'v', 'm'))
// a == b          → true
// a === b         → false
```

[공식 참고 자료](https://kotlinlang.org/docs/equality.html)

### val은 객체까지 불변으로 만들까

연결 단계: Java 기본기, Kotlin 기본기

Kotlin의 val과 Java의 final 변수는 다른 값으로 재할당하는 것을 제한합니다. 참조가 가리키는 객체의 내부 상태까지 고정하지는 않습니다. 불변 모델을 만들려면 필드, 컬렉션, 복사 방식과 외부에 노출하는 참조까지 함께 설계해야 합니다.

**주의:** val items = mutableListOf(1)에서 items.add(2)는 가능합니다.

[공식 참고 자료](https://kotlinlang.org/docs/collections-overview.html)

### 읽기 전용 컬렉션과 불변 컬렉션

연결 단계: Kotlin 기본기, JVM과 언어 상호운용

Kotlin의 List는 변경 연산을 노출하지 않는 읽기 전용 인터페이스입니다. 다른 코드가 같은 객체를 MutableList로 참조하고 있다면 내용이 바뀔 수 있습니다. 읽기 전용 API와 객체 전체의 불변성 보장은 서로 다른 계약입니다.

**주의:** 컬렉션을 복사해도 내부 요소가 가변 객체라면 요소의 상태는 바뀔 수 있습니다.

[공식 참고 자료](https://kotlinlang.org/docs/collections-overview.html)

### Java record와 Kotlin data class

연결 단계: Java 기본기, Kotlin 기본기

두 기능 모두 데이터 표현에 필요한 반복 코드를 줄여 줍니다. Java record는 컴포넌트를 final 필드로 보유하고, Kotlin data class는 주 생성자 프로퍼티를 바탕으로 equals, hashCode, copy 등을 생성합니다. Kotlin 프로퍼티는 val 또는 var일 수 있습니다.

**주의:** 두 기능 모두 중첩된 객체의 깊은 불변성을 보장하지 않으며 data class의 copy는 얕은 복사입니다.

[공식 참고 자료](https://kotlinlang.org/docs/data-classes.html)

### Kotlin의 플랫폼 타입

연결 단계: Kotlin 기본기, JVM과 언어 상호운용

Java 코드의 null 가능성이 타입 정보만으로 명확하지 않으면 Kotlin에서는 플랫폼 타입으로 취급할 수 있습니다. 이런 값은 nullable 또는 non-null로 사용할 수 있어 Java와 연결하기 편하지만, 실제 null을 만나면 런타임 오류가 발생할 수 있습니다.

**주의:** Kotlin 코드라고 외부 Java API의 null 위험까지 사라지는 것은 아닙니다.

[공식 참고 자료](https://kotlinlang.org/docs/java-interop.html)

### let, run, with, apply, also

연결 단계: Kotlin 기본기

scope 함수는 객체를 블록 안에서 다루는 방식을 제공합니다. let과 also는 it, run·with·apply는 this를 사용합니다. apply·also는 대상 객체를 반환하고, let·run·with는 블록의 결과를 반환합니다. 필요한 반환값과 코드의 목적을 먼저 보고 선택합니다.

**주의:** 여러 scope 함수를 중첩하면 this와 it이 가리키는 대상이 불분명해집니다.

[공식 참고 자료](https://kotlinlang.org/docs/scope-functions.html)

### Kotlin의 @field:와 @get:

연결 단계: Kotlin 기본기, Spring MVC와 API 구현

Kotlin 프로퍼티는 JVM에서 필드, 접근자, 생성자 매개변수 등으로 표현될 수 있습니다. use-site target은 애너테이션을 어느 요소에 붙일지 지정합니다. 예를 들어 필드를 검사하는 검증 방식에는 @field:NotBlank처럼 의도를 명시할 수 있습니다.

**주의:** 생략 시 타깃 선택은 애너테이션과 컴파일러 설정·버전에 영향을 받으므로 실제 검증 테스트로 확인합니다.

[공식 참고 자료](https://kotlinlang.org/docs/annotations.html)

### Kotlin의 final과 Spring 프록시

연결 단계: Spring의 핵심 원리, Kotlin 기본기

Kotlin 클래스와 멤버 함수는 기본적으로 final입니다. 상속을 이용하는 프록시는 이 제약의 영향을 받습니다. kotlin-spring 플러그인은 Spring의 관련 애너테이션이 붙은 클래스 등을 열어 주어 프록시를 사용할 수 있게 돕습니다.

**주의:** 모든 프록시가 같은 방식으로 만들어지는 것은 아니며 private 메서드나 내부 호출 문제도 별도로 이해해야 합니다.

[공식 참고 자료](https://docs.spring.io/spring-framework/reference/languages/kotlin/spring-projects-in.html)

### Spring singleton의 범위

연결 단계: Spring의 핵심 원리, 동시성 그리고 성능

Spring singleton은 컨테이너의 Bean 정의를 기준으로 인스턴스를 공유하는 범위입니다. 애플리케이션 전체에 해당 클래스의 객체가 무조건 하나뿐이라는 뜻은 아닙니다. 여러 요청이 같은 Bean을 사용할 수 있으므로 요청별 데이터를 필드에 저장하는 설계는 주의해야 합니다.

**주의:** singleton Scope가 메서드 실행을 직렬화하거나 스레드 안전성을 보장하지는 않습니다.

[공식 참고 자료](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)

### Starter와 자동 구성

연결 단계: Spring Boot와 애플리케이션 구성

Starter는 특정 기능을 시작할 때 필요한 의존성을 묶는 역할을 합니다. 자동 구성은 클래스패스, 설정값, 등록된 Bean 등 조건에 따라 실제 구성을 적용합니다. 라이브러리가 존재하는 것과 특정 Bean이 생성되는 것은 구분해서 확인해야 합니다.

**주의:** 자동 구성이 기대와 다르면 조건 평가 보고서와 사용자 정의 Bean을 함께 확인합니다.

[공식 참고 자료](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)

### YAML과 properties

연결 단계: Spring Boot와 애플리케이션 구성

두 형식 모두 외부 설정을 표현할 수 있습니다. properties는 키와 값을 명시하고, YAML은 들여쓰기로 계층을 표현합니다. 어떤 형식이든 설정값이 적용되는 프로필과 다른 설정 소스의 우선순위를 함께 확인해야 합니다.

**주의:** 비밀값을 YAML이나 properties로 옮기는 것만으로 비밀 관리가 해결되지는 않습니다.

[공식 참고 자료](https://docs.spring.io/spring-boot/reference/features/external-config.html)

### Filter와 Interceptor

연결 단계: Spring MVC와 API 구현, Spring Security와 접근 제어

Servlet Filter는 Servlet을 둘러싼 요청·응답 체인에서 동작합니다. Spring MVC Interceptor는 DispatcherServlet이 선택한 핸들러 실행에 관여합니다. Spring Security는 Servlet 환경에서 필터 체인을 사용합니다.

**주의:** MVC 밖에서 처리되는 요청까지 보호해야 하는 인증·인가를 MVC Interceptor만으로 구성하지 않습니다.

[공식 참고 자료](https://docs.spring.io/spring-security/reference/servlet/architecture.html)

### CORS와 CSRF

연결 단계: HTTP와 웹의 기본, Spring Security와 접근 제어

CORS는 브라우저가 다른 출처의 응답을 읽도록 허용하는 규칙입니다. CSRF는 브라우저가 자동으로 보내는 자격 증명 등을 악용한 요청 위조 문제입니다. 인증 방식과 쿠키 사용 여부를 기준으로 각각의 정책을 설계해야 합니다.

**주의:** CORS 설정은 API 자체에 대한 인증·인가를 대신하지 않습니다.

[공식 참고 자료](https://docs.spring.io/spring-security/reference/servlet/exploits/csrf.html)

### JPA, Hibernate, Spring Data JPA

연결 단계: JPA와 트랜잭션

JPA는 Java 객체의 영속성을 다루는 표준 API와 규약입니다. Hibernate는 그 구현체 중 하나이며, Spring Data JPA는 Repository 추상화를 통해 JPA 기반 데이터 접근을 편하게 해 줍니다. 각 층을 구분하면 문제가 쿼리, 매핑, 저장소 추상화 중 어디에 있는지 찾기 쉽습니다.

**주의:** Repository의 메서드 수를 줄이는 것과 SQL 실행 비용을 줄이는 것은 별개의 문제입니다.

[공식 참고 자료](https://docs.spring.io/spring-data/jpa/reference/)

### Entity와 DTO

연결 단계: Spring MVC와 API 구현, JPA와 트랜잭션

Entity는 영속성과 도메인 상태를 표현하며, DTO는 API 등 경계에서 주고받을 데이터의 계약을 표현합니다. 응답 DTO를 분리하면 필요한 필드와 형식을 명시하고 영속 계층의 변경이 API에 퍼지는 범위를 줄일 수 있습니다.

**주의:** 엔티티를 그대로 직렬화하면 지연 로딩과 순환 참조, 의도하지 않은 필드 노출을 만날 수 있습니다.

[공식 참고 자료](https://docs.spring.io/spring-data/jpa/reference/repositories/projections.html)

### flush와 commit

연결 단계: JPA와 트랜잭션

flush는 영속성 컨텍스트의 변경을 데이터베이스와 동기화해 SQL을 실행하는 과정입니다. commit은 트랜잭션을 완료하는 작업입니다. flush가 발생해도 트랜잭션이 나중에 롤백되면 변경은 확정되지 않습니다.

**주의:** SQL 로그에 INSERT가 찍혔다는 사실만으로 커밋 성공을 판단할 수는 없습니다.

[공식 참고 자료](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html)

### 내부 호출과 @Transactional

연결 단계: JPA와 트랜잭션, Spring의 핵심 원리

기본 프록시 방식의 트랜잭션 조언은 프록시를 통과하는 호출에 적용됩니다. 같은 객체 안에서 다른 메서드를 직접 호출하면 그 호출은 프록시를 거치지 않습니다. 이때 호출된 메서드의 트랜잭션 설정이 새로 적용되지 않습니다.

**주의:** 호출자에서 이미 트랜잭션을 시작했다면 그 트랜잭션은 존재할 수 있습니다. 내부 호출은 항상 트랜잭션이 없다는 뜻이 아닙니다.

[공식 참고 자료](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)

### readOnly는 쓰기를 금지할까

연결 단계: JPA와 트랜잭션

@Transactional(readOnly = true)는 읽기 전용 의도를 트랜잭션 인프라에 전달합니다. 실제 최적화나 쓰기 제한은 트랜잭션 매니저, ORM, 드라이버와 DB에 따라 달라집니다. 데이터 보호가 필요하다면 권한과 애플리케이션 규칙도 설계해야 합니다.

**주의:** 애너테이션 하나로 모든 쓰기가 강제 차단된다고 가정하지 않습니다.

[공식 참고 자료](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)

### Mock, Stub, Fake

연결 단계: 테스트 전략과 품질

Stub은 정해진 응답을 주고, Fake는 메모리 저장소처럼 단순화된 동작을 제공합니다. Mock은 기대한 호출 같은 상호작용을 검증하는 데 사용됩니다. 어떤 라이브러리를 쓰는지보다 테스트에서 대역이 맡는 역할을 먼저 구분합니다.

**주의:** 내부 호출 순서를 과도하게 검증하면 동작이 같은 리팩터링에도 테스트가 깨질 수 있습니다.

[공식 참고 자료](https://site.mockito.org/)

### 테스트의 롤백이 숨기는 것

연결 단계: 테스트 전략과 품질, JPA와 트랜잭션

테스트에 적용한 트랜잭션과 실제 HTTP 요청을 처리하는 서버 스레드의 트랜잭션은 같지 않을 수 있습니다. 또 테스트가 항상 롤백된다면 커밋 시점의 제약조건이나 이벤트 처리를 충분히 검증하지 못할 수 있습니다.

**주의:** 실제 HTTP 통합 테스트에서는 테스트 종료 후 데이터 정리 방법을 명시합니다.

[공식 참고 자료](https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html)

### 스레드, 가상 스레드, 코루틴

연결 단계: 동시성 그리고 성능

스레드는 JVM의 실행 단위이며 가상 스레드는 많은 동시 작업을 지원하기 위한 경량 스레드입니다. Kotlin 코루틴은 중단과 재개, 수명과 취소를 표현하는 프로그래밍 모델입니다. 어떤 방식을 쓰든 DB 풀과 외부 API가 감당할 수 있는 동시성은 별도로 제한해야 합니다.

**주의:** suspend가 붙은 함수 안에서 블로킹 API를 호출해도 저절로 논블로킹으로 바뀌지는 않습니다.

[공식 참고 자료](https://kotlinlang.org/docs/coroutines-basics.html)

### jar, bootJar, WAR

연결 단계: 배포와 운영, Spring Boot와 애플리케이션 구성

일반 JAR은 클래스와 자원을 묶는 형식입니다. Boot Gradle 플러그인의 bootJar는 실행에 필요한 의존성과 로더를 포함한 실행 가능한 아카이브를 만듭니다. WAR은 Servlet 컨테이너에 배포하는 웹 애플리케이션 형식입니다.

**주의:** 파일 확장자가 jar라고 모두 java -jar로 실행할 수 있는 것은 아닙니다.

[공식 참고 자료](https://docs.spring.io/spring-boot/gradle-plugin/packaging.html)

### liveness와 readiness

연결 단계: 배포와 운영

liveness는 프로세스를 다시 시작해야 할 상태인지, readiness는 요청을 받을 준비가 되었는지 판단하는 신호입니다. 외부 서비스 장애를 무조건 liveness 실패로 처리하면 불필요한 재시작을 반복할 수 있습니다.

**주의:** health가 성공한다고 모든 비즈니스 요청과 의존 서비스가 정상이라는 뜻은 아닙니다.

[공식 참고 자료](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html)

### 멱등성과 중복 요청

연결 단계: HTTP와 웹의 기본, 설계와 종합 프로젝트

멱등성은 같은 작업을 반복했을 때 의도한 서버 상태의 효과가 한 번 수행한 것과 같다는 성질입니다. 주문 생성처럼 중복 처리가 위험한 작업에는 멱등성 키와 저장된 처리 결과를 함께 설계할 수 있습니다.

**주의:** 키의 존재를 확인한 뒤 저장하는 두 동작 사이에도 경쟁 상태가 생길 수 있어 원자성과 DB 제약조건을 고려해야 합니다.

[공식 참고 자료](https://www.rfc-editor.org/rfc/rfc9110)

## 시뮬레이터 제작 순서

1. Bean 생성과 의존성 해결: 정상 주입·후보 중복·순환 의존성.
2. MVC 요청 처리: 정상·검증 실패·인증 실패·도메인 예외.
3. 트랜잭션과 프록시: 외부 호출·내부 호출·롤백·전파.
4. 영속성 컨텍스트와 N+1: 조회·수정·flush·fetch 전략.
5. 동시 재고 차감: 경쟁 상태·조건부 갱신·낙관적 락.

## 버전 확인 자료

- [Java 지원 로드맵](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)
- [Spring Boot 시스템 요구사항](https://docs.spring.io/spring-boot/system-requirements.html)
- [Gradle Java 호환성](https://docs.gradle.org/current/userguide/compatibility.html)
- [Kotlin Gradle 설정](https://kotlinlang.org/docs/gradle-configure-project.html)
