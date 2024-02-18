import { Stack } from "@mui/material";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';

function Header(): JSX.Element {
    return (
        <div className="Header">
            <Stack direction="row" alignItems="center" justifyContent="center">
                <CardGiftcardTwoToneIcon fontSize="large"/>
                <h1>John Coupon Website</h1>
            </Stack>
        </div>
    );
}

export default Header;
