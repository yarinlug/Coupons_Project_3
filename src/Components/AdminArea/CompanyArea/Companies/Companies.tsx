import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import "./Companies.css";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CompanyCard from "../../../GeneralArea/CompanyCard/CompanyCard";
import { NavLink } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "@mui/material";
import { companyStore } from "../../../../Redux/OurStore";

function Companies(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const unsubscribe = companyStore.subscribe(() => {
      const updatedCompanies = companyStore.getState().value;
      setCompanies(updatedCompanies);
    });

   
    adminService
      .getAllCompanies()
      .then((companies) => setCompanies(companies))
      .catch((error) => errorHandler.showError(error));

  
    return () => unsubscribe();
  }, []);

  return (
    <div className="Companies">
      <NavLink to="/addcompany">
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          style={{ textTransform: "none" }} // Optional: Remove uppercase styling
          className="MuiButton-root"
        >
          Add Company
        </Button>
      </NavLink>
      <div className="container">
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
      </div>
    </div>
  );
}

export default Companies;
