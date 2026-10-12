package study.orders;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest @AutoConfigureMockMvc @ActiveProfiles("memory")
class MemoryApiTest {
    @Autowired MockMvc mvc;
    @Autowired OrderStore store;
    @MockitoSpyBean OrderService service;
    @ParameterizedTest @ValueSource(strings={"/api/orders","/api/kotlin/orders"})
    void bothLanguagesValidateAndPlace(String route) throws Exception {
        clearInvocations(service);
        mvc.perform(post(route).with(user("alice")).with(csrf()).header("Idempotency-Key",route)
            .contentType("application/json").content("{\"productId\":1,\"quantity\":0}")).andExpect(status().isBadRequest());
        verify(service, never()).place(anyString(), anyString(), anyLong(), anyInt());
        mvc.perform(post(route).with(user("alice")).with(csrf()).header("Idempotency-Key",route)
            .contentType("application/json").content("{\"productId\":1,\"quantity\":1}"))
            .andExpect(status().isCreated()).andExpect(jsonPath("$.total").value(12000));
    }
    @Test void authAndCsrf() throws Exception {
        mvc.perform(get("/api/orders")).andExpect(status().isUnauthorized());
        mvc.perform(post("/api/orders").with(user("alice")).header("Idempotency-Key","csrf")
            .contentType("application/json").content("{\"productId\":1,\"quantity\":1}"))
            .andExpect(status().isForbidden());
        mvc.perform(get("/actuator/metrics").with(user("alice"))).andExpect(status().isForbidden());
    }
    @Test void keyReuseAndOwnership() {
        var first=store.place("alice","repeat",1,1);
        assertEquals(first.id(), store.place("alice","repeat",1,1).id());
        assertEquals(409, assertThrows(OrderFailure.class,()->store.place("alice","repeat",1,2)).status());
        assertEquals(404, assertThrows(OrderFailure.class,()->store.get("bob",first.id())).status());
        var before=store.products().getFirst().stock();
        store.cancel("alice",first.id()); store.cancel("alice",first.id());
        assertEquals(before+1,store.products().getFirst().stock());
    }
    @Test void invalidAndMissing() throws Exception {
        for(String body : new String[]{"{}","{\"productId\":null,\"quantity\":1}","{\"productId\":1,\"quantity\":11}"})
            mvc.perform(post("/api/orders").with(user("alice")).with(csrf()).header("Idempotency-Key","bad")
                .contentType("application/json").content(body)).andExpect(status().isBadRequest());
        mvc.perform(post("/api/orders").with(user("alice")).with(csrf()).header("Idempotency-Key","missing")
            .contentType("application/json").content("{\"productId\":999,\"quantity\":1}"))
            .andExpect(status().isNotFound()).andExpect(jsonPath("$.status").value(404));
    }
}
