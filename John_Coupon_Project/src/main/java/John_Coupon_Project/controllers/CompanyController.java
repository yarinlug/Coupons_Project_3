package John_Coupon_Project.controllers;

import John_Coupon_Project.exceptions.CompanyException;
import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.exceptions.UnAuthorizedException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.services.ClientService;
import John_Coupon_Project.services.ClientType;
import John_Coupon_Project.services.CompaniesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;
import java.util.HashMap;
import java.util.Set;

@RestController
@RequestMapping("/company")

public class CompanyController {


    private HttpServletRequest request;
    private HashMap<String, ClientService> tokensStore;

    public CompanyController(HttpServletRequest request, HashMap<String, ClientService> tokensStore) {
        this.request = request;
        this.tokensStore = tokensStore;
    }

    @PostMapping("/addcoupon")
    public Coupon addCoupon(@RequestBody Coupon coupon) throws CouponException, UnAuthorizedException {
        getService().addCoupon(coupon);
        return coupon;
    }

    @PutMapping("/updatecoupon")
    public Coupon updateCoupon(@RequestBody Coupon coupon) throws CouponException, UnAuthorizedException {
        getService().updateCoupon(coupon);
        return coupon;
    }

    @DeleteMapping("/deletecoupon/{couponID}")
    public String deleteCoupon(@PathVariable long couponID) throws CouponException, UnAuthorizedException {
        getService().deleteCoupon(couponID);
        return "Coupon deleted";
    }

    @GetMapping("/companycoupons")
    public Set<Coupon> getCompanyCoupons() throws CompanyException, UnAuthorizedException {
        return getService().getCompanyCoupons();
    }

    @GetMapping("/categorycoupons/{category}")
    public Set<Coupon> getCompanyCouponsByCategory(@PathVariable Category category) throws UnAuthorizedException {
        return getService().getCompanyCoupons(category);
    }

    @GetMapping("/pricecoupons/{maxPrice}")
    public Set<Coupon> getCompanyCouponsByPrice(@PathVariable double maxPrice) throws CouponException, UnAuthorizedException {
        return getService().getCompanyCoupons(maxPrice);
    }

    @GetMapping("/companydetails")
    public Company getCompanyDetails() throws CompanyException, UnAuthorizedException {
        return getService().getCompanyDetails();
    }
    @GetMapping ("/couponbyid/{couponID}")
    public Coupon getCouponById(@PathVariable long couponID) throws CouponException, UnAuthorizedException{
        return getService().getCouponById(couponID);
    }

    private CompaniesService getService() throws UnAuthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        CompaniesService companiesService = (CompaniesService) tokensStore.get(token);
        if (companiesService == null)
            throw new UnAuthorizedException("Trying to fool me?! Login 🙂");
        return companiesService;
    }
}



