package John_Coupon_Project.controllers;

import John_Coupon_Project.exceptions.CompanyException;
import John_Coupon_Project.exceptions.CustomerException;
import John_Coupon_Project.models.Company;
import John_Coupon_Project.models.Customer;
import John_Coupon_Project.models.LoginManager;

import John_Coupon_Project.services.*;
import ch.qos.logback.core.net.server.Client;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class LoginController {

    private LoginManager loginManager;
    private HashMap<String, ClientService> tokensStore;
    private HttpServletRequest request;

    public LoginController(LoginManager loginManager, HashMap<String, ClientService> tokensStore, HttpServletRequest request) {
        this.loginManager = loginManager;
        this.tokensStore = tokensStore;
        this.request = request;
    }

    @PostMapping ("/login")
    public ResponseEntity<String> login(String email, String password, ClientType clientType) throws CompanyException, CustomerException {
        ClientService service = loginManager.login(email, password, clientType);
        if (service != null) {
            String token = createToken(service);
            tokensStore.put(token, service);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @PostMapping ("logout")
    public String logout(HttpServletRequest request){
        tokensStore.remove(request.getHeader("Authorization").replace("Bearer ", ""));
        return "yeey";
    }

    private String createToken(ClientService service) throws CompanyException, CustomerException {
        String token = "";
        if (service instanceof CompaniesService) {
            Company comp = ((CompaniesService) service).getCompanyDetails();
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("id", comp.getId())
                    .withClaim("name", comp.getName())
                    .withClaim("email", comp.getEmail())
                    .withClaim("role", "company")
                    .withExpiresAt(Date.from(expires))
                    .sign(Algorithm.none());
        } else if (service instanceof AdminService) {
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("name", "Admin")
                    .withClaim("role", "administrator")
                    .withExpiresAt(Date.from(expires))
                    .sign(Algorithm.none());
        } else if (service instanceof CustomerService) {
            Customer cust = ((CustomerService) service).getCustomerDetails();
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("id", cust.getId())
                    .withClaim("firstname", cust.getFirstName())
                    .withClaim("lastname", cust.getLastName())
                    .withClaim("email", cust.getEmail())
                    .withClaim("role", "customer")
                    .withExpiresAt(Date.from(expires))
                    .sign(Algorithm.none());
        }
        return token;
    }
}
