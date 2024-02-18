import { useForm } from "react-hook-form";
import "./Login.css";
import authService from "../../../Services/AuthService";
import { toast } from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/OurStore";

function Login(): JSX.Element {
    const { register, handleSubmit, formState: { errors } , getValues} = useForm();
    const navigate = useNavigate()
    const doLogin = (data: any) => {
        const { email, password, clientType } = data;

        authService.login(email, password, clientType)
            .then((t) => {
                console.log("Login successful. Token:", t);
                if(authStore.getState().user.role === "administrator"){
                navigate("/companies")
            }else {
                navigate("/homepage")
              }
            })
            .catch((err) => {
                console.error("Login failed:", err);
                errorHandler.showError(err);
                // Handle error, display message, etc.
            });
    };

    return (
        <div className="Login">
            <FormControl>
                <FormLabel> Login Information</FormLabel>
                <TextField variant="outlined" label="Email" id="email" {...register("email")} />
                <TextField variant="outlined" label="Password" id="password" type="password" {...register("password")} />
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Company"
                    id="clientType"
                    {...register("clientType")}
                >
                    <FormControlLabel value="Administrator" control={<Radio {...register("clientType")}sx={{ '&.Mui-checked': { color: 'red' } }}/>} label="Administrator" />
                    <FormControlLabel value="Company" control={<Radio {...register("clientType")}sx={{ '&.Mui-checked': { color: 'red' } }}/>} label="Company"  />
                    <FormControlLabel value="Customer" control={<Radio {...register("clientType")}sx={{ '&.Mui-checked': { color: 'red' } }}/>} label="Customer" />
                </RadioGroup>
                <Button variant="contained" onClick={handleSubmit(doLogin)}>Log In</Button>
            </FormControl>
        </div>
    );
}

export default Login;
