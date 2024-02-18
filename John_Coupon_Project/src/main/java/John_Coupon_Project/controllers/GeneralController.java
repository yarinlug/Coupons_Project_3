package John_Coupon_Project.controllers;

import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.exceptions.UnAuthorizedException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.services.GeneralService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class GeneralController {

    private GeneralService service;

    public GeneralController(GeneralService service) {
        this.service = service;
    }

    @GetMapping("/homecoupons")
    public List<Coupon> getAllCoupons(){
        return service.getAllCoupons();
    }

    @GetMapping("getonecoupon/{couponID}")
    public Coupon getOneCoupon(@PathVariable long couponID) throws CouponException {
        return service.getOneCoupon(couponID);
    }

    @GetMapping("/allcouponscategory/{category}")
    public List<Coupon> getCouponsByCategory(@PathVariable Category category) throws CouponException {
        return service.getCouponsByCategory(category);
    }

    @GetMapping("/allcouponsbyprice/{maxPrice}")
    public List<Coupon> getCouponsByPrice (@PathVariable double maxPrice) throws CouponException{
        return service.getCouponsByPrice(maxPrice);
    }
}
