package John_Coupon_Project.services;

import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.repositories.CouponRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Set;

@Service
public class GeneralService {

    private CouponRepository couponRepository;

    public GeneralService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }


    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }
}
