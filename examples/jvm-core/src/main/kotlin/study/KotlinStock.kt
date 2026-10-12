package study

class KotlinStock(initial: Int) {
    init { require(initial >= 0) }
    private var remaining = initial

    @Synchronized fun reserve(quantity: Int): Boolean {
        require(quantity > 0)
        if (quantity > remaining) return false
        remaining -= quantity
        return true
    }

    @Synchronized fun remaining(): Int = remaining
}
