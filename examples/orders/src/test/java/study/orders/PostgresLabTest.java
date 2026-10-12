package study.orders;
import jakarta.persistence.*;
import java.util.*;
import java.util.concurrent.*;
import org.hibernate.SessionFactory;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.*;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.*;
import org.springframework.transaction.support.TransactionTemplate;
import org.testcontainers.postgresql.PostgreSQLContainer;
import study.orders.persistence.*;
import static org.junit.jupiter.api.Assertions.*;

@Tag("postgres")
@SpringBootTest(properties="spring.jpa.properties.hibernate.generate_statistics=true")
@Import(PostgresLabTest.Database.class)
class PostgresLabTest {
    @TestConfiguration(proxyBeanMethods=false)
    static class Database {
        @Bean @ServiceConnection
        PostgreSQLContainer postgres() { return new PostgreSQLContainer("postgres:17.6"); }
    }
    @Autowired OrderStore store;
    @Autowired JdbcTemplate jdbc;
    @Autowired javax.sql.DataSource dataSource;
    @Autowired PlatformTransactionManager manager;
    @Autowired EntityManagerFactory emf;
    @PersistenceContext EntityManager em;
    @BeforeEach void reset() {
        jdbc.update("delete from customer_orders");
        jdbc.update("delete from products where id <> 1");
        jdbc.update("update products set stock=1, version=0 where id=1");
    }
    @Test void concurrentLastItem() throws Exception {
        try(var threads=Executors.newVirtualThreadPerTaskExecutor()) {
            var ready=new CountDownLatch(2); var start=new CountDownLatch(1);
            List<Future<Integer>> futures=new ArrayList<>();
            for(String owner:List.of("alice","bob")) futures.add(threads.submit(()-> {
                ready.countDown();
                if(!start.await(10,TimeUnit.SECONDS)) throw new AssertionError("start timeout");
                try { store.place(owner,owner,1,1); return 201; }
                catch(OrderFailure ex) { return ex.status(); }
            }));
            assertTrue(ready.await(10,TimeUnit.SECONDS)); start.countDown();
            var statuses=new ArrayList<Integer>();
            for(var f:futures) statuses.add(f.get(15,TimeUnit.SECONDS));
            Collections.sort(statuses); assertEquals(List.of(201,409),statuses);
            assertEquals(0,store.products().getFirst().stock());
            assertEquals(1,jdbc.queryForObject("select count(*) from customer_orders",Integer.class));
        }
    }
    @Test void concurrentDuplicateIsOneOrder() throws Exception {
        try(var threads=Executors.newVirtualThreadPerTaskExecutor()) {
            var start=new CountDownLatch(1);
            Callable<UUID> request=()->{ start.await(); return store.place("alice","same-key",1,1).id(); };
            var a=threads.submit(request); var b=threads.submit(request); start.countDown();
            assertEquals(a.get(15,TimeUnit.SECONDS),b.get(15,TimeUnit.SECONDS));
            assertEquals(1,jdbc.queryForObject("select count(*) from customer_orders",Integer.class));
        }
    }
    @Test void flushDoesNotCommit() {
        var tx=new TransactionTemplate(manager);
        assertThrows(IllegalStateException.class,()->tx.execute(status-> {
            var p=em.find(Product.class,1L); p.stock=0; em.flush();
            throw new IllegalStateException("주문 후속 처리 실패");
        }));
        assertEquals(1,jdbc.queryForObject("select stock from products where id=1",Integer.class));
    }
    @Test void cancellationAndOwnership() {
        var order=store.place("alice","cancel",1,1);
        assertEquals(404,assertThrows(OrderFailure.class,()->store.cancel("bob",order.id())).status());
        store.cancel("alice",order.id()); store.cancel("alice",order.id());
        assertEquals(1,store.products().getFirst().stock());
        assertEquals(409,assertThrows(OrderFailure.class,()->store.place("alice","cancel",1,2)).status());
    }
    @Test void databaseRejectsInvalidState() {
        assertThrows(org.springframework.dao.DataIntegrityViolationException.class,
            ()->jdbc.update("update products set stock=-1 where id=1"));
        assertEquals(1,store.products().getFirst().stock());
    }
    @Test void isolationSnapshots() throws Exception {
        for (int isolation : new int[]{java.sql.Connection.TRANSACTION_READ_COMMITTED, java.sql.Connection.TRANSACTION_REPEATABLE_READ}) {
            jdbc.update("update products set stock=1 where id=1");
            try (var reader=dataSource.getConnection(); var writer=dataSource.getConnection()) {
                reader.setAutoCommit(false); reader.setTransactionIsolation(isolation);
                try (var query=reader.createStatement()) {
                    try(var rows=query.executeQuery("select stock from products where id=1")) { rows.next(); assertEquals(1,rows.getInt(1)); }
                    try(var update=writer.createStatement()) { update.executeUpdate("update products set stock=2 where id=1"); }
                    try(var rows=query.executeQuery("select stock from products where id=1")) {
                        rows.next(); assertEquals(isolation==java.sql.Connection.TRANSACTION_READ_COMMITTED?2:1,rows.getInt(1));
                    }
                } finally { reader.rollback(); }
            }
        }
    }
    @Test void fetchJoinAvoidsNPlusOne() {
        jdbc.update("insert into products (id,name,price,stock,version) values (2,'다른 상품',100,1,0)");
        store.place("alice","n1-a",1,1); store.place("alice","n1-b",2,1);
        var statistics=emf.unwrap(SessionFactory.class).getStatistics();
        statistics.clear();
        new TransactionTemplate(manager).execute(status-> {
            em.clear();
            var orders=em.createQuery("select o from CustomerOrder o",CustomerOrder.class).getResultList();
            orders.forEach(CustomerOrder::view);
            return null;
        });
        var lazyQueries=statistics.getPrepareStatementCount();
        statistics.clear();
        assertEquals(2,store.list("alice").size());
        var fetchedQueries=statistics.getPrepareStatementCount();
        assertEquals(3,lazyQueries); assertEquals(1,fetchedQueries);
    }
}
