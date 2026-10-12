package study.orders;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
public interface OrderStore {
    record ProductView(long id, String name, long price, int stock) {}
    record OrderView(UUID id, String owner, String requestKey, long productId, String productName,
                     int quantity, long total, String state, Instant createdAt) {}
    List<ProductView> products();
    OrderView place(String owner, String key, long productId, int quantity);
    OrderView get(String owner, UUID id);
    List<OrderView> list(String owner);
    OrderView cancel(String owner, UUID id);
}
