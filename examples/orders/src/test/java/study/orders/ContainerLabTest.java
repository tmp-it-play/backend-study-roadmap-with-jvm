package study.orders;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Test;
import org.springframework.aop.framework.ProxyFactory;
import org.aopalliance.intercept.MethodInterceptor;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.*;
import static org.junit.jupiter.api.Assertions.*;

class ContainerLabTest {
    interface Gateway {}
    static class Target {
        public String outer() { return inner(); }
        public String inner() { return "ok"; }
    }
    @Test void ambiguousInjectionAndScopes() {
        try(var context=new AnnotationConfigApplicationContext()) {
            context.registerBean("one",Gateway.class,()->new Gateway(){});
            context.registerBean("two",Gateway.class,()->new Gateway(){});
            context.registerBean("prototype",Object.class,Object::new,definition->definition.setScope("prototype"));
            context.refresh();
            assertThrows(NoUniqueBeanDefinitionException.class,()->context.getBean(Gateway.class));
            assertSame(context.getBean("one"),context.getBean("one"));
            assertNotSame(context.getBean("prototype"),context.getBean("prototype"));
        }
    }
    @Test void selfInvocationBypassesAdvice() {
        var calls=new AtomicInteger();
        var factory=new ProxyFactory(new Target());
        factory.setProxyTargetClass(true);
        factory.addAdvice((MethodInterceptor) invocation-> { calls.incrementAndGet(); return invocation.proceed(); });
        var proxy=(Target)factory.getProxy();
        assertEquals("ok",proxy.outer()); assertEquals(1,calls.get());
        proxy.inner(); assertEquals(2,calls.get());
    }
}
