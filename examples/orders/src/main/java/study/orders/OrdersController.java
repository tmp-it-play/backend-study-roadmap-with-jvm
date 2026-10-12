package study.orders;
import jakarta.validation.Valid;
import java.security.Principal;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
public class OrdersController {
    private final OrderService service;
    private final OrderStore store;
    public OrdersController(OrderService service, OrderStore store) {
        this.service = service; this.store = store;
    }
    @GetMapping("/products")
    public List<OrderStore.ProductView> products() { return store.products(); }
    @PostMapping("/orders")
    public ResponseEntity<OrderStore.OrderView> place(Principal user,
            @RequestHeader("Idempotency-Key") String key, @Valid @RequestBody OrderRequest request) {
        var order = service.place(user.getName(), key, request.getProductId(), request.getQuantity());
        return ResponseEntity.created(URI.create("/api/orders/" + order.id())).body(order);
    }
    @GetMapping("/orders")
    public List<OrderStore.OrderView> list(Principal user) { return store.list(user.getName()); }
    @GetMapping("/orders/{id}")
    public OrderStore.OrderView get(Principal user, @PathVariable UUID id) { return store.get(user.getName(), id); }
    @PostMapping("/orders/{id}/cancel")
    public OrderStore.OrderView cancel(Principal user, @PathVariable UUID id) { return store.cancel(user.getName(), id); }
}
