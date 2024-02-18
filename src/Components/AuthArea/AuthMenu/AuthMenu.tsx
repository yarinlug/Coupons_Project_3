import { NavLink, useNavigate } from "react-router-dom";
import "./AuthMenu.css";
import { logout as logoutAction } from "../../../Redux/AuthSlice";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";
import { authStore } from "../../../Redux/OurStore";

function AuthMenu(): JSX.Element {
    const navigate = useNavigate();

    const logout = () => {
        authService.logout()
            .then(() => {
                navigate("/homepage");
            })
            .catch(err => errorHandler.showError(err));
    };

    return (
        <div className="AuthMenu">
            {authStore.getState().token.length > 0 ? (
                <a href='#' onClick={logout}>Logout</a>
            ) : (
                <NavLink to="/auth/login">Login</NavLink>
            )}
        </div>
    );
}

export default AuthMenu;
