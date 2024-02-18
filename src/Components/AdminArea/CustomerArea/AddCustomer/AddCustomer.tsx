import { useForm } from "react-hook-form";
import Customer from "../../../../Models/Customer";
import "./AddCustomer.css";
import { useNavigate } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import { toast } from "react-toastify";
import errorHandler from "../../../../Services/ErrorHandler";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Customer>();
    const navigate = useNavigate();

    function sendForm(customer: Customer) {
        adminService.addCustomer(customer)
            .then(c => {
                toast.success("Customer Added");
                navigate("/customers")
            })
            .catch(error => errorHandler.showError(error))
    }
    return (
        <div className="AddCustomer">
            <FormControl>
                <FormLabel> <h3>Update Customer Information</h3></FormLabel>
                <br />
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
                <Button variant="contained" onClick={handleSubmit(sendForm)}>Add Customer</Button>
            </FormControl>

        </div>
    );
}

export default AddCustomer;
