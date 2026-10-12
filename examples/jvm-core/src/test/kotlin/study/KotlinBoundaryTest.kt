package study

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class KotlinBoundaryTest {
    @Test fun `null과 빈 별명은 익명으로 표시한다`() {
        assertEquals("익명", displayName(null))
        assertEquals("익명", displayName("  "))
        assertEquals("alice", displayName(" alice "))
    }

    @Test fun `주문 ID는 양수 문자열만 허용한다`() {
        assertEquals(7L, parseOrderId("7"))
        for (input in listOf(null, "abc", "0", "-1", "9223372036854775808")) {
            assertThrows(IllegalArgumentException::class.java) { parseOrderId(input) }
        }
    }

    @Test fun `data class copy는 내부 목록을 공유한다`() {
        data class Cart(val items: MutableList<String>)
        val original = Cart(mutableListOf("pen"))
        val copied = original.copy()
        copied.items += "mug"
        assertNotSame(original, copied)
        assertSame(original.items, copied.items)
        assertEquals(listOf("pen", "mug"), original.items)
    }

    @Test fun `읽기 전용 참조와 목록 복사는 다르다`() {
        val source = mutableListOf("pen", "mug")
        val view: List<String> = source
        val snapshot = source.toList()
        source += "book"
        assertEquals(3, view.size)
        assertEquals(2, snapshot.size)
    }
}
