import { NavLink, useNavigate } from "react-router-dom";
import "./CouponCarouselCard.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { toast } from "react-toastify";
import Category from "../../../Models/Category";
import { authStore } from "../../../Redux/OurStore";

interface CouponCarouselProps {
    id: any;
    title: string;
    price: number;
    image: string;
    category: Category;
}

function CouponCarouselCard(props: CouponCarouselProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="CouponCarouselCard">
            <Card>
                {authStore.getState().token.length > 0 ? (
                    <NavLink to={"/coupons/" + props.id}>
                        <CardMedia
                            component="img"
                            alt={props.title}
                            height="140"
                            image={props.image}
                        />
                    </NavLink>
                ) : (
                    <div onClick={() => toast.warning("You must be logged in!")}>
                        <NavLink to="/auth/login">
                            <CardMedia
                                component="img"
                                alt={props.title}
                                height="140"
                                image={props.image}
                            />
                        </NavLink>
                    </div>
                )}
                <CardContent>
                    <h3>{props.category}: {props.title}</h3>
                    <div className="price-overlay">
                        <Typography variant="h6" style={{ color: "white" }}>
                            ${props.price}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default CouponCarouselCard;
