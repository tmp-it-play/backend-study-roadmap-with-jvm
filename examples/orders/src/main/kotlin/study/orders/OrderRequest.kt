package study.orders
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Positive
data class OrderRequest(
    @field:NotNull @field:Positive val productId: Long?,
    @field:NotNull @field:Positive val quantity: Int?
)
