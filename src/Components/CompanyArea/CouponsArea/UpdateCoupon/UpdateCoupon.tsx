import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCoupon.css";
import { useEffect, useState } from "react";
import Coupon from "../../../../Models/Coupon";
import { useForm } from "react-hook-form";
import companyService from "../../../../Services/CompanyService";
import errorHandler from "../../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { authStore } from "../../../../Redux/OurStore";

function UpdateCoupon(): JSX.Element {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm<Coupon>();
    const navigate = useNavigate();
    const params = useParams();
    const couponID = +params.couponID!
    const [coupon, setCoupon] = useState<Coupon>();
    const company = authStore.getState().user;

    useEffect(() => {
        companyService.getCouponById(couponID)
            .then(c => {
                if (c) {
                    setValue("title", c.title);
                    setValue("category", c.category);
                    setValue("description", c.description);
                    setValue("startDate", c.startDate);
                    setValue("endDate", c.endDate);
                    setValue("amount", c.amount);
                    setValue("price", c.price);
                    setValue("image", c.image);
                }

            })
            .catch(err => errorHandler.showError(err));
    }, []);

    function sendCoupon(coupon: Coupon) {
        coupon.id = couponID
        coupon.company = company;
        companyService.updateCoupon(coupon)
        .then(() => {
            toast.success("Coupon Updated")
            navigate("/company/coupons")
        })
        .catch(err => errorHandler.showError(err))
        if (new Date(coupon.startDate) >= new Date(coupon.endDate)) {
            toast.error("Start date must be before the expiration date");
            return;
        }
    
    }
    return (
        <div className="UpdateCoupon">
            <FormControl>
                <FormLabel><h2>Update Coupon</h2></FormLabel>
                <br />
                <FormLabel>Coupon Title:
                    <TextField
                        variant="outlined"
                        id="title"
                        {...register("title", {
                            required: { message: "Must enter title!", value: true },
                        })}
                        helperText={errors.title && <span className="errorText">{errors.title.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Description:
                    <TextField
                        variant="outlined"
                        id="description"
                        {...register("description", {
                            required: { message: "Must enter description", value: true },
                        })}
                        helperText={errors.description && <span className="errorText">{errors.description.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Start Date:
                    <TextField
                        variant="outlined"
                        id="startDate"
                        type="date"
                        {...register("startDate", {
                            required: { message: "Must enter start date", value: true },
                        })}
                        helperText={errors.startDate && <span className="errorText">{errors.startDate.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Expiration Date:
                    <TextField
                        variant="outlined"
                        id="endDate"
                        type="date"
                        {...register("endDate", {
                            required: { message: "Must enter end date", value: true },
                        })}
                        helperText={errors.endDate && <span className="errorText">{errors.endDate.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Price:
                    <TextField
                        variant="outlined"
                        id="price"
                        type="number"
                        {...register("price", {
                            required: { message: "Must enter price", value: true },
                            min: { message: "Price must be above 0", value: 0 },
                        })}
                        helperText={errors.price && <span className="errorText">{errors.price.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Stock Amount:
                    <TextField
                        variant="outlined"
                        id="amount"
                        type="number"
                        {...register("amount", {
                            required: { message: "Must enter amount", value: true },
                            min: { message: "Stock amount must be above 0", value: 0 },
                        })}
                        helperText={errors.amount && <span className="errorText">{errors.amount.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Image:
                    <TextField
                        variant="outlined"
                        id="imageUrl"
                        {...register("image", {
                            required: { message: "Must enter image", value: true },
                        })}
                        helperText={errors.image && <span className="errorText">{errors.image.message}</span>}
                    />
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Food"
                    id="category"
                    {...register("category")}
                >
                    <FormControlLabel
                        value="Food"
                        control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                        label="Food"
                    />
                    <FormControlLabel
                        value="Electricity"
                        control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                        label="Electricity"
                    />
                    <FormControlLabel
                        value="Restaurant"
                        control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                        label="Restaurant"
                    />
                    <FormControlLabel
                        value="Vacation"
                        control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                        label="Vacation"
                    />
                </RadioGroup>
                <Button variant="contained" onClick={handleSubmit(sendCoupon)}>Update Coupon</Button>
            </FormControl>
        </div>
    );
}

export default UpdateCoupon;
