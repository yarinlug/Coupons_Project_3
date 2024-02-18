import { useNavigate, useParams } from "react-router-dom";
import "./CompanyDetails.css";
import Company from "../../../../Models/Company";
import { useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { Card, CardContent, Typography } from "@mui/material";

function CompanyDetails(): JSX.Element {
    const params = useParams();
    const id: number = parseInt(params.companyID!);
    const navigate = useNavigate();

    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        adminService.getOneCompany(id)
            .then(c => setCompany(c))
            .catch(err => {
                errorHandler.showError(err);
                navigate("/notfound");
            });
    }, [id, navigate]);

    return (
        <div className="CompanyDetails">
                <Card>
                    <CardContent className="CardContent">
                        <Typography variant="h4" gutterBottom>
                            {company?.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Email: {company?.email}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>
                    </CardContent>
                </Card>
        </div>
    );
}

export default CompanyDetails;
