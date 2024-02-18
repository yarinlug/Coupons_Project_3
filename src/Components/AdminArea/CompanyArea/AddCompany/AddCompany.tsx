import { useNavigate } from "react-router-dom";
import Company from "../../../../Models/Company";
import "./AddCompany.css";
import { useForm } from "react-hook-form";
import adminService from "../../../../Services/AdminService";
import { toast } from "react-toastify";
import errorHandler from "../../../../Services/ErrorHandler";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";


function AddCompany(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Company>();
    const navigate = useNavigate();

    function sendForm(company: Company) {
        adminService.addCompany(company)
            .then(e => {
                toast.success("Company added");
                navigate("/companies");
            })
            .catch(e => errorHandler.showError(e)
            );
    }

    return (
        <div className="AddCompany">
               <FormControl>
                <FormLabel> <h3>Add Customer</h3></FormLabel>
                <br />
                <FormLabel>Company Name:
                    <TextField variant="outlined" id="name" {...register("name", {
                        required: { message: "Must enter name!", value: true },
                    })} />
                </FormLabel>
                <FormLabel>Company Email:
                    <TextField variant="outlined" id="email"  {...register("email", {
                        required: { message: "Must enter email!", value: true },
                    })} />
               
                </FormLabel>
                <FormLabel>Password:
                    <TextField variant="outlined" id="password" type="password"  {...register("password", {
                        required: { message: "Must enter password!", value: true },
                    })} />
                </FormLabel>
                <Button variant="contained" onClick={handleSubmit(sendForm)}>Add Company</Button>
            </FormControl>
        </div>
    );
}

export default AddCompany;