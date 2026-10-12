package study;
import java.util.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;
class PurchaseTest {
    @Test void sameDiscountAndCancellation() {
        var java=new JavaPurchase(List.of(new JavaOrderLine(10000,1)),10);
        var kotlin=new KotlinPurchase(List.of(new KotlinOrderLine(10000,1)),10);
        assertEquals(9000,java.total()); assertEquals(java.total(),kotlin.getTotal());
        java.cancel(); java.cancel(); kotlin.cancel(); kotlin.cancel();
        assertEquals("CANCELLED",java.state()); assertEquals(java.state(),kotlin.state());
    }
    @ParameterizedTest @ValueSource(ints={-1,101})
    void invalidDiscount(int percent) {
        assertThrows(IllegalArgumentException.class,()->new JavaPurchase(List.of(new JavaOrderLine(100,1)),percent));
        assertThrows(IllegalArgumentException.class,()->new KotlinPurchase(List.of(new KotlinOrderLine(100,1)),percent));
    }
    @Test void capturesAmountAndChecksOverflow() {
        var lines=new ArrayList<>(List.of(new JavaOrderLine(10000,1)));
        var order=new JavaPurchase(lines,0); lines.clear(); assertEquals(10000,order.total());
        assertThrows(ArithmeticException.class,()->new JavaPurchase(List.of(new JavaOrderLine(Long.MAX_VALUE,1),new JavaOrderLine(1,1)),0));
        assertThrows(ArithmeticException.class,()->new KotlinPurchase(List.of(new KotlinOrderLine(Long.MAX_VALUE,1),new KotlinOrderLine(1,1)),0));
    }
}
