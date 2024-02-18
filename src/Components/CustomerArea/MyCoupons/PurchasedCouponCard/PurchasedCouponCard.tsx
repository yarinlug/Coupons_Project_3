import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./PurchasedCouponCard.css";
import { NavLink } from "react-router-dom";
import Category from "../../../../Models/Category";

interface PurchasedCouponCardProps {
    id: any;
    title: string;
    image: string;
    category: Category;
}

function PurchasedCouponCard(props: PurchasedCouponCardProps): JSX.Element {
    return (
        <div className="PurchasedCouponCard">
            <Card>
                <NavLink to={"/coupons/" + props.id}>
                    <CardMedia
                        component="img"
                        alt={props.title}
                        height="140"
                        image={props.image}
                    />
                
                </NavLink>
                <CardContent>
                    <h3>{props.category}: {props.title}</h3>
                </CardContent>
            </Card>
        </div>
    );
}

export default PurchasedCouponCard;
