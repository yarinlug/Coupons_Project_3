import axios from "axios";
import Coupon from "../Models/Coupon";
import Company from "../Models/Company";
import Category from "../Models/Category";
import { couponStore } from "../Redux/OurStore";
import { add, fill, remove, update } from "../Redux/CouponSlice";


class CompanyService {

    public async getCompanyCoupons(): Promise<Coupon[]>{
    if(couponStore.getState().value.length == 0){
        const response = (await axios.get<Coupon[]>("http://localhost:8080/company/companycoupons"))
        couponStore.dispatch(fill(response.data))
        return response.data;
    } else{
        return couponStore.getState().value;
    }
}

    public async getCouponsByCategory (category:Category): Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/company/categorycoupons/"+category))
        return response.data;
    }

    public async getCouponsByPrice(maxPrice:number): Promise<Coupon[]>{
        const response = (await axios.get<Coupon[]>("http://localhost:8080/company/pricecoupons/" + maxPrice))
        return response.data;
    }

    public async getCompanyDetails():Promise<Company>{
        const response = (await axios.get<Company>("http://localhost:8080/company/companydetails"))
        return response.data;

        
    }

    public async addCoupon(coupon:Coupon):Promise<Coupon>{
        const response = (await axios.post<Coupon>("http://localhost:8080/company/addcoupon", coupon));
        couponStore.dispatch(add(response.data))
        return response.data
    }

    public async updateCoupon(coupon:Coupon):Promise<Coupon>{
        const data = (await axios.put<Coupon>("http://localhost:8080/company/updatecoupon" , coupon)).data
        couponStore.dispatch(update(coupon));
        return data;
    }

    public async deleteCoupon (id: any):Promise<string>{
        couponStore.dispatch(remove(id));
        return (await axios.delete("http://localhost:8080/company/deletecoupon/" + id))
    }
    public async getCouponById (id: any): Promise<Coupon>{
        if (couponStore.getState().value.length == 0)
        return (await axios.get<Coupon>("http://localhost:8080/company/couponbyid/" + id)).data;

    return couponStore.getState().value.find(e => e.id == id)
}
    }


const companyService = new CompanyService;
export default companyService;