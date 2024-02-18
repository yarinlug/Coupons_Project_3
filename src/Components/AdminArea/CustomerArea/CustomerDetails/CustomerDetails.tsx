import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./CustomerDetails.css";
import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CustomerCard from "../../../GeneralArea/CustomerCard/CustomerCard";
import { Card, CardContent, Typography } from "@mui/material";

function CustomerDetails(): JSX.Element {
    const params = useParams();
    const id: number = parseInt(params.customerID!);
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        adminService.getOneCustomer(id)
            .then(c => setCustomer(c))
            .catch(error => {
                errorHandler.showError(error);
                navigate("/notfound");
            });
    }, [id, navigate]);

    return (
        <div className="CustomerDetails">
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

export default CustomerDetails;
