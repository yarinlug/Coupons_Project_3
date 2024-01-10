package John_Coupon_Project.controllers;

import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.exceptions.UnAuthorizedException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.services.ClientService;
import John_Coupon_Project.services.CompaniesService;
import John_Coupon_Project.services.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/customer")

public class CustomerController {

    private HttpServletRequest request;
    private HashMap<String, ClientService> tokensStore;

    public CustomerController(HttpServletRequest request, HashMap<String, ClientService> tokensStore) {
        this.request = request;
        this.tokensStore = tokensStore;
    }

    @PostMapping("/purchasecoupon/{couponID}")
    public String purchaseCoupon(@PathVariable long couponID) throws CouponException, CustomerException, UnAuthorizedException {
        getService().purchaseCoupon(couponID);
        return "Coupon purchased";
    }

    @GetMapping("/getallcoupons")
    public List<Coupon> getAllCoupons() throws UnAuthorizedException {
        return getService().getAllCoupons();
    }

    @GetMapping("/customercoupons")
    public Set<Coupon> getCustomerCoupons() throws CustomerException, UnAuthorizedException {
        return getService().getCustomerCoupons();
    }

    @GetMapping("/couponscategory/{category}")
    public Set<Coupon> getCustomerCouponsByCategory(@PathVariable Category category) throws CouponException, CustomerException, UnAuthorizedException {
        return getService().getCustomerCouponsByCategory(category);
    }

    @GetMapping("/couponsprice/{maxPrice}")
    public Set<Coupon> getCustomerCouponsByPrice(@PathVariable double maxPrice) throws CouponException, CustomerException, UnAuthorizedException {
        return getService().getCustomerCouponsByPrice(maxPrice);
    }

    @GetMapping("/customerdetails")
    public Customer getCustomerDetails() throws CustomerException, UnAuthorizedException {
        return getService().getCustomerDetails();
    }

    private CustomerService getService() throws UnAuthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        CustomerService customerService = (CustomerService) tokensStore.get(token);
        if (customerService == null)
            throw new UnAuthorizedException("Trying to fool me?! Login 🙂");
        return customerService;
    }

}
