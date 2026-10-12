package study

data class KotlinOrderLine(val unitPrice: Long, val quantity: Int) {
    init { require(unitPrice >= 0 && quantity > 0) }
    fun total(): Long = Math.multiplyExact(unitPrice, quantity.toLong())
}

fun displayName(raw: String?): String =
    raw?.trim()?.takeIf { it.isNotEmpty() } ?: "익명"

fun parseOrderId(raw: String?): Long =
    raw?.toLongOrNull()?.takeIf { it > 0 }
        ?: throw IllegalArgumentException("양수 주문 ID가 필요합니다")
