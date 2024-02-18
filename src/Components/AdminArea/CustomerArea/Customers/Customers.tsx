import { useEffect, useState } from "react";
import "./Customers.css";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CustomerCard from "../../../GeneralArea/CustomerCard/CustomerCard";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function Customers(): JSX.Element {
  const [customers, setCustomers] = useState<Customer[]>([])
  useEffect(() => {
    adminService.getAllCustomers()
      .then(customers => setCustomers(customers))
      .catch(error => errorHandler.showError(error))
  })
  return (
    <div className="Customers">
      <NavLink to="/addcustomer">
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          style={{ textTransform: "none" }} // Optional: Remove uppercase styling
          className="MuiButton-Delete"
        >
          Add Customer
        </Button>
      </NavLink>
      <div className="container">
        {customers.map(c => <CustomerCard key={c.id} customer={c} />)}
      </div>
    </div>
  );
}

export default Customers;
