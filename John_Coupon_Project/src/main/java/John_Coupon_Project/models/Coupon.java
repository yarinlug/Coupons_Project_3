package John_Coupon_Project.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

@Entity
@Table (name = "coupons")
@Data
@NoArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;
    @ManyToOne
    @Setter(AccessLevel.NONE)
    private Company company;
    @Enumerated (EnumType.STRING)
    private Category category;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int amount;
    private double price;
    private String image;
    @ManyToMany (mappedBy = "coupons", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Customer> customers;

    public Coupon(Company company, Category category, String title, String description, LocalDate startDate, LocalDate endDate, int amount, double price, String image) {
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return id == coupon.id && amount == coupon.amount && Double.compare(price, coupon.price) == 0 && category == coupon.category
                && Objects.equals(title, coupon.title) && Objects.equals(description, coupon.description) && Objects.equals(startDate, coupon.startDate) &&
                Objects.equals(endDate, coupon.endDate) && Objects.equals(image, coupon.image);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, category, title, description, startDate, endDate, amount, price, image);
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", company=" + company.getName() +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }
}
