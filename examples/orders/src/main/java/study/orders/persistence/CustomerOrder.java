package study.orders.persistence;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;
import study.orders.OrderStore;
@Entity
@Table(name = "customer_orders")
public class CustomerOrder {
    @Id public UUID id;
    @Column(nullable = false) public String owner;
    @Column(name = "request_key", nullable = false) public String requestKey;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id") public Product product;
    public int quantity;
    public long total;
    public String state;
    @Column(name = "created_at") public Instant createdAt;
    protected CustomerOrder() {}
    CustomerOrder(String owner, String key, Product product, int quantity) {
        id = UUID.randomUUID(); this.owner = owner; requestKey = key; this.product = product;
        this.quantity = quantity; total = Math.multiplyExact(product.getPrice(), quantity);
        state = "PLACED"; createdAt = Instant.now();
    }
    public OrderStore.OrderView view() {
        return new OrderStore.OrderView(id, owner, requestKey, product.getId(), product.getName(),
            quantity, total, state, createdAt);
    }
}
