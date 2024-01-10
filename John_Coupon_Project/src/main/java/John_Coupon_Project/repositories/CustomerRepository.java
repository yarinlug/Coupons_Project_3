package John_Coupon_Project.repositories;

import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

   public boolean existsByEmail(String email);
   public boolean existsByEmailAndPassword (String email, String password);
   public Customer findByEmailAndPassword(String email, String password);

   boolean existsByEmailAndIdNot(String email, int id);
}
