package John_Coupon_Project;

import John_Coupon_Project.exceptions.*;
import John_Coupon_Project.models.*;
import John_Coupon_Project.services.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class JohnCouponProjectApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(JohnCouponProjectApplication.class, args);


//        // Get the CouponDailyExpirationJob bean and start it in a new thread
        CouponDailyExpirationJob couponDailyExpirationJob = context.getBean(CouponDailyExpirationJob.class);
        Thread jobThread = new Thread(couponDailyExpirationJob);
        jobThread.start();
//
//        // Get the LoginManager bean and perform login
//        LoginManager loginManager = context.getBean(LoginManager.class);
//        AdminService adminService = (AdminService) loginManager.login("admin@admin.com", "admin", ClientType.Administrator);
//
//        if (adminService != null) {
//            // Create sample Company, Customer, and Coupon
//            Company company = new Company("name", "email", "password");
//            Company company2 = new Company("name1", "email1", "password");
//            Customer customer = new Customer("name", "lastname", "email", "password");
//            Customer customer2 = new Customer("name1", "lastname1", "email1", "password");
//            Coupon coupon = new Coupon(company, Category.Electricity, "Electricity coupon", "coupon description",
//                    LocalDate.now(), LocalDate.now(), 2, 19.99, "Coupon image");
//            Coupon coupon2 = new Coupon(company, Category.Electricity, "Electricity coupon2", "coupon description",
//                    LocalDate.of(1995, 2, 23), LocalDate.of(2024, 3, 23), 2, 19.99, "Coupon image");
//            try {
//                // Admin operations
//                adminService.addCompany(company);
//                adminService.addCompany(company2);
//                adminService.addCustomer(customer);
//                adminService.addCustomer(customer2);
//                System.out.print(adminService.getAllCompanies());
//                System.out.print(adminService.getAllCustomers());
//
//                // Company and Customer login
//                CompaniesService companyService = (CompaniesService) loginManager.login("email", "password", ClientType.Company);
//
//                if (companyService != null) {
//                    // Update company details
//                    Company updatedCompany = companyService.getCompanyDetails();
//                    updatedCompany.setEmail("updatedEmail");
//                    updatedCompany.setPassword("updatePassword");
//                    adminService.updateCompany(updatedCompany);
//                }
//
//                CustomerService customerService = (CustomerService) loginManager.login("email", "password", ClientType.Customer);
//
//                if (customerService != null) {
//                    // Update customer details
//                    Customer updatedCustomer = customerService.getCustomerDetails();
//                    updatedCustomer.setEmail("email");
//                    updatedCustomer.setPassword("updatedPassword");
//                    adminService.updateCustomer(updatedCustomer);
//                    System.out.println(customerService.getCustomerDetails());
//
//                    // Coupon operations
//                    companyService.addCoupon(coupon);
//                    companyService.addCoupon(coupon2);
//                    customerService.purchaseCoupon(1);
//                    companyService.deleteCoupon(1);
//                    companyService.addCoupon(coupon);
//                    customerService.purchaseCoupon(2);
//                    System.out.println(customerService.getCustomerDetails());
//                    System.out.println(adminService.getOneCompany(companyService.getCompanyDetails().getId()));
//                    System.out.println(adminService.getOneCustomer(customerService.getCustomerDetails().getId()));
//                    coupon.setAmount(3);
//                    coupon.setPrice(15.99);
//                    Set<Customer> customerSetForCoupon = new HashSet<>();
//                    customerSetForCoupon.add(customer);
//                    coupon.setCustomers(customerSetForCoupon);
//                    coupon2.setDescription("It's an electricity coupon...");
//                    companyService.updateCoupon(coupon2);
//                    companyService.updateCoupon(coupon);
//
//                    // Display company's coupons
//                    System.out.println(companyService.getCompanyCoupons());
//                    System.out.println(companyService.getCompanyCoupons(Category.Electricity));
//                    System.out.println(companyService.getCompanyCoupons(20));
//
//
//                    // Display customer's coupons
//                    System.out.println(customerService.getCustomerCoupons());
//                    System.out.println(customerService.getCustomerCouponsByCategory(Category.Electricity));
//                    System.out.println(customerService.getCustomerCouponsByPrice(20));
//
//
//                    // Delete customer, company, and stop the expiration job
//                    companyService.deleteCoupon(2);
//                    adminService.deleteCompany(companyService.getCompanyDetails().getId());
//                    adminService.deleteCustomer(customerService.getCustomerDetails().getId());
//                    couponDailyExpirationJob.stop();
//                }
//            } catch (CompanyException | CustomerException | CouponException e) {
//                System.out.println(e.getMessage());
//            } catch (Exception e) {
//                // Handle unexpected errors
//                System.out.println("Unexpected error: " + e.getMessage());
//            }
//        }
    }
    @Bean
    public HashMap<String, ClientService> tokensStore(){
        return new HashMap<>();
    }
}

