package John_Coupon_Project.filters;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@Order(2)
public class TokenFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        if (token == null) {
            response.setStatus(403);
            response.getWriter().write("You must log in!");
        } else {
            token = token.replace("Bearer ", "");
            try {
                JWT.decode(token).getClaim("role").asString();
                filterChain.doFilter(request, response);
            } catch (JWTDecodeException ex) {
                response.setStatus(403);
                response.getWriter().write("You must log in!");
            }
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        List<String> patterns = List.of("/v3/api-docs", "/configuration/", "/swagger", "/webjars", "/auth/login");
        return patterns.stream().anyMatch( p-> request.getRequestURL().toString().contains(p));
    }
}
