import { NavLink, useNavigate } from "react-router-dom";
import Customer from "../../../Models/Customer";
import "./CustomerCard.css";
import { SyntheticEvent, useEffect, useState } from "react";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import { Button, Card, CardContent, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface CustomerProps{
    customer:Customer;
}
function CustomerCard(props:CustomerProps): JSX.Element {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState<Customer[]>([])

    useEffect(()=>{
        adminService.getAllCustomers()
        .then (customers => setCustomerList(customers))
        .catch(error=> errorHandler.showError(error))
       
    })
    function deleteMe(event: SyntheticEvent) {
        const id = (event.target as HTMLButtonElement).value;
        adminService
          .deleteCustomer(id)
          .then(() => toast.success("Customer deleted"))
          .catch((error) => errorHandler.showError(error));
      }
    return (
        <div className="CustomerCard">
            <Card>
        <CardContent>
          <NavLink to={"/customer/" + props.customer.id}>
            <h2 style={{ margin: 0 }} className="title">Customer: {props.customer.firstName} {props.customer.lastName}</h2>
          </NavLink>
          {props.customer.email}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
           
          >
            <Button
              variant="contained"
              startIcon={<DeleteOutlineIcon />}
              onClick={deleteMe}
              value={props.customer.id}
              style={{ backgroundColor: "#ff0000", color: "#fff" }}
            >
              Delete Me
            </Button>
            <NavLink to={`/updatecustomer/${props.customer.id}`}>
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

export default CustomerCard;
