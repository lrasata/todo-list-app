import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const LogOutButtonContainer = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleOnClickLogout = () => {
        navigate("/login");
        // @ts-ignore
        removeCookie("token");
    };

    return <Button variant="outlined" onClick={handleOnClickLogout} size="small">Log out</Button>
}

export default LogOutButtonContainer;