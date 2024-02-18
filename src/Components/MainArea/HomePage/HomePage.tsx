import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import errorHandler from "../../../Services/ErrorHandler";
import "./HomePage.css";
import Slider from "react-slick";
import CouponCarouselCard from "../../GeneralArea/CouponCarouselCard/CouponCarouselCard";


function HomePage(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        generalService.getAllCoupons()
            .then(coupons => {
                setCoupons(coupons);
                setLoading(false);
            })
            .catch(error => {
                errorHandler.showError(error);
                setLoading(false);
            });
    }, []);

    const cardColors = ["pink", "darkseagreen", "burlywood", "deepskyblue"];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="HomePage">
            <h2>Our Top Sellers!</h2>
			{loading ? (
                <div>Loading...</div>
            ) : (
                <div className="slider-container">
                    <Slider {...settings}>
                        {coupons?.map(c => <CouponCarouselCard key={c.id} id={c.id} category={c.category} title={c.title} image={c.image} price={c.price} />)}
                    </Slider>
                </div>
            )}
        </div>
    );
}

export default HomePage;
