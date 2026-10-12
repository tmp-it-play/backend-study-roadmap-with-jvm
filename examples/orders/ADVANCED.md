# 선택 심화 실험

기본 과정을 마친 뒤 필요한 주제 하나를 고릅니다. 결과와 도입 판단은 [ADR](ADR.md)에 남깁니다.

| 주제 | 실행해 볼 것 | 판단할 질문 |
| --- | --- | --- |
| 리액티브 | `./gradlew test --tests "*AdvancedLabTest.demandControlsDelivery"` | 요청량을 0·2·4로 바꾸면 전달되는 원소 수가 어떻게 달라지는가? |
| 메시징 | `./gradlew test --tests "*AdvancedLabTest.duplicateEventUsesStableId"` | 중복 이벤트를 제거하는 키를 매번 새로 만들면 어떤 업무 변경이 반복되는가? |
| 배치 | `./gradlew test --tests "*AdvancedLabTest.restartFromCommittedChunk"` | 실패한 청크의 출력만 남고 체크포인트가 저장되지 않으면 재시작 결과는 어떻게 되는가? |
| 분산 처리 | 주문 앱에 같은 Idempotency-Key를 동시에 두 번 보내는 `postgresTest` 실행 | 사용자 행 락 대신 애플리케이션의 synchronized만 사용하면 여러 서버에서 보장이 유지되는가? |
| Native | 아래의 최소 프로그램을 JVM·Native로 실행 | 시작 시간과 빌드 시간 중 현재 요구사항에 중요한 것은 무엇인가? |
| 특화 저장소 | `./gradlew test --tests "*AdvancedLabTest.invalidationRemovesStaleCacheEntry"` | TTL·무효화·허용 가능한 오래된 값의 범위는 무엇인가? |

리액티브 실험은 실제 Reactor를 사용합니다. 중복 소비·청크·캐시 실험은 실패 규칙을 이해하는 메모리 모형입니다. 실제 Kafka·Spring Batch·Redis의 영속성이나 다중 프로세스 보장까지 검증하지는 않습니다. 도입할 기술의 장애·재시작 실험을 별도로 추가해 판단합니다.

## JVM과 Native 비교

GraalVM 25와 C/C++ 빌드 도구가 설치된 환경에서 실행합니다. 주문 앱 전체의 Native 변환과는 별개인 최소 프로그램입니다.

```sh
mkdir -p build/native
javac -d build/native native/NativeProbe.java
java -cp build/native NativeProbe
native-image --no-fallback -cp build/native NativeProbe build/native/hello
./build/native/hello
```

두 실행 모두 `hello JVM`을 출력해야 합니다. 컴파일 시간, 실행 파일 크기, 반복 실행의 시작 시간을 기록합니다. 이 결과로 Spring 앱의 리플렉션·리소스·AOT 호환성까지 판단하지 않습니다.

## 외부 시스템으로 넓힐 때

메시징은 outbox 저장과 업무 변경을 같은 DB 트랜잭션으로 묶고, 소비 기록과 처리 결과도 함께 커밋합니다. 브로커 재전달 뒤 같은 이벤트가 중복 처리되지 않는지 확인하세요.

배치는 메모리 목록 대신 JobRepository에 실행 상태를 남기고 청크 도중 프로세스를 종료했다가 같은 파라미터로 재시작합니다. 캐시는 Redis를 중단하거나 TTL을 짧게 바꿔 원본 DB의 정합성과 응답 시간을 비교합니다.
