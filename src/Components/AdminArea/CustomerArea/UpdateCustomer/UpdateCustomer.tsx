import { useForm } from "react-hook-form";
import "./UpdateCustomer.css";
import Customer from "../../../../Models/Customer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";


function UpdateCustomer(): JSX.Element {
     
    const {register, handleSubmit, setValue, formState} = useForm<Customer>();
    const navigate = useNavigate();
    const params = useParams()
    const customerID = +params.customerID!
    const [customer , setCustomer] = useState<Customer>();

    useEffect(() =>
    {
        adminService.getOneCustomer(customerID)
        .then(c =>{
            setValue("firstName", c.firstName);
            setValue("lastName", c.lastName);
            setValue("email", c.email);
            setValue("password", c.password);
        })
        .catch(err => errorHandler.showError(err))
       
    } , [])

    function sendCustomer (customer: Customer){
        customer.id = customerID
        adminService  .updateCustomer(customer)
        .then(() => {
            toast.success("Customer updated");
            navigate("/customers");
        })
        .catch((e) => errorHandler.showError(e));
}
    
    return (
        <div className="UpdateCustomer">
			<FormControl>
                <FormLabel> <h3>Update Customer Information</h3></FormLabel>
                <br/>
                <FormLabel>First Name:
                <TextField variant="outlined" id="firstName" {...register("firstName", {
                        required: { message: "Must enter First Name!", value: true },
                    })} />
                </FormLabel>
                <FormLabel>Last Name:
                <TextField variant="outlined" id="lastName"  {...register("lastName", {
                        required: { message: "Must enter Last Name!", value: true },
                    })} />
                </FormLabel> 
                <FormLabel> Email Address:
                <TextField variant="outlined" id="email"  {...register("email", {
                        required: { message: "Must enter email!", value: true },
                    })} />
                </FormLabel>
                <FormLabel>Password:
                <TextField variant="outlined" id="password" type="password"  {...register("password", {
                        required: { message: "Must enter password!", value: true },
                    })} />
                </FormLabel>
                <Button variant="contained" onClick={handleSubmit(sendCustomer)}>Update Customer</Button>
            </FormControl>
        </div>
    );
}

export default UpdateCustomer;
