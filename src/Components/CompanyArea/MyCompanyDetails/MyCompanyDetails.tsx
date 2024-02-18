import { useEffect, useState } from "react";
import "./MyCompanyDetails.css";
import Company from "../../../Models/Company";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import { Card, CardContent, Typography } from "@mui/material";
import Coupon from "../../../Models/Coupon";

function MyCompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company>();
    const [coupons, setCoupons] = useState<Coupon[]>()

    useEffect(() => {
        companyService.getCompanyDetails()
            .then(comp => setCompany(comp))
            .catch(err => errorHandler.showError(err))
    }, []);

    useEffect(() =>{
        companyService.getCompanyCoupons()
        .then(c => setCoupons(c))
        .catch(err => errorHandler.showError(err))
    } )

    return (
        <div className="MyCompanyDetails">
            {company && (
             <Card>
             <CardContent>
                 <Typography variant="h4" gutterBottom>
                     {company.name}
                 </Typography>
                 <Typography variant="subtitle1" color="textSecondary">
                     Email: {company.email}
                 </Typography>
                 <Typography variant="body1" paragraph>
                  <strong> Your company currently has {coupons?.length} Coupons! </strong>
                 </Typography>
                 <Typography variant="body1" paragraph>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                 </Typography>
                
             </CardContent>
         </Card>
         
            )}
        </div>
    );
}

export default MyCompanyDetails;
