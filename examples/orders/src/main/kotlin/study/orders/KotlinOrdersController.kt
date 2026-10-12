package study.orders
import jakarta.validation.Valid
import java.net.URI
import java.security.Principal
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
@RestController
@RequestMapping("/api/kotlin/orders")
class KotlinOrdersController(private val service: OrderService) {
    @PostMapping
    fun place(user: Principal, @RequestHeader("Idempotency-Key") key: String,
              @Valid @RequestBody request: OrderRequest): ResponseEntity<OrderStore.OrderView> {
        val order = service.place(user.name, key, requireNotNull(request.productId), requireNotNull(request.quantity))
        return ResponseEntity.created(URI.create("/api/orders/${order.id()}")).body(order)
    }
}
