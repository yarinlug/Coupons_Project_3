import axios from "axios";
import { ClientType } from "../Models/ClientType";
import { authStore, couponStore } from "../Redux/OurStore";
import { login, logout } from "../Redux/AuthSlice";
import { fill } from "../Redux/CouponSlice";


class AuthService {
    public async login(email: string, password: string, clientType: ClientType) {
      
            const response = await axios.post<string>(
                "http://localhost:8080/auth/login",
                null,
                {
                    params: {
                        email: email,
                        password: password,
                        clientType: clientType.toString(), 
                    },
                }
            );
            authStore.dispatch(login(response.data))
            return response.data;
    
    }
    public async logout(){
        const response = await axios.post<string>("http://localhost:8080/auth/logout") 
        authStore.dispatch(logout());
        couponStore.dispatch(fill([])); 
        return response.data;
    }
        
}

const authService = new AuthService();
export default authService;
