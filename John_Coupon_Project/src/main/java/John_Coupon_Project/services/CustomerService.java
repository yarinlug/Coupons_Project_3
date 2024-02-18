package John_Coupon_Project.services;

import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.repositories.CompanyRepository;
import John_Coupon_Project.repositories.CouponRepository;
import John_Coupon_Project.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Service class for customer-related operations.
 */
@Service
@Scope("prototype")
public class CustomerService extends ClientService {
    private int customerID;

    public CustomerService(CompanyRepository companyRepository, CustomerRepository customerRepository, CouponRepository couponRepository) {
        super(companyRepository, customerRepository, couponRepository);
    }

    /**
     * Checks if a customer can be authenticated with the provided email and password.
     *
     * @param email    The email of the customer.
     * @param password The password of the customer.
     * @return True if authentication is successful, false otherwise.
     */
    @Override
    public boolean login(String email, String password) {
        if (customerRepository.existsByEmailAndPassword(email, password)) {
            Customer customer = customerRepository.findByEmailAndPassword(email, password);
            customerID = customer.getId();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Purchases a coupon for the customer.
     *
     * @param couponID The coupon ID to be purchased.
     * @throws CouponException   If there is an issue with the coupon.
     * @throws CustomerException If there is an issue with the customer.
     */
    public void purchaseCoupon(long couponID) throws CouponException, CustomerException {
        // Retrieve the customer by ID or throw an exception if not found
        Coupon couponToPurchase = couponRepository.findById(couponID).orElseThrow(() -> new CouponException("Coupon does not exist!"));
        Customer customer = customerRepository.findById(customerID)
                .orElseThrow(() -> new CustomerException("Customer not found"));

        // Check if the customer already has the coupon
        for (Coupon customerCoupons : customer.getCoupons()) {
            if (customerCoupons.getId() == couponID) {
                throw new CouponException("Coupon already purchased for customer name: " + customer.getFirstName());
            }
        }

        // Check if the coupon is in stock
        if (couponToPurchase.getAmount() == 0) {
            throw new CouponException("Coupon " + couponToPurchase.getTitle() + " is out of stock!");
        }

        // Check if the coupon is expired
        if (couponToPurchase.getEndDate().isBefore(LocalDate.now())) {
            throw new CouponException("Coupon " + couponToPurchase.getTitle() + " is expired");
        }

        // Add the coupon to the customer's set of coupons
        Set<Coupon> customerCoupons = customer.getCoupons();
        customerCoupons.add(couponToPurchase);
        customer.setCoupons(customerCoupons);
        customerRepository.save(customer);

        // Decrease the coupon's available amount
        couponToPurchase.setAmount(couponToPurchase.getAmount() - 1);
        couponRepository.save(couponToPurchase);
    }

    /**
     * Gets all coupons of the customer.
     *
     * @return Set of coupons owned by the customer.
     * @throws CustomerException If there is an issue with the customer.
     */
    public Set<Coupon> getCustomerCoupons() throws CustomerException {
        // Retrieve the customer by ID or throw an exception if not found
        Customer customer = customerRepository.findById(customerID)
                .orElseThrow(() -> new CustomerException("Customer not found"));
        return customer.getCoupons();
    }

    /**
     * Gets all coupons of the customer by a specific category.
     *
     * @param category The category of coupons to retrieve.
     * @return Set of coupons owned by the customer in the specified category.
     * @throws CustomerException If there is an issue with the customer.
     */
    public Set<Coupon> getCustomerCouponsByCategory(Category category) throws CouponException, CustomerException {
        Set<Coupon> coupons = getCustomerDetails().getCoupons();
        Set<Coupon> couponsByCategory = new HashSet<>();

        for (Coupon c : coupons) {
            if (c.getCategory() == category) {
                couponsByCategory.add(c);
            }
        }
        if (couponsByCategory.isEmpty()) {
            throw new CouponException("No coupons found for: " + category + " category");
        }
        return couponsByCategory;
    }

    /**
     * Gets all coupons of the customer within a specified price range.
     *
     * @param maxPrice The maximum price for coupons.
     * @return Set of coupons owned by the customer within the specified price range.
     * @throws CouponException If there is an issue with the coupon.
     */
    public Set<Coupon> getCustomerCouponsByPrice(double maxPrice) throws CouponException, CustomerException {
        Set<Coupon> coupons = getCustomerDetails().getCoupons();
        Set<Coupon> couponsByPrice = new HashSet<>();
        // Check if maxPrice is positive
        if (maxPrice < 0) {
            throw new CouponException("Price cannot be negative");
        }
        for (Coupon c : coupons) {
            if (c.getPrice() <= maxPrice)
                couponsByPrice.add(c);
        }
        return couponsByPrice;
    }

    /**
     * Gets details of the customer.
     *
     * @return The customer entity.
     * @throws CustomerException If there is an issue with the customer.
     */
    public Customer getCustomerDetails() throws CustomerException {
        // Retrieve the customer by ID or throw an exception if not found
        return customerRepository.findById(customerID)
                .orElseThrow(() -> new CustomerException("Customer not found"));
    }
    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }
}
