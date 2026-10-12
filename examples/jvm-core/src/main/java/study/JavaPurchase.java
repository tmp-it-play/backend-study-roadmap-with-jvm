package study;
import java.math.BigInteger;
import java.util.List;
public final class JavaPurchase {
    private final long total;
    private boolean cancelled;
    public JavaPurchase(List<JavaOrderLine> lines, int discountPercent) {
        if (lines.isEmpty() || discountPercent < 0 || discountPercent > 100) throw new IllegalArgumentException();
        long subtotal=0;
        for(var line:List.copyOf(lines)) subtotal=Math.addExact(subtotal,line.total());
        long discount=BigInteger.valueOf(subtotal).multiply(BigInteger.valueOf(discountPercent))
            .divide(BigInteger.valueOf(100)).longValueExact();
        total=Math.subtractExact(subtotal,discount);
    }
    public long total() { return total; }
    public String state() { return cancelled ? "CANCELLED" : "PLACED"; }
    public void cancel() { cancelled=true; }
}
