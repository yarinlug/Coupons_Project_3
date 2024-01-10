package John_Coupon_Project.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table (name = "companies")
@Data
@NoArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;
    @Setter(AccessLevel.NONE)
    private String name;
    private String email;
    private String password;
    @OneToMany(mappedBy = "company", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Coupon> coupons;

    public Company(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}
