package John_Coupon_Project.controllers;

import John_Coupon_Project.exceptions.CompanyException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.exceptions.UnAuthorizedException;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.services.AdminService;
import John_Coupon_Project.services.ClientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/admin")

public class AdminController {

    private HttpServletRequest request;
    private HashMap<String, ClientService> tokensStore;

    public AdminController(HttpServletRequest request, HashMap<String, ClientService> tokensStore) {
        this.request = request;
        this.tokensStore = tokensStore;
    }

    @PostMapping("/addcompany")
    public Company addCompany(@RequestBody Company company) throws CompanyException, UnAuthorizedException {
        getAdminFacade().addCompany(company);
        return company;
    }

    @PutMapping("/updatecompany")
    public Company updateCompany(@RequestBody Company company) throws CompanyException, UnAuthorizedException {
        getAdminFacade().updateCompany(company);
        return company;
    }

    @DeleteMapping("/deletecompany/{companyID}")
    public String deleteCompany(@PathVariable int companyID) throws CompanyException, UnAuthorizedException {
        getAdminFacade().deleteCompany(companyID);
        return "Company deleted";
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies() throws UnAuthorizedException {
        return getAdminFacade().getAllCompanies();
    }

    @GetMapping("/companies/{companyID}")
    public Company getOneCompany(@PathVariable int companyID) throws CompanyException, UnAuthorizedException {
        return getAdminFacade().getOneCompany(companyID);
    }

    @PostMapping("/addcustomer")
    public Customer addCustomer(@RequestBody Customer customer) throws CustomerException, UnAuthorizedException {
        getAdminFacade().addCustomer(customer);
        return customer;
    }

    @PutMapping("/updatecustomer")
    public Customer updateCustomer(@RequestBody Customer customer) throws CustomerException, UnAuthorizedException {
        getAdminFacade().updateCustomer(customer);
        return customer;
    }

    @DeleteMapping("/deletecustomer/{id}")
    public String deleteCustomer(@PathVariable int id) throws CustomerException, UnAuthorizedException {
        getAdminFacade().deleteCustomer(id);
        return "Customer deleted";
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() throws UnAuthorizedException {
        return getAdminFacade().getAllCustomers();
    }

    @GetMapping("/customer/{customerID}")
    public Customer getOnecustomer (@PathVariable int customerID) throws CustomerException, UnAuthorizedException {
        return getAdminFacade().getOneCustomer(customerID);
    }
    private AdminService getAdminFacade() throws UnAuthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        ClientService clientService = tokensStore.get(token);

        if (clientService == null) {
            throw new UnAuthorizedException("Trying to fool me? Login!");
        }

        if (!(clientService instanceof AdminService)) {
            throw new UnAuthorizedException("Invalid access. This user is not associated with an Admin account.");
        }

        return (AdminService) clientService;
    }

}
