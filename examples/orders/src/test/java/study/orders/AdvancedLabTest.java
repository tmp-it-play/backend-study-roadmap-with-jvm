package study.orders;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;
import static org.junit.jupiter.api.Assertions.*;

class AdvancedLabTest {
    @Test void demandControlsDelivery() {
        var delivered=new AtomicInteger();
        StepVerifier.create(Flux.range(1,4).doOnNext(n->delivered.incrementAndGet()),0)
            .then(()->assertEquals(0,delivered.get()))
            .thenRequest(2).expectNext(1,2)
            .then(()->assertEquals(2,delivered.get()))
            .thenRequest(2).expectNext(3,4).verifyComplete();
    }
    @Test void duplicateEventUsesStableId() {
        var processed=new HashSet<String>(); var effects=new ArrayList<String>();
        for(String event:List.of("order-1","order-1","order-2"))
            if(processed.add(event)) effects.add(event);
        assertEquals(List.of("order-1","order-2"),effects);
        // 실제 소비자는 processed 기록과 업무 변경을 같은 DB 트랜잭션으로 묶어야 한다.
    }
    @Test void restartFromCommittedChunk() {
        var source=List.of(1,2,3,4); var output=new ArrayList<Integer>(); int checkpoint=0;
        output.addAll(source.subList(0,2)); checkpoint=2; // 첫 청크 커밋
        var uncommitted=new ArrayList<>(source.subList(2,4)); uncommitted.clear(); // 두 번째 청크 실패
        output.addAll(source.subList(checkpoint,4)); // 체크포인트에서 재시작
        assertEquals(source,output); assertEquals(4,new HashSet<>(output).size());
    }
    @Test void invalidationRemovesStaleCacheEntry() {
        var database=new HashMap<Long,Integer>(); var cache=new HashMap<Long,Integer>();
        database.put(1L,2); cache.put(1L,database.get(1L));
        database.put(1L,1);
        assertEquals(2,cache.get(1L)); // DB 변경만으로 캐시는 바뀌지 않는다.
        cache.remove(1L); cache.put(1L,database.get(1L));
        assertEquals(1,cache.get(1L));
    }
}
