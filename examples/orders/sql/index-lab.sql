-- 세션 종료 시 사라지는 별도 테이블에서 비교한다.
CREATE TEMP TABLE plan_orders AS
SELECT n AS id, n % 1000 AS owner_id, now() - n * interval '1 minute' AS created_at
FROM generate_series(1, 100000) AS n;
ANALYZE plan_orders;
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM plan_orders WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 10;
CREATE INDEX ON plan_orders (owner_id, created_at DESC);
ANALYZE plan_orders;
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM plan_orders WHERE owner_id = 42 ORDER BY created_at DESC LIMIT 10;
