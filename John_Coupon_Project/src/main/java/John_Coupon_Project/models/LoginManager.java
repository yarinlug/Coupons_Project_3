package John_Coupon_Project.models;

import John_Coupon_Project.services.*;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
    ApplicationContext context;

    public LoginManager(ApplicationContext context) {
        this.context = context;
    }

    public ClientService login(String email, String password, ClientType clientType)  {
        if (clientType.equals(ClientType.Administrator)) {
            AdminService facade = context.getBean(AdminService.class);
            if (facade.login(email, password))
                return facade;


        } else if (clientType.equals(ClientType.Company)) {
            CompaniesService facade = context.getBean(CompaniesService.class);
            if (facade.login(email, password))
                return facade;


        } else if (clientType.equals(ClientType.Customer)) {
            CustomerService facade = context.getBean(CustomerService.class);
            if (facade.login(email, password))
                return facade;


        }
        return null;
    }
}
