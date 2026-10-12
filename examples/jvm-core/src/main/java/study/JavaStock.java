package study;

/** A single-instance example. Shared database stock requires database coordination. */
public final class JavaStock {
    private int remaining;

    public JavaStock(int initial) {
        if (initial < 0) throw new IllegalArgumentException("음수 재고");
        remaining = initial;
    }

    public synchronized boolean reserve(int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("양수가 아닌 수량");
        if (quantity > remaining) return false;
        remaining -= quantity;
        return true;
    }

    public synchronized int remaining() { return remaining; }
}
