package John_Coupon_Project.services;

import John_Coupon_Project.repositories.CompanyRepository;
import John_Coupon_Project.repositories.CouponRepository;
import John_Coupon_Project.repositories.CustomerRepository;

public abstract class ClientService {

    protected CompanyRepository companyRepository;
    protected CustomerRepository customerRepository;
    protected CouponRepository couponRepository;

    public ClientService(CompanyRepository companyRepository, CustomerRepository customerRepository, CouponRepository couponRepository) {
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

    abstract boolean login (String email, String password);
}
