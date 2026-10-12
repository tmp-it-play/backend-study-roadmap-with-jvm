package study.orders.persistence;
import jakarta.persistence.*;
import java.util.*;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import study.orders.*;

@Repository
@Profile("!memory")
@Transactional
public class JpaOrderStore implements OrderStore {
    @PersistenceContext EntityManager em;
    private void lockOwner(String owner) {
        // 같은 사용자의 중복 키 확인·생성·취소를 DB 행 락으로 직렬화한다.
        if (em.find(Member.class, owner, LockModeType.PESSIMISTIC_WRITE) == null)
            throw new OrderFailure(401, "실습 계정이 없습니다.");
    }
    @Override @Transactional(readOnly = true)
    public List<ProductView> products() {
        return em.createQuery("select p from Product p order by p.id", Product.class).getResultStream()
            .map(p -> new ProductView(p.getId(), p.getName(), p.getPrice(), p.getStock())).toList();
    }
    @Override
    public OrderView place(String owner, String key, long productId, int quantity) {
        lockOwner(owner);
        var previous = em.createQuery("select o from CustomerOrder o where o.owner=:owner and o.requestKey=:key", CustomerOrder.class)
            .setParameter("owner", owner).setParameter("key", key).getResultStream().findFirst();
        if (previous.isPresent()) {
            var order = previous.get();
            if (order.product.getId() != productId || order.quantity != quantity)
                throw new OrderFailure(409, "같은 요청 키에 다른 주문을 보낼 수 없습니다.");
            return order.view();
        }
        var product = em.find(Product.class, productId, LockModeType.PESSIMISTIC_WRITE);
        if (product == null) throw new OrderFailure(404, "상품이 없습니다.");
        if (product.getStock() < quantity) throw new OrderFailure(409, "재고가 부족합니다.");
        var order = new CustomerOrder(owner, key, product, quantity);
        product.reserve(quantity);
        em.persist(order);
        return order.view();
    }
    @Override @Transactional(readOnly = true)
    public OrderView get(String owner, UUID id) { return owned(owner, id).view(); }
    private CustomerOrder owned(String owner, UUID id) {
        var order = em.find(CustomerOrder.class, id);
        if (order == null || !order.owner.equals(owner)) throw new OrderFailure(404, "주문이 없습니다.");
        return order;
    }
    @Override @Transactional(readOnly = true)
    public List<OrderView> list(String owner) {
        return em.createQuery("select o from CustomerOrder o join fetch o.product where o.owner=:owner order by o.createdAt", CustomerOrder.class)
            .setParameter("owner", owner).getResultStream().map(CustomerOrder::view).toList();
    }
    @Override
    public OrderView cancel(String owner, UUID id) {
        lockOwner(owner);
        var order = owned(owner, id);
        if (order.state.equals("CANCELLED")) return order.view();
        // Product가 이미 프록시로 참조되어 있어도 DB 락과 최신 상태를 확보한다.
        var product = order.product;
        em.refresh(product, LockModeType.PESSIMISTIC_WRITE);
        product.restore(order.quantity);
        order.state = "CANCELLED";
        return order.view();
    }
}
