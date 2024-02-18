package John_Coupon_Project.services;

import John_Coupon_Project.exceptions.CouponException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.models.Category;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.repositories.CouponRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GeneralService {

    private CouponRepository couponRepository;

    public GeneralService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }


    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Coupon getOneCoupon(long couponID) throws CouponException {
        return couponRepository.findById(couponID).orElseThrow(() -> new CouponException("Coupon not found!"));
    }

    public List<Coupon> getCouponsByCategory(Category category) throws CouponException {
        List<Coupon> coupons = couponRepository.findAll();
        List<Coupon> couponsByCategory = new ArrayList<>();

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

    public List<Coupon> getCouponsByPrice(double maxPrice) throws CouponException {
        List<Coupon> coupons = couponRepository.findAll();
        List<Coupon> couponsByPrice = new ArrayList<>();

        for (Coupon c : coupons) {
            if (c.getPrice() <= maxPrice) {
                couponsByPrice.add(c);
            }
        }
        if (couponsByPrice.isEmpty()) {
            throw new CouponException("No coupons found for: " + maxPrice + " price");
        }
        return couponsByPrice;
    }
}
