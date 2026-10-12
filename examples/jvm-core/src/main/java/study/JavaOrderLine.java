package study;

public record JavaOrderLine(long unitPrice, int quantity) {
    public JavaOrderLine {
        if (unitPrice < 0 || quantity <= 0) {
            throw new IllegalArgumentException("가격은 0 이상, 수량은 양수여야 합니다");
        }
    }

    public long total() {
        return Math.multiplyExact(unitPrice, quantity);
    }
}
