package study
import java.math.BigInteger
class KotlinPurchase(lines: List<KotlinOrderLine>, discountPercent: Int) {
    val total: Long
    private var cancelled = false
    init {
        require(lines.isNotEmpty() && discountPercent in 0..100)
        val subtotal = lines.toList().fold(0L) { sum, line -> Math.addExact(sum, line.total()) }
        val discount = BigInteger.valueOf(subtotal).multiply(BigInteger.valueOf(discountPercent.toLong()))
            .divide(BigInteger.valueOf(100)).longValueExact()
        total = Math.subtractExact(subtotal, discount)
    }
    fun state(): String = if (cancelled) "CANCELLED" else "PLACED"
    fun cancel() { cancelled = true }
}
