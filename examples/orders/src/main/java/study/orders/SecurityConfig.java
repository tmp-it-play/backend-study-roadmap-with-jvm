package study.orders;
import java.util.Map;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
@Configuration(proxyBeanMethods = false)
public class SecurityConfig {
    @Bean PasswordEncoder passwordEncoder() { return PasswordEncoderFactories.createDelegatingPasswordEncoder(); }
    @Bean UserDetailsService users(PasswordEncoder encoder) {
        // 로컬 실습 계정. 공개 서버에서 이 설정을 사용하지 않는다.
        return new InMemoryUserDetailsManager(
            User.withUsername("alice").password(encoder.encode("alice-pass")).roles("USER").build(),
            User.withUsername("bob").password(encoder.encode("bob-pass")).roles("USER").build(),
            User.withUsername("admin").password(encoder.encode("admin-pass")).roles("ADMIN").build());
    }
    @Bean SecurityFilterChain security(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/csrf", "/api/products", "/actuator/health", "/actuator/health/**").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .requestCache(cache -> cache.disable())
            .exceptionHandling(errors -> errors.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            .formLogin(form -> form.successHandler((req, res, auth) -> res.setStatus(204))
                .failureHandler((req, res, ex) -> res.setStatus(401)))
            .logout(logout -> logout.logoutSuccessHandler((req, res, auth) -> res.setStatus(204)))
            .build();
    }
    @RestController
    static class CsrfController {
        @GetMapping("/api/csrf")
        Map<String, String> csrf(CsrfToken csrf) {
            return Map.of("token", csrf.getToken(), "headerName", csrf.getHeaderName(), "parameterName", csrf.getParameterName());
        }
    }
}
