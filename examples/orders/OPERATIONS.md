# 로컬 운영 실습

명령은 `examples/orders`에서 실행합니다. 실습 계정과 DB 비밀번호가 고정된 로컬 환경이며 호스트 포트는 127.0.0.1에만 연결합니다.

## 시작과 확인

```sh
docker compose up -d --build
docker compose ps
curl -i http://127.0.0.1:8080/actuator/health
python3 scripts/walkthrough.py
docker compose logs --tail=50 app
```

처음에는 이미지와 의존성을 받습니다. 앱 시작이 끝나면 health가 200·UP입니다. walkthrough는 취소된 주문 이력을 남기고 재고는 원래 수량으로 돌려놓습니다.

## DB 장애와 복구

```sh
docker compose stop db
curl -i http://127.0.0.1:8080/actuator/health
docker compose start db
```

커넥션 타임아웃 뒤 health는 503·DOWN이 됩니다. DB가 다시 healthy가 된 뒤 상품 목록과 health를 재확인합니다. 살아 있는 프로세스와 정상 업무 처리를 구분하세요.

## 백업과 별도 DB 복원

```sh
mkdir -p build
docker compose exec -T db pg_dump -U orders -d orders > build/orders-backup.sql
docker compose exec db createdb -U orders orders_restore
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U orders -d orders_restore < build/orders-backup.sql
docker compose exec db psql -U orders -d orders -c 'select count(*) from customer_orders'
docker compose exec db psql -U orders -d orders_restore -c 'select count(*) from customer_orders'
```

기존에 orders_restore가 있으면 새 DB 이름을 정해 같은 명령에 사용하세요. 원본 DB를 덮어쓰지 않습니다. 두 건수와 상품 재고를 비교합니다.

## 이미지 롤백

변경 전에 `docker image tag jvm-roadmap-orders:lab jvm-roadmap-orders:previous`로 로컬 이미지를 보관합니다. 변경을 빌드한 뒤 문제가 있다면 다음 순서로 이전 이미지를 다시 실행합니다.

```sh
docker image tag jvm-roadmap-orders:previous jvm-roadmap-orders:lab
docker compose up -d --no-build --force-recreate app
curl -i http://127.0.0.1:8080/actuator/health
```

DB 스키마 변경까지 자동으로 되돌리지는 않습니다. 이전 앱이 새 스키마를 읽을 수 있는지 확인하는 별도 실습으로 확장하세요.

## 종료

```sh
docker compose down
```

DB 볼륨은 유지됩니다. 데이터 초기화가 필요한 경우에만 이 실습 프로젝트에서 `docker compose down -v`를 사용합니다.
