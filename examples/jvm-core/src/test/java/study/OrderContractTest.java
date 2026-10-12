package study;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import java.util.HashMap;
import static org.junit.jupiter.api.Assertions.*;

class OrderContractTest {
    @ParameterizedTest
    @CsvSource({"1200, 3, 3600", "0, 1, 0", "1, 2147483647, 2147483647"})
    void bothLanguagesCalculateTheSameTotal(long price, int quantity, long total) {
        assertEquals(total, new JavaOrderLine(price, quantity).total());
        assertEquals(total, new KotlinOrderLine(price, quantity).total());
    }

    @ParameterizedTest
    @ValueSource(ints = {0, -1, Integer.MIN_VALUE})
    void bothLanguagesRejectNonPositiveQuantity(int quantity) {
        assertThrows(IllegalArgumentException.class, () -> new JavaOrderLine(1200, quantity));
        assertThrows(IllegalArgumentException.class, () -> new KotlinOrderLine(1200, quantity));
    }

    @Test void rejectsNegativePrice() {
        assertThrows(IllegalArgumentException.class, () -> new JavaOrderLine(-1, 1));
        assertThrows(IllegalArgumentException.class, () -> new KotlinOrderLine(-1, 1));
    }

    @Test void detectsOverflowInBothLanguages() {
        assertThrows(ArithmeticException.class, () -> new JavaOrderLine(Long.MAX_VALUE, 2).total());
        assertThrows(ArithmeticException.class, () -> new KotlinOrderLine(Long.MAX_VALUE, 2).total());
    }

    @Test void equalRecordsCanRetrieveTheSameMapEntry() {
        record OrderId(long value) {}
        var first = new OrderId(7);
        var second = new OrderId(7);
        var orders = new HashMap<OrderId, String>();
        orders.put(first, "PAID");
        assertNotSame(first, second);
        assertEquals("PAID", orders.get(second));
    }
}
