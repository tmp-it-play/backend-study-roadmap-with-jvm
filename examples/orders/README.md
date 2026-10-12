# Spring Boot 주문 API 실습

상품 조회, 주문 생성·취소, 로그인과 접근 제어를 직접 확인합니다. Java와 Kotlin API가 같은 주문 규칙을 사용합니다.

## DB 없이 시작

JDK 25에서 이 폴더로 이동해 실행합니다.

```sh
./gradlew bootRun --args="--spring.profiles.active=memory"
```

[상품 목록](http://127.0.0.1:8080/api/products)을 열어 보세요. 메모리 모드는 재시작하면 재고 10개로 돌아갑니다.

다른 터미널에서 같은 폴더로 이동해 요청을 검증합니다.

```sh
python3 scripts/walkthrough.py
```

alice와 bob으로 로그인해 정상 주문·재전송·잘못된 입력·타인 주문 접근·CSRF·취소를 확인합니다. [요청 모음](requests.http)으로 하나씩 보내도 됩니다.

## PostgreSQL로 실행

메모리 서버를 Ctrl+C로 종료한 뒤 실행합니다. Docker가 필요합니다.

```sh
docker compose up -d db
./gradlew bootRun
```

앱 시작 시 스키마와 실습 상품을 준비합니다. 같은 walkthrough를 다시 실행해 보세요. DB의 주문 이력은 재시작해도 남습니다.

## 테스트

```sh
./gradlew test
./gradlew postgresTest
```

첫 명령은 Bean·프록시·메모리 API와 선택 심화 실험을, 두 번째는 실제 PostgreSQL의 롤백·동시 주문·중복 요청·N+1·격리를 검증합니다. PostgreSQL 테스트는 별도 임시 컨테이너를 사용하며 Docker가 필요합니다.

[컨테이너와 장애 복구](OPERATIONS.md) · [선택 심화](ADVANCED.md) · [설계 기록](ADR.md)

이 예제는 로컬 학습용입니다. 계정은 alice/alice-pass, bob/bob-pass, admin/admin-pass입니다. 취소된 주문도 같은 요청 키를 다시 사용하면 기존 주문을 반환합니다. 새 주문에는 새 키를 사용하세요. 재전송도 최초 생성과 같은 201·주문 ID를 반환합니다.

실행 기준: Spring Boot 4.1.1, Kotlin 2.3.21, Gradle 9.1.0, JDK 25, PostgreSQL 17.6.
