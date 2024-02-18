import { useEffect, useState } from "react";
import "./MyCoupons.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import Category from "../../../Models/Category";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import CouponCard from "../../GeneralArea/CouponCard/CouponCard";
import PurchasedCouponCard from "./PurchasedCouponCard/PurchasedCouponCard";

function MyCoupons(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>();
    const navigate = useNavigate();
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(coupons => {
                setCoupons(coupons);
            })
            .catch(error => {
                errorHandler.showError(error);
            });
    }, []);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
      const newMaxPrice = newValue as number;
      setMaxPrice(newMaxPrice);
    };
    const handleSearchByPrice = () => {
      customerService
        .getCouponsByPrice(maxPrice)
        .then(filteredCoupons => setCoupons(filteredCoupons))
        .catch(error => errorHandler.showError(error));
    };
      
    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as string;

      if (newValue === "All") {

          customerService.getCustomerCoupons()
              .then(allCoupons => {
                  setCoupons(allCoupons);
              })
              .catch(err => errorHandler.showError(err));
      } else if (Object.values(Category).includes(newValue)) {
          const categoryEnum = newValue as unknown as Category;
          customerService.getCouponsByCategory(categoryEnum)
              .then(filteredCoupons => {
                  setCoupons(filteredCoupons);
              })
              .catch(err => errorHandler.showError(err));
      }
  }
           
    return (
        <div className="MyCoupons">
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
        <br/>
      <Button variant="contained" color="primary" onClick={handleSearchByPrice}>
      Search By Price
    </Button>
       <br/>
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
      <div className="container">
      {coupons?.map(c => (
                <PurchasedCouponCard
                    key={c.id} 
                    id={c.id}
                    title={c.title}
                    image={c.image}
                    category={c.category}
                    
                />
            ))}
            </div>
        </div>
    );
}

export default MyCoupons;
