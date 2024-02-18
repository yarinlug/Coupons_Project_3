import { Route, Routes, useNavigate } from "react-router-dom";
import Companies from "../../AdminArea/CompanyArea/Companies/Companies";
import Customers from "../../AdminArea/CustomerArea/Customers/Customers";
import "./Routing.css";
import CompanyDetails from "../../AdminArea/CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../AdminArea/CustomerArea/CustomerDetails/CustomerDetails";
import AddCompany from "../../AdminArea/CompanyArea/AddCompany/AddCompany";
import Login from "../../AuthArea/Login/Login";
import UpdateCompany from "../../AdminArea/CompanyArea/UpdateCompany/UpdateCompany";
import Coupons from "../../CompanyArea/CouponsArea/Coupons/Coupons";
import AddCustomer from "../../AdminArea/CustomerArea/AddCustomer/AddCustomer";
import MyCompanyDetails from "../../CompanyArea/MyCompanyDetails/MyCompanyDetails";
import UpdateCustomer from "../../AdminArea/CustomerArea/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../CompanyArea/CouponsArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/CouponsArea/UpdateCoupon/UpdateCoupon";
import CouponDetails from "../../GeneralArea/CouponDetails/CouponDetails";
import MyDetails from "../../CustomerArea/MyDetails/MyDetails";
import MyCoupons from "../../CustomerArea/MyCoupons/MyCoupons";
import AllCoupons from "../../CustomerArea/AllCoupons/AllCoupons";
import HomePage from "../../MainArea/HomePage/HomePage";
import { authStore } from "../../../Redux/OurStore";
function Routing(): JSX.Element {
    const navigate = useNavigate();
    const userRole = authStore.getState().user?.role;
  
    return (
      <div className="Routing">
        <Routes>
          <Route path="homepage" element={<HomePage />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="coupons/:couponID" element={<CouponDetails />} />

          {/* ADMIN ROUTES */}
          {userRole === 'administrator' && (
            <>
              <Route path="companies" element={<Companies />} />
              <Route path="addcompany" element={<AddCompany />} />
              <Route path="updatecompany/:companyID" element={<UpdateCompany />} />
              <Route path="companies/:companyID" element={<CompanyDetails />} />
              <Route path="company/companydetails" element={<MyCompanyDetails />} />
              <Route path="customers" element={<Customers />} />
              <Route path="addcustomer" element={<AddCustomer />} />
              <Route path="updatecustomer/:customerID" element={<UpdateCustomer />} />
              <Route path="customer/:customerID" element={<CustomerDetails />} />
              {/* <Route path="*" element={<UnAuthorizedPage />} /> */}
            </>
          )}
  
          {/* COMPANY ROUTES */}
          {userRole === 'company' && (
            <>
              <Route path="company/coupons" element={<Coupons />} />
              <Route path="coupons/:couponID" element={<CouponDetails />} />
              <Route path="addcoupon" element={<AddCoupon />} />
              <Route path="updatecoupon/:couponID" element={<UpdateCoupon />} />
              <Route path="company/companydetails" element={<MyCompanyDetails />} />
            </>
          )}
  
          {/* CUSTOMER ROUTES */}
          {userRole === 'customer' && (
            <>
              <Route path="customer/mydetails" element={<MyDetails />} />
              <Route path="customer/mycoupons" element={<MyCoupons />} />
              <Route path="customer/allcoupons" element={<AllCoupons />} />
             
            </>
          )}
  
          <Route path="/" element={<Login />} />
          <Route path="*" element={<div>Oops, Page not found!</div>} />
        </Routes>
      </div>
    );
  }
  
  export default Routing;