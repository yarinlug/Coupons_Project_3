package John_Coupon_Project.repositories;

import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Set;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    public boolean existsByTitleAndCompanyId(String title, int companyId);

    public Set<Coupon> findCouponsByCompanyId(int companyId);

    public Set<Coupon> findAllByCategoryAndCompanyId(Category category, int companyId);

    @Transactional
    public void deleteByCompany(Company company);



    ArrayList<Coupon> findCouponsByEndDateBefore(LocalDate localDate);

    Set<Coupon> findAllByPriceLessThanEqualAndCompanyId(double maxPrice, int companyId);
}
