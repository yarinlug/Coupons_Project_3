import axios from "axios";
import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer";
import Category from "../Models/Category";
import { couponStore } from "../Redux/OurStore";
import { fill } from "../Redux/CouponSlice";


class CustomerService {

    public async getAllCoupons(): Promise<Coupon[]> {
        const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/getallcoupons"))
        return response.data;
    }
    public async getCustomerCoupons(){
        if(couponStore.getState().value.length == 0){
            const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/customercoupons"))
            couponStore.dispatch(fill(response.data))
            console.log(response.data);
            
            return response.data;
        } else{
            return couponStore.getState().value;
        }
    }
    // const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/customercoupons"))  
    // console.log(response.data);
    
    //     return response.data;
    // }

    public async getCouponsByPrice(maxPrice:number):Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/couponsprice/" + maxPrice))
        return response.data;
    }

    public async getCouponsByCategory(category:Category):Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/couponscategory/" + category))
        return response.data;
    }

    public async getCustomerDetails():Promise<Customer>{
        const response = (await axios.get<Customer>("http://localhost:8080/customer/customerdetails"))
        return response.data;
    }

    public async purchaseCoupon(couponID:any):Promise<string>{
        const response = (await axios.put<string>("http://localhost:8080/customer/purchasecoupon/" + couponID))
        return response.data;
    }
}

const customerService = new CustomerService;
export default customerService;