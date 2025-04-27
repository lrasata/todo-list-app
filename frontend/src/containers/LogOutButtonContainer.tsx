import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {DOMAIN, PROFILE} from "../constants/constants.ts";

const LogOutButtonContainer = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleOnClickLogout = () => {
        navigate("/login");
        let options: {path: string, domain?: string} = { path: '/'};  // Must match path used when setting the cookie

        if (PROFILE === "production") {
            options = {...options, domain: `.${DOMAIN}`};
        }
        // @ts-ignore
        removeCookie("token", options);
    };

    return <Button variant="outlined" onClick={handleOnClickLogout} size="small">Log out</Button>
}

export default LogOutButtonContainer;