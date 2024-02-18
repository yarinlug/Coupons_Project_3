import { useForm } from "react-hook-form";
import "./UpdateCompany.css";
import Company from "../../../../Models/Company";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Removed 'useState' import since it's not used in the code
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

function UpdateCompany(): JSX.Element {
    const { register, handleSubmit, setValue, formState } = useForm<Company>();
    const navigate = useNavigate();
    const params = useParams();
    const companyID= +params.companyID!
    const [company, setCompany] = useState<Company>();
 
    useEffect(() => {
        adminService
            .getOneCompany(companyID)
            .then((c) => {
                if (c) {
                    setValue("name", c.name);
                    setValue("email", c.email);
                    setValue("password", c.password);
                }
                else{
                    navigate("/companies")
                }
            })
            .catch((e) => errorHandler.showError(e));
    }, []);

    function sendCompany(company: Company) {
       company.id = companyID
        adminService
            .updateCompany(company)
            .then(() => {
                toast.success("Company updated");
                navigate("/companies");
            })
            .catch((e) => errorHandler.showError(e));
    }

    return (
        <div className="UpdateCompany">
            	  <FormControl>
        <FormLabel>
          <h3>Update Company Information</h3>
        </FormLabel>
        <br />
        <FormLabel>
          Company Name:
          <TextField variant="outlined" id="name" {...register("name", {
                        required: { message: "Must enter name!", value: true },
                    })} />
        </FormLabel>
        <FormLabel>
          Email Address:
          <TextField
            variant="outlined"
            id="email"
            {...register("email", {
              required: { message: "Must enter email!", value: true },
            })}
          />
        </FormLabel>
        <FormLabel>
          Password:
          <TextField
            variant="outlined"
            id="password"
            type="password"
            {...register("password", {
              required: { message: "Must enter password!", value: true },
            })}
          />
        </FormLabel>
        <Button variant="contained" onClick={handleSubmit(sendCompany)}>
          Update Company
        </Button>
      </FormControl>
        </div>

    );
}

export default UpdateCompany;
