package study.orders;
import org.springframework.stereotype.Service;
@Service
public class OrderService {
    private final OrderStore store;
    private final OrderProperties properties;
    public OrderService(OrderStore store, OrderProperties properties) {
        this.store = store; this.properties = properties;
    }
    public OrderStore.OrderView place(String owner, String key, long productId, int quantity) {
        if (key == null || key.isBlank() || key.length() > 64)
            throw new OrderFailure(400, "요청 키는 1~64자여야 합니다.");
        if (quantity < 1 || quantity > properties.maxQuantity())
            throw new OrderFailure(400, "수량은 1~" + properties.maxQuantity() + "개여야 합니다.");
        return store.place(owner, key, productId, quantity);
    }
}
