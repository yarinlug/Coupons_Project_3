import { NavLink, useNavigate } from "react-router-dom";
import Company from "../../../Models/Company";
import "./CompanyCard.css";
import { useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Card, CardContent } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface CompanyProps {
  company: Company;
}

function CompanyCard(props: CompanyProps): JSX.Element {
  const navigate = useNavigate();
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    adminService
      .getAllCompanies()
      .then((comps) => setCompanyList(comps))
      .catch((error) => errorHandler.showError(error));
  }, []);

  function deleteMe() {
    adminService
      .deleteCompany(props.company.id)
      .then(() => {
        toast.success("Company deleted");
        navigate("/companies");
      })
      .catch((error) => {
        errorHandler.showError(error);
      });
  }
  
  return (
    <div className="CompanyCard">
        <Card>
        <CardContent>
          <NavLink to={"/companies/" + props.company.id}  style={{ textDecoration: 'none', color: 'blue' }}>
            <h2 style={{ margin: 0 }}>Company: {props.company.name}</h2>
          </NavLink>
          {props.company.email}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
           
          >
            <Button
              variant="contained"
              startIcon={<DeleteOutlineIcon />}
              onClick={deleteMe}
              value={props.company.id}
              style={{ backgroundColor: "#ff0000", color: "#fff" }}
            >
              Delete Me
            </Button>
            <NavLink to={`/updatecompany/${props.company.id}`}>
              <Button
                variant="contained"
                startIcon={<ModeEditIcon />}
                style={{ margin: "5px" }}
              >
                Update Me
              </Button>
            </NavLink>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompanyCard;
