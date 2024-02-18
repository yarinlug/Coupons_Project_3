import axios from "axios";
import { authStore } from "../Redux/OurStore";


class ClientInterceptor {
    public tokenInterceptor() {
        axios.interceptors.request.use((request) => {
            if (authStore.getState().token.length > 0) 
                request.headers['Authorization'] = "Bearer " + authStore.getState().token;
                return request;
            
        });
    }
}

const clientInterceptors = new ClientInterceptor();
export default clientInterceptors;
