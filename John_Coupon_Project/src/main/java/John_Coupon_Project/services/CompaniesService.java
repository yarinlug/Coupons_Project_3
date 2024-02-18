package John_Coupon_Project.services;

import John_Coupon_Project.exceptions.CompanyException;
import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.repositories.CompanyRepository;
import John_Coupon_Project.repositories.CouponRepository;
import John_Coupon_Project.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;

/**
 * Service class for managing operations related to companies.
 */
@Service
@Scope("prototype")
public class CompaniesService extends ClientService {

    // ID of the currently authenticated company
    private int companyID;

    /**
     * Constructor for CompaniesService.
     *
     * @param companyRepository  The repository for company-related operations.
     * @param customerRepository The repository for customer-related operations.
     * @param couponRepository   The repository for coupon-related operations.
     */
    public CompaniesService(CompanyRepository companyRepository, CustomerRepository customerRepository, CouponRepository couponRepository) {
        super(companyRepository, customerRepository, couponRepository);
    }

    /**
     * Sets the company ID during object construction.
     *
     * @param companyID The ID of the company.
     */

    /**
     * Checks if a company with the given email and password exists and logs in.
     *
     * @param email    The email of the company.
     * @param password The password of the company.
     * @return True if the login is successful, false otherwise.
     */
    @Override
    public boolean login(String email, String password) {
        if (companyRepository.existsByEmailAndPassword(email, password)) {
            Company company = companyRepository.findByEmailAndPassword(email, password);
            this.companyID = company.getId();
            return true;
        } else return false;
    }

    /**
     * Checks if a company with the given email and password exists.
     *
     * @param email    The email of the company.
     * @param password The password of the company.
     * @return True if the company exists, false otherwise.
     */
    public boolean isCompanyExists(String email, String password) {
        return companyRepository.existsByEmailAndPassword(email, password);
    }

    /**
     * Adds a coupon for the company.
     *
     * @param coupon The coupon to be added.
     * @throws CouponException Thrown if the coupon already exists or has an invalid date.
     */
    public Coupon addCoupon(Coupon coupon) throws CouponException {
        if (!isDateValid(coupon))
            throw new CouponException("Invalid coupon date!");
        if (couponRepository.existsByTitleAndCompanyId(coupon.getTitle(), this.companyID)) {
            throw new CouponException("Cannot add, coupon: " + coupon.getTitle() + " already exists for this company!");
        } else {
            couponRepository.save(coupon);
            return coupon;
        }
    }

    /**
     * Updates an existing coupon for the company.
     *
     * @param coupon The coupon to be updated.
     * @throws CouponException Thrown if the coupon doesn't exist or if changing the title to an existing one.
     */
    public Coupon updateCoupon(Coupon coupon) throws CouponException {
        // Check if the coupon exists
        if (couponRepository.existsById(coupon.getId())) {
            // Check if the title is being changed
            if (!isTitleUnchanged(coupon)) {
                Set<Coupon> companyCoupons = couponRepository.findCouponsByCompanyId(this.companyID);
                companyCoupons.remove(coupon);

                // Make sure we're not changing the coupon's title to one that already exists within the company
                for (Coupon coupon1 : companyCoupons) {
                    if (Objects.equals(coupon1.getTitle(), coupon.getTitle())) {
                        throw new CouponException("Cannot change coupon title to an existing one within the company!");
                    }
                }
                // Make sure we're setting a proper date.
                if (!isDateValid(coupon))
                    throw new CouponException("Invalid coupon date!");
            }
            // Save the updated coupon
            couponRepository.save(coupon);
            return coupon;
        } else {
            throw new CouponException("Coupon doesn't exist!");
        }
    }

    /**
     * Deletes a coupon for the company.
     *
     * @param couponID The ID of the coupon to be deleted.
     * @throws CouponException Thrown if the coupon doesn't exist.
     */
    public void deleteCoupon(long couponID) throws CouponException {
        Coupon coupon = couponRepository.findById(couponID).orElseThrow(() -> new CouponException("Coupon doesn't exist"));
        for (Customer customer : coupon.getCustomers()) {
            coupon.getCustomers().remove(customer);
            customer.getCoupons().remove(coupon);
            customerRepository.save(customer);
        }
        couponRepository.deleteById(couponID);
    }

    /**
     * Gets all coupons for the company.
     *
     * @return Set of coupons for the company.
     * @throws CompanyException Thrown if the company doesn't exist.
     */
    public Set<Coupon> getCompanyCoupons() throws CompanyException {
        Company company = companyRepository.findById(companyID).orElseThrow(() -> new CompanyException("Company doesn't exist"));
        return company.getCoupons();
    }

    /**
     * Gets all coupons for the company with a specific category.
     *
     * @param category The category of the coupons.
     * @return Set of coupons for the company with the specified category.
     * @throws CompanyException Thrown if the company doesn't exist.
     */
    public Set<Coupon> getCompanyCoupons(Category category) {
        return couponRepository.findAllByCategoryAndCompanyId(category, this.companyID);
    }

    /**
     * Gets all coupons for the company with a price less than or equal to the specified maximum price.
     *
     * @param maxPrice The maximum price for coupons.
     * @return Set of coupons for the company with a price less than or equal to the specified maximum price.
     * @throws CouponException  Thrown if the price is negative.
     * @throws CompanyException Thrown if the company doesn't exist.
     */
    public Set<Coupon> getCompanyCoupons(double maxPrice) throws CouponException {
        if (maxPrice < 0) {
            throw new CouponException("Price cannot be negative");
        }
        return couponRepository.findAllByPriceLessThanEqualAndCompanyId(maxPrice, this.companyID);
    }

    /**
     * Gets details for the company.
     *
     * @return Company details.
     * @throws CompanyException Thrown if the company doesn't exist.
     */
    public Company getCompanyDetails() throws CompanyException {
        return companyRepository.findById(companyID).orElseThrow(() -> new CompanyException("Company doesn't exist!"));
    }

    public Coupon getCouponById(long couponID) throws CouponException{
        return couponRepository.findById(couponID).orElseThrow(() -> new CouponException(("Coupon nto found")));
    }
    /**
     * Checks if the title of the coupon remains unchanged during an update.
     *
     * @param coupon The coupon to check.
     * @return True if the title remains unchanged, false otherwise.
     */
    private boolean isTitleUnchanged(Coupon coupon) {
        Coupon existingCoupon = couponRepository.findById(coupon.getId()).orElse(null);
        return existingCoupon != null && Objects.equals(existingCoupon.getTitle(), coupon.getTitle());
    }

    /**
     * Checks if the date of the coupon is valid (not expired and start date is before end date).
     *
     * @param coupon The coupon to check.
     * @return True if the date is valid, false otherwise.
     */
    private boolean isDateValid(Coupon coupon) {
        return !coupon.getEndDate().isBefore(LocalDate.now()) && !coupon.getStartDate().isAfter(coupon.getEndDate());
    }
}
