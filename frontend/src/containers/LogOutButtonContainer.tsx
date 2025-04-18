import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {DOMAIN, NODE_ENV} from "../constants/constants.ts";

const LogOutButtonContainer = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleOnClickLogout = () => {
        navigate("/login");
        // @ts-ignore
        removeCookie("token", {
            path: '/', // Must match path used when setting the cookie
            ...NODE_ENV === 'production' && { domain: `.${DOMAIN}` }
        });
    };

    return <Button variant="outlined" onClick={handleOnClickLogout} size="small">Log out</Button>
}

export default LogOutButtonContainer;