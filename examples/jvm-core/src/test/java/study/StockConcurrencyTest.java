package study;

import org.junit.jupiter.api.Test;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.function.BooleanSupplier;
import java.util.function.IntSupplier;
import static org.junit.jupiter.api.Assertions.*;

class StockConcurrencyTest {
    private void lastItemHasOneWinner(BooleanSupplier reserve, IntSupplier remaining) throws Exception {
        var ready = new CountDownLatch(2);
        var start = new CountDownLatch(1);
        try (var workers = Executors.newVirtualThreadPerTaskExecutor()) {
            var task = (java.util.concurrent.Callable<Boolean>) () -> {
                ready.countDown();
                if (!start.await(5, TimeUnit.SECONDS)) throw new AssertionError("시작 신호 시간 초과");
                return reserve.getAsBoolean();
            };
            var first = workers.submit(task);
            var second = workers.submit(task);
            try { assertTrue(ready.await(5, TimeUnit.SECONDS)); }
            finally { start.countDown(); }
            int successes = (first.get(5, TimeUnit.SECONDS) ? 1 : 0)
                + (second.get(5, TimeUnit.SECONDS) ? 1 : 0);
            assertEquals(1, successes);
            assertEquals(0, remaining.getAsInt());
        }
    }

    @Test void javaLastItemIsReservedOnce() throws Exception {
        var stock = new JavaStock(1);
        lastItemHasOneWinner(() -> stock.reserve(1), stock::remaining);
    }

    @Test void kotlinLastItemIsReservedOnce() throws Exception {
        var stock = new KotlinStock(1);
        lastItemHasOneWinner(() -> stock.reserve(1), stock::remaining);
    }

    @Test void invalidRequestsDoNotChangeStock() {
        var javaStock = new JavaStock(2);
        var kotlinStock = new KotlinStock(2);
        assertThrows(IllegalArgumentException.class, () -> javaStock.reserve(0));
        assertThrows(IllegalArgumentException.class, () -> kotlinStock.reserve(0));
        assertFalse(javaStock.reserve(3));
        assertFalse(kotlinStock.reserve(3));
        assertEquals(2, javaStock.remaining());
        assertEquals(2, kotlinStock.remaining());
    }
}
