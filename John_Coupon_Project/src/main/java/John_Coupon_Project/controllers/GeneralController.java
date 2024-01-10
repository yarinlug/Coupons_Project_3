package John_Coupon_Project.controllers;

import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.services.GeneralService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GeneralController {

    private GeneralService service;

    public GeneralController(GeneralService service) {
        this.service = service;
    }

    @GetMapping("homecoupons")
    public List<Coupon> getAllCoupons(){
        return service.getAllCoupons();
    }
}
