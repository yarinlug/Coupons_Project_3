package John_Coupon_Project.services;

import John_Coupon_Project.exceptions.CompanyException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Coupon;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.repositories.CompanyRepository;
import John_Coupon_Project.repositories.CouponRepository;
import John_Coupon_Project.repositories.CustomerRepository;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

/**
 * Service class for administrative operations.
 */
@Service
@Scope("prototype")
public class AdminService extends ClientService {

    private CompaniesService companiesService;

    /**
     * Constructor for AdminService.
     *
     * @param companyRepository  The repository for company-related operations.
     * @param customerRepository The repository for customer-related operations.
     * @param couponRepository   The repository for coupon-related operations.
     */
    public AdminService(CompanyRepository companyRepository, CustomerRepository customerRepository, CouponRepository couponRepository) {
        super(companyRepository, customerRepository, couponRepository);
    }

    /**
     * Authenticates the admin based on email and password.
     *
     * @param email    The email of the admin.
     * @param password The password of the admin.
     * @return True if authentication is successful, false otherwise.
     */
    @Override
    public boolean login(String email, String password) {
        return email.equals("admin@admin.com") && password.equals("admin");
    }

    /**
     * Adds a new company.
     *
     * @param company The company to be added.
     * @throws CompanyException If there is an issue with the company.
     */
    public Company addCompany(Company company) throws CompanyException {
        if (!companyRepository.existsByNameOrEmail(company.getName(), company.getEmail())) {
            companyRepository.save(company);
            return company;
        } else {
            throw new CompanyException("Company already exists, cannot add");
        }
    }

    /**
     * Updates an existing company.
     *
     * @param company The company to be updated.
     * @throws CompanyException If there is an issue with the company.
     */
    public Company updateCompany(Company company) throws CompanyException {
        if (isCompanyEmailUnchanged(company)) {
            Company existingCompanyByEmail = companyRepository.findByEmail(company.getEmail());
            if (existingCompanyByEmail != null && existingCompanyByEmail.getId() != company.getId()) {
                // Another company already has the same email
                throw new CompanyException("Company with the same email exists!");
            }
        } else {
            if (companyRepository.existsByEmail(company.getEmail())) {
                throw new CompanyException("Company with given email already exists");
            }
        }

        // Check if the company with the given ID exists, then update
        if (companyRepository.existsById(company.getId())) {
            companyRepository.save(company);
            return company;
        } else {
            throw new CompanyException("Company not found, cannot update!");
        }
    }


    /**
     * Deletes a company.
     *
     * @param companyID The ID of the company to be deleted.
     * @throws CompanyException If there is an issue with the company.
     */
    public void deleteCompany(int companyID) throws CompanyException {
        Company company = companyRepository.findById(companyID).orElseThrow(() -> new CompanyException("Company not found!"));

        // Remove references to coupons owned by this company from customers
        for (Coupon coupon : company.getCoupons()) {
            for (Customer customer : coupon.getCustomers()) {
                customer.getCoupons().remove(coupon);
                customerRepository.save(customer);
            }
            coupon.getCustomers().clear();
            couponRepository.save(coupon);
        }

        // Delete coupons and then the company
        couponRepository.deleteByCompany(company);
        companyRepository.deleteById(companyID);
    }

    /**
     * Retrieves a list of all companies.
     *
     * @return List of all companies.
     */
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    /**
     * Retrieves a specific company by ID.
     *
     * @param companyID The ID of the company to be retrieved.
     * @return The company.
     * @throws CompanyException If the company is not found.
     */
    public Company getOneCompany(int companyID) throws CompanyException {
        return companyRepository.findById(companyID).orElseThrow(() -> new CompanyException("Company not found!"));
    }

    /**
     * Adds a new customer.
     *
     * @param customer The customer to be added.
     * @throws CustomerException If there is an issue with the customer.
     */
    public Customer addCustomer(Customer customer) throws CustomerException {
        if (customerRepository.existsByEmail(customer.getEmail())) {
            throw new CustomerException("Customer already exists, cannot add!");
        } else {
            customerRepository.save(customer);
            return customer;
        }
    }

    /**
     * Updates an existing customer.
     *
     * @param customer The customer to be updated.
     * @throws CustomerException If there is an issue with the customer.
     */
    public Customer updateCustomer(Customer customer) throws CustomerException {
        // Check if another customer with the updated email already exists (excluding the current customer)
        if (customerRepository.existsByEmailAndIdNot(customer.getEmail(), customer.getId())) {
            throw new CustomerException("Email already exists for another customer, cannot update");
        }

        // Check if the customer with the given ID exists, then update
        if (customerRepository.existsById(customer.getId())) {
            customerRepository.save(customer);
            return customer;
        } else {
            throw new CustomerException("Customer not found, cannot update!");
        }
    }

    /**
     * Deletes a customer.
     *
     * @param id The ID of the customer to be deleted.
     * @throws CustomerException If there is an issue with the customer.
     */
    public void deleteCustomer(int id) throws CustomerException {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        } else {
            throw new CustomerException("Customer doesn't exist!");
        }
    }

    /**
     * Retrieves a list of all customers.
     *
     * @return List of all customers.
     */
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    /**
     * Retrieves a specific customer by ID.
     *
     * @param customerID The ID of the customer to be retrieved.
     * @return The customer.
     * @throws CustomerException If the customer is not found.
     */
    public Customer getOneCustomer(int customerID) throws CustomerException {
        return customerRepository.findById(customerID).orElseThrow(() -> new CustomerException("Customer doesn't exist!"));
    }

    private boolean isCompanyEmailUnchanged(Company company) {
        Company existingCompany = companyRepository.findById(company.getId()).orElse(null);
        return existingCompany != null && Objects.equals(existingCompany.getEmail(), company.getEmail());
    }
}
