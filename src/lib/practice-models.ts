export interface Trace { title: string; steps: string[]; result: string; why: string }
export function beanTrace(mode: string): Trace {
  const choices: Record<string, Trace> = {
    single: {title:'후보 하나',steps:['OrderService 생성 요청','OrderStore 후보: MemoryOrderStore 1개','생성자에 같은 Bean 참조 주입'],result:'컨텍스트 시작 성공',why:'기본 singleton scope는 한 컨테이너 안에서 같은 Bean 인스턴스를 공유합니다. 스레드 안전성을 보장하지는 않습니다.'},
    ambiguous: {title:'후보 둘',steps:['OrderService 생성 요청','OrderStore 후보: MemoryOrderStore, JpaOrderStore','@Primary·@Qualifier 등 선택 조건이 없음'],result:'NoUniqueBeanDefinitionException',why:'타입만으로 후보를 하나 정할 수 없습니다. 실제 앱은 memory 프로필에 따라 저장소 하나만 등록합니다.'},
    cycle: {title:'생성자 순환',steps:['A를 만들려면 B가 필요','B를 만들려면 A가 필요','생성이 끝난 A가 없어 순환 발견'],result:'생성 실패: 순환 의존성',why:'두 객체의 책임이나 의존 방향을 바꿔야 합니다. 생성자 순환을 설정 하나로 해결할 수 있다고 가정하지 않습니다.'},
    prototype: {title:'prototype 조회',steps:['getBean 호출 1 → 인스턴스 A','getBean 호출 2 → 인스턴스 B','A와 B의 참조 비교: 다름'],result:'조회마다 새 인스턴스',why:'singleton에 prototype을 생성자로 한 번 주입했다면 그 참조는 계속 같습니다. 이 모형은 getBean을 두 번 호출한 경우입니다.'}
  };
  return choices[mode] ?? choices.single;
}
export function mvcTrace(mode: string): Trace {
  const prefix=['요청 → Servlet Filter 체인','Security: 세션과 CSRF 확인'];
  const choices: Record<string, Trace> = {
    ok:{title:'정상 주문',steps:[...prefix,'DispatcherServlet → HandlerMapping','JSON 변환 → DTO 검증','Controller → Service → 저장소','응답 DTO → JSON'],result:'201 Created',why:'로그인·CSRF·양수 수량·재고 조건을 모두 통과했습니다.'},
    anonymous:{title:'로그인 없음',steps:[...prefix,'유효한 CSRF 토큰은 있으나 인증 정보 없음','AuthenticationEntryPoint에서 종료'],result:'401 Unauthorized',why:'이 실습 앱의 API 인증 진입점은 401을 반환합니다. Controller까지 도달하지 않습니다.'},
    csrf:{title:'CSRF 토큰 없음',steps:[...prefix,'변경 요청의 CSRF 토큰 누락','AccessDeniedHandler에서 종료'],result:'403 Forbidden',why:'로그인한 사용자도 CSRF 검사를 통과해야 합니다. 브라우저의 CORS 정책과 별개입니다.'},
    invalid:{title:'수량 0',steps:[...prefix,'DispatcherServlet → JSON 변환','@Valid: @Positive 위반','ControllerAdvice에서 오류 응답'],result:'400 Bad Request',why:'컨트롤러 메서드의 업무 로직은 실행하지 않습니다. Kotlin DTO는 @field:Positive를 사용합니다.'},
    missing:{title:'없는 상품',steps:[...prefix,'DispatcherServlet → DTO 검증 성공','Service → 저장소: 상품 없음','도메인 오류 → ProblemDetail'],result:'404 Not Found',why:'입력 형식이 올바른지와 리소스가 존재하는지는 다른 검사입니다.'},
    stock:{title:'재고 부족',steps:[...prefix,'DispatcherServlet → DTO 검증 성공','트랜잭션: 상품 락 획득 → 잔량 확인','주문 거절 → 롤백 → ProblemDetail'],result:'409 Conflict',why:'유효한 요청이지만 현재 재고 상태와 충돌합니다. 실패한 주문으로 재고를 차감하지 않습니다.'}
  };
  return choices[mode] ?? choices.ok;
}
export function transactionTrace(mode: string): Trace {
  const choices: Record<string, Trace> = {
    runtime:{title:'외부 호출과 런타임 예외',steps:['프록시 통과 → 트랜잭션 시작','재고 2 → 1, SQL flush','RuntimeException 전파','트랜잭션 롤백'],result:'재고 2 · 주문 저장 안 됨',why:'flush는 SQL 전송입니다. commit 전 실패하면 SQL이 실행됐어도 롤백할 수 있습니다.'},
    self:{title:'트랜잭션 없는 외부 메서드의 내부 호출',steps:['트랜잭션 없는 outer() 진입','this.inner() → 프록시 우회','저장소가 자체 트랜잭션으로 재고 1 커밋','이후 예외: 전체를 되돌릴 트랜잭션 없음'],result:'재고 1 · 앞선 쓰기는 남음',why:'기본 프록시 방식에서 내부 @Transactional이 적용되지 않은 경우입니다. 저장소 쓰기는 별도 트랜잭션을 갖는다는 조건으로 비교합니다.'},
    checked:{title:'기본 설정에서 checked 예외',steps:['프록시 통과 → 트랜잭션 시작','재고 2 → 1','checked 예외 전파','기본 롤백 규칙에 해당하지 않아 커밋'],result:'재고 1 · 예외가 있어도 커밋',why:'기본 설정 기준입니다. rollbackFor 또는 전체 롤백 정책을 지정하면 결과가 바뀝니다.'},
    required:{title:'REQUIRED 내부 예외를 잡음',steps:['외부 트랜잭션 시작 → 재고 1','다른 Bean의 REQUIRED 호출: 같은 물리 트랜잭션 참여','내부 런타임 예외 → rollback-only','외부가 예외를 잡아도 커밋 시 UnexpectedRollbackException'],result:'재고 2 · 전체 롤백',why:'예외를 catch했다고 rollback-only 표시가 지워지지 않습니다.'},
    new:{title:'별도 감사 기록 REQUIRES_NEW',steps:['외부 주문 트랜잭션 시작 → 재고 1','다른 Bean의 REQUIRES_NEW: 외부 일시 중단','별도 감사 테이블 기록 1건 커밋','외부 주문 실패 → 외부만 롤백'],result:'재고 2 · 감사 기록 1건 유지',why:'안쪽은 별도 커넥션과 트랜잭션을 씁니다. 같은 잠금 자원을 기다리면 교착·시간 초과가 생길 수 있습니다.'}
  };
  return choices[mode] ?? choices.runtime;
}
export function queryTrace(count: number, fetch: boolean): Trace {
  const n=Math.max(1,Math.min(12,Math.trunc(count)||1));
  return {title:fetch?'fetch join':'지연 로딩',
    steps:fetch?['SELECT orders JOIN products → 주문과 상품 함께 조회','각 주문의 상품 이름 접근 → 추가 SQL 없음']:
      ['SELECT orders → 주문 목록 조회',...Array.from({length:n},(_,i)=>'주문 '+(i+1)+'의 상품 이름 접근 → SELECT products WHERE id = '+(i+1))],
    result:'SQL '+(fetch?1:n+1)+'회',
    why:'주문 '+n+'개가 서로 다른 상품을 참조하고, 1·2차 캐시가 비어 있으며 배치 로딩이 없는 조건입니다. 같은 상품을 공유하거나 캐시·배치 설정이 있으면 횟수가 달라집니다.'};
}
export type Actor = 'A'|'B';
export interface StockState { stock:number; sold:number; reads:Partial<Record<Actor,number>>; done:Actor[]; log:string[] }
export const newStock = ():StockState => ({stock:1,sold:0,reads:{},done:[],log:[]});
export function stockStep(state:StockState,actor:Actor,atomic:boolean):StockState {
  if(state.done.includes(actor)) return state;
  if(atomic) {
    const success=state.stock>0;
    return {...state,stock:success?state.stock-1:state.stock,sold:state.sold+Number(success),done:[...state.done,actor],
      log:[...state.log,actor+': 조건 검사와 차감을 한 번에 → '+(success?'성공':'재고 부족')]};
  }
  if(state.reads[actor]===undefined) return {...state,reads:{...state.reads,[actor]:state.stock},log:[...state.log,actor+': 재고 '+state.stock+' 읽음']};
  const read=state.reads[actor]!;
  return {...state,stock:read>0?read-1:state.stock,sold:state.sold+Number(read>0),done:[...state.done,actor],
    log:[...state.log,actor+': 읽어 둔 값 '+read+' 기준 → '+(read>0?'성공, '+(read-1)+' 저장':'재고 부족')]};
}
