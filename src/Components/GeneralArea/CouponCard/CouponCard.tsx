import { NavLink, useNavigate } from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
import { SyntheticEvent, useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";
import Category from "../../../Models/Category";
import customerService from "../../../Services/CustomerService";
import { authStore } from "../../../Redux/OurStore";

interface CouponCardProps {
    id: any;
    title: string;
    price: number;
    image: string;
    category: Category;
    showDeleteButton?: boolean;
    showUpdateButton?: boolean;
    onDelete?: (id: any) => void;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    const navigate = useNavigate();
    const [isPurchased, setIsPurchased] = useState<boolean>(false);
    const userRole = authStore.getState().user.role;


    useEffect(() => {
        if (userRole === "customer") {
            customerService.getCustomerCoupons()
                .then(coupons => setIsPurchased(coupons.some(coupon => coupon.id === props.id)))
                .catch(error => errorHandler.showError(error));
        } else {
            companyService.getCompanyCoupons()
                .then(coupons => coupons)
                .catch(error => errorHandler.showError(error));
        }
    }, [props.id, userRole]);

    function deleteMe(event: SyntheticEvent) {
        const id = (event.target as HTMLButtonElement).value;
        if (props.onDelete) {
            props.onDelete(id);
        }
    }

    return (
        <div className="CouponCard">
            <Card>
                <NavLink to={"/coupons/" + props.id}>
                    <CardMedia
                        component="img"
                        alt={props.title}
                        height="140"
                        image={props.image}
                    />
                    <div className={isPurchased && userRole === "customer" ? "PurchasedCoupon" : "price-overlay"}>
                        {isPurchased && userRole === "customer" ? (
                            <div>Coupon Already Purchased</div>
                        ) : (
                            <Typography variant="h6" style={{ color: "white" }}>
                                ${props.price}
                            </Typography>
                        )}
                    </div>


                </NavLink>
                <CardContent>
                    <h3>{props.category}: {props.title}</h3>
                    {props.showDeleteButton && (
                        <Button
                            variant="contained"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={deleteMe}
                            value={props.id}
                            style={{ backgroundColor: "#ff0000", color: "#fff" }}
                        >
                            Delete Me
                        </Button>
                    )}
                    {props.showUpdateButton && (
                        <NavLink to={`/updatecoupon/${props.id}`}>
                            <Button
                                variant="contained"
                                startIcon={<ModeEditIcon />}
                                style={{ margin: "5px" }}
                            >
                                Update Me
                            </Button>
                        </NavLink>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default CouponCard;