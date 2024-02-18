import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import CouponCard from "../CouponCard/CouponCard";
import { Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { authStore } from "../../../Redux/OurStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import generalService from "../../../Services/GeneralService";
import customerService from "../../../Services/CustomerService";
import { toast } from "react-toastify";

function CouponDetails(): JSX.Element {
    const params = useParams();
    const id: number = parseInt(params.couponID!);
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState<Coupon>();
    const [isPurchased, setIsPurchased] = useState<boolean>(false);

    useEffect(() => {
        generalService.getOneCoupon(id)
            .then(c => setCoupon(c))
            .catch(err => {
                errorHandler.showError(err);
                navigate("/notfound");
            });
    }, [id, navigate]);

    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(c => setIsPurchased(c.some(c => c.id === coupon?.id)))
            .catch(e => errorHandler.showError(e))
    });


    function handlePurchase() {
        if (authStore.getState().user.role.toLowerCase() === "customer") {
            customerService
                .purchaseCoupon(coupon.id)
                .then(p => toast.success("Coupon Purchased Successfully!"))
                .catch(e => errorHandler.showError(e));
        } else {
            toast.error("You are not a Customer. Unable to purchase coupon.");

        }
    }




    return (
        <div className="CouponDetails">
            <Card>

                <div style={{ position: 'relative' }}>
                    {authStore.getState().user.role === "customer" && isPurchased && (
                        <div className="PurchasedCoupon">Coupon Already Purchased</div>
                    )}
                    <CardMedia
                        component="img"
                        alt={coupon?.title}
                        height="140"
                        image={coupon?.image}
                    />

                    <CardContent>
                        <h3>{coupon?.category}: {coupon?.title}</h3>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Price: ${coupon?.price}
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Amount: {coupon?.amount} left in Stock!
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Description: {coupon?.description}
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            Start Date: {coupon?.startDate.toString()}
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                            End Date: {coupon?.endDate.toString()}
                        </Typography>
                    </CardContent>
                </div>
            </Card>

            {authStore.getState().user.role === "customer" && !isPurchased && (
                <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handlePurchase}
                >
                    Purchase Coupon
                </Button>
            )}
        </div>
    );
}

export default CouponDetails;
