package John_Coupon_Project.repositories;

import John_Coupon_Project.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    public boolean existsByEmailAndPassword (String email, String password);

    public boolean existsByNameOrEmail(String name, String email);
    public Company findByEmailAndPassword(String email, String password);
    public Company findByEmail (String email);

    boolean existsByEmail(String email);
}
