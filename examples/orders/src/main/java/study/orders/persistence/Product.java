package study.orders.persistence;
import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {
    @Id public Long id;
    @Column(nullable = false) public String name;
    public long price;
    public int stock;
    @Version public long version;
    protected Product() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public long getPrice() { return price; }
    public int getStock() { return stock; }
    public void reserve(int quantity) {
        if (quantity < 1 || stock < quantity) throw new study.orders.OrderFailure(409, "재고가 부족합니다.");
        stock -= quantity;
    }
    public void restore(int quantity) { stock = Math.addExact(stock, quantity); }
}
