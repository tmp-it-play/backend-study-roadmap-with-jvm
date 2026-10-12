package study.orders.persistence;
import jakarta.persistence.*;
@Entity
@Table(name = "members")
public class Member {
    @Id public String username;
    protected Member() {}
}
