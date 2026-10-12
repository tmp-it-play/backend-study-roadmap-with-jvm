# 실습 시작하기

브라우저에서 순서를 확인한 뒤 같은 동작을 코드로 실행해 보세요.

- [브라우저 실습 열기](http://127.0.0.1:3000/practice/)
- [Java·Kotlin 기본 실습](jvm-core/README.md)
- [Spring Boot 주문 API 실습](orders/README.md)

코드 실습에는 JDK 25가 필요합니다. PostgreSQL·컨테이너 실습에는 Docker, HTTP 자동 확인에는 Python 3도 사용합니다. Gradle은 포함된 Wrapper로 실행합니다. Windows에서는 `./gradlew` 대신 `gradlew.bat`를 사용하세요.

처음에는 기본 실습의 테스트를 실행하고, 주문 API는 DB가 필요 없는 memory 모드부터 시작하세요. 각 단계에서 조건을 한 가지씩 바꾸고 예상과 실제 결과를 비교합니다.
