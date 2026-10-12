import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beanTrace, mvcTrace, transactionTrace, queryTrace, newStock, stockStep } from '../src/lib/practice-models.ts';
test('동시에 옛값을 읽으면 잔량이 0이어도 초과 판매한다',()=>{
 let s=newStock(); for(const actor of ['A','B','A','B']) s=stockStep(s,actor,false);
 assert.equal(s.stock,0); assert.equal(s.sold,2);
});
test('원자적 차감은 요청 순서와 중복 클릭에 관계없이 마지막 1개만 판매한다',()=>{
 for(const actors of [['A','B','A'],['B','A','B']]) {
  let s=newStock(); for(const actor of actors) s=stockStep(s,actor,true);
  assert.equal(s.stock,0); assert.equal(s.sold,1); assert.equal(s.done.length,2);
 }
});
test('분리된 읽기·쓰기도 겹치지 않으면 초과 판매하지 않는다',()=>{
 let s=newStock(); for(const actor of ['A','A','B','B']) s=stockStep(s,actor,false);
 assert.equal(s.sold,1);
});
test('N+1 모형은 명시한 서로 다른 상품 조건에서 쿼리 수를 비교한다',()=>{
 assert.equal(queryTrace(3,false).result,'SQL 4회'); assert.equal(queryTrace(3,true).result,'SQL 1회');
 assert.equal(queryTrace(1,false).result,'SQL 2회');
});
test('인증, CSRF, 검증은 서로 다른 실패를 보여 준다',()=>{
 assert.equal(mvcTrace('anonymous').result,'401 Unauthorized');
 assert.equal(mvcTrace('csrf').result,'403 Forbidden');
 assert.equal(mvcTrace('invalid').result,'400 Bad Request');
 assert.equal(mvcTrace('stock').result,'409 Conflict');
});
test('기본 롤백 정책과 별도 트랜잭션의 결과를 구분한다',()=>{
 assert.match(transactionTrace('runtime').result,/재고 2/);
 assert.match(transactionTrace('checked').result,/재고 1/);
 assert.match(transactionTrace('required').result,/전체 롤백/);
 assert.match(transactionTrace('new').result,/감사 기록 1건 유지/);
 assert.match(beanTrace('ambiguous').result,/NoUniqueBeanDefinition/);
});
