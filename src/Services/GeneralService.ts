import axios from "axios";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";

class GeneralService{
    
    public async getAllCoupons(): Promise<Coupon[]> {
        const response = (await axios.get<Coupon[]>("http://localhost:8080/homecoupons"))
        return response.data;
    }
    public async getOneCoupon(id:any): Promise<Coupon>{
        const response = (await axios.get<Coupon>("http://localhost:8080/getonecoupon/" + id))
        return response.data;
    }
    
    public async getCouponsByCategory(category:Category):Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/allcouponscategory/" + category))
        return response.data;
    }

    public async getCouponsByPrice(maxPrice:number):Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/allcouponsbyprice/" + maxPrice))
        return response.data;
    }
}

const generalService = new GeneralService;
export default generalService;