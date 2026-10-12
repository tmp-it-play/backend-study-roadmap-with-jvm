package study.orders;
import java.time.Instant;
import java.util.*;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
@Repository
@Profile("memory")
public class MemoryOrderStore implements OrderStore {
    private int stock = 10;
    private final Map<UUID, OrderView> orders = new LinkedHashMap<>();
    @Override public synchronized List<ProductView> products() {
        return List.of(new ProductView(1, "JVM 노트", 12000, stock));
    }
    @Override public synchronized OrderView place(String owner, String key, long productId, int quantity) {
        var previous = orders.values().stream().filter(o -> o.owner().equals(owner) && o.requestKey().equals(key)).findFirst();
        if (previous.isPresent()) {
            var order = previous.get();
            if (order.productId() != productId || order.quantity() != quantity)
                throw new OrderFailure(409, "같은 요청 키에 다른 주문을 보낼 수 없습니다.");
            return order;
        }
        if (productId != 1) throw new OrderFailure(404, "상품이 없습니다.");
        if (stock < quantity) throw new OrderFailure(409, "재고가 부족합니다.");
        var order = new OrderView(UUID.randomUUID(), owner, key, 1, "JVM 노트", quantity,
                Math.multiplyExact(12000L, quantity), "PLACED", Instant.now());
        stock -= quantity; orders.put(order.id(), order); return order;
    }
    @Override public synchronized OrderView get(String owner, UUID id) {
        var order = orders.get(id);
        if (order == null || !order.owner().equals(owner)) throw new OrderFailure(404, "주문이 없습니다.");
        return order;
    }
    @Override public synchronized List<OrderView> list(String owner) {
        return orders.values().stream().filter(o -> o.owner().equals(owner)).toList();
    }
    @Override public synchronized OrderView cancel(String owner, UUID id) {
        var order = get(owner, id);
        if (order.state().equals("CANCELLED")) return order;
        stock += order.quantity();
        var cancelled = new OrderView(order.id(), owner, order.requestKey(), order.productId(), order.productName(),
            order.quantity(), order.total(), "CANCELLED", order.createdAt());
        orders.put(id, cancelled); return cancelled;
    }
}
