import Coupon from "./Coupon";

class Customer{
    public id:number
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public coupons: Coupon[]; 
    
    constructor(id:number, firstName:string, lastName:string, email:string, password:string, coupons:Coupon[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}
export default Customer