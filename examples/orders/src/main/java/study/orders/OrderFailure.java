package study.orders;
public class OrderFailure extends RuntimeException {
    private final int status;
    public OrderFailure(int status, String message) { super(message); this.status = status; }
    public int status() { return status; }
}
