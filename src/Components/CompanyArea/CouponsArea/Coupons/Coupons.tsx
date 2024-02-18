import { useEffect, useState } from "react";
import "./Coupons.css";
import Coupon from "../../../../Models/Coupon";
import { NavLink, useNavigate } from "react-router-dom";
import companyService from "../../../../Services/CompanyService";
import errorHandler from "../../../../Services/ErrorHandler";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import CouponCard from "../../../GeneralArea/CouponCard/CouponCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Category from "../../../../Models/Category";
import { toast } from "react-toastify";
import { couponStore } from "../../../../Redux/OurStore";

function Coupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    useEffect(() => {
        // Initial fetch of coupons
        companyService.getCompanyCoupons()
            .then(coupons => setCoupons(coupons))
            .catch(err => errorHandler.showError(err));

        // Subscribe to changes in the coupon store
        const unsubscribe = couponStore.subscribe(() => {
            const updatedCoupons = couponStore.getState().value;
            setCoupons(updatedCoupons);
        });

     
        return () => unsubscribe();
    }, []);


    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        const newMaxPrice = newValue as number;
        setMaxPrice(newMaxPrice);
    };

    const handleSearchByPrice = () => {
        companyService
            .getCouponsByPrice(maxPrice)
            .then(filteredCoupons => setCoupons(filteredCoupons))
            .catch(error => errorHandler.showError(error));
    };
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value as string;

        if (newValue === "All") {

            companyService.getCompanyCoupons()
                .then(allCoupons => {
                    setCoupons(allCoupons);
                })
                .catch(err => errorHandler.showError(err));
        } else if (Object.values(Category).includes(newValue)) {
            const categoryEnum = newValue as unknown as Category;
            companyService.getCouponsByCategory(categoryEnum)
                .then(filteredCoupons => {
                    setCoupons(filteredCoupons);
                })
                .catch(err => errorHandler.showError(err));
        }
    }



    const handleDeleteCoupon = (id: any) => {
        companyService.deleteCoupon(id)
            .then(() => {
                toast.success("Coupon deleted");
                companyService.getCompanyCoupons()
                    .then(updatedCoupons => setCoupons(updatedCoupons))
                    .catch(error => errorHandler.showError(error));
            })
            .catch((error) => errorHandler.showError(error));
    };



    return (
        <div className="Coupons">
            <div className="Filters">
                <Typography id="price-slider-text" variant="h6" gutterBottom>
                    Filter By Price:
                </Typography>
                <Slider
                    value={maxPrice}
                    max={1000}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    aria-labelledby="price-slider-text"
                    sx={{ width: "70%" }}
                />
                <br />
                <Button variant="contained" color="primary" onClick={handleSearchByPrice}>
                    Search By Price
                </Button>
                <br />
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                        Filter By Category:
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="All"
                        name="radio-buttons-group"
                        sx={{ display: 'flex', flexDirection: 'row' }}
                        onChange={handleCategoryChange}
                    >
                        <FormControlLabel
                            value="All"
                            control={<Radio />}
                            label="All"
                        />
                        <FormControlLabel
                            value="Electricity"
                            control={<Radio />}
                            label="Electricity"
                        />

                        <FormControlLabel value="Food" control={<Radio />} label="Food" />
                        <FormControlLabel
                            value="Vacation"
                            control={<Radio />}
                            label="Vacation"
                        />
                        <FormControlLabel
                            value="Restaurant"
                            control={<Radio />}
                            label="Restaurant"
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            <NavLink to="/addcoupon">
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    style={{ textTransform: "none", justifyContent: "center" }}
                    className="MuiButton-Add"
                >
                    Add Coupon
                </Button>
            </NavLink>
            <div className="container">
                {coupons?.map((c) => (
                    <CouponCard
                        key={c.id}
                        id={c.id}
                        category={c.category}
                        title={c.title}
                        image={c.image}
                        price={c.price}
                        showDeleteButton={true}
                        showUpdateButton={true}
                        onDelete={handleDeleteCoupon}
                    />
                ))}
            </div>
        </div>
    );
}

export default Coupons;
