import { useEffect, useState } from "react";
import "./MyDetails.css";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import { Card, CardContent, Typography } from "@mui/material";
import Coupon from "../../../Models/Coupon";
import { NavLink } from "react-router-dom";

function MyDetails(): JSX.Element {
    const [customer, setCustomer] = useState<Customer | undefined>();
    const [coupons, setCoupons] = useState<Coupon[] | undefined>();

    useEffect(() => {
        customerService.getCustomerDetails()
            .then(cust => setCustomer(cust))
            .catch(err => errorHandler.showError(err));
    }, []);

    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => errorHandler.showError(err));
    }, []);
    return (
        <div className="MyDetails">
            {customer && (
                <Card>
                    <CardContent className="CardContent">
                        <Typography variant="h4" gutterBottom>
                            {customer.firstName} {customer.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Email: {customer.email}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" className="">
                        <strong>   You currently have purchased {coupons?.length} coupons!
                        <br/>
                        Buy more <NavLink to="/customer/allcoupons">here! </NavLink>
                        </strong> 
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

export default MyDetails;
