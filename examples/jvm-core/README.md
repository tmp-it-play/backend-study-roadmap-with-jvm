# Java·Kotlin 기본 실습

같은 주문을 Java와 Kotlin으로 계산하고, null·동등성·복사·동시성의 차이를 확인합니다.

JDK 25에서 이 폴더로 이동해 실행합니다.

```sh
./gradlew test
```

테스트 결과는 `build/reports/tests/test/index.html`에서 볼 수 있습니다. Windows에서는 `gradlew.bat test`를 사용하세요.

## 직접 바꿔 보기

- `PurchaseTest`: 품목과 할인율을 바꾸고 취소를 두 번 실행합니다.
- `KotlinBoundaryTest`: null과 공백을 넣고, 원본 컬렉션을 수정한 뒤 복사본을 비교합니다.
- `StockConcurrencyTest`: 마지막 재고 1개를 두 요청이 동시에 주문합니다.

두 Gradle DSL의 같은 태스크도 비교할 수 있습니다.

```sh
./gradlew greet
./gradlew -p dsl-groovy greet
```

두 명령 모두 `hello JVM`을 출력합니다.

[다음: Spring Boot 주문 API](../orders/README.md)

실행 기준: JDK 25, Gradle 9.1.0, Kotlin 2.3.21, JUnit 6.0.0. 처음 실행할 때 의존성을 받기 위한 네트워크가 필요합니다.
