import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {API_LOGIN_ENDPOINT} from "../constants/constants.ts";
import Typography from "@mui/material/Typography";
import {Box, Button, useTheme, TextField, useMediaQuery} from "@mui/material";
import {useCookies} from "react-cookie";
import Brand from "../components/Brand.tsx";

const LoginPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    // @ts-ignore
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;

    useEffect(() => {
        removeCookie("token");
    }, [])

    const handleOnChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err: string) =>
        toast.error(err, {
            position: "top-left",
        });
    const handleSuccess = (msg: string) =>
        toast.success(msg, {
            position: "top-left",
        });

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                API_LOGIN_ENDPOINT,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                navigate("/");
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Brand />
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3 }}
            >
                <Typography variant="h5" component="h1">Log in</Typography>
                <TextField
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                    label="Email"
                    sx={{ backgroundColor: "white" }}
                />
                <TextField
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                    label="Password"
                    sx={{ backgroundColor: "white" }}
                />
                <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
                    <Button variant="contained" type="submit" fullWidth={isMobile}>Submit</Button>
                    <Typography>Already have an account? <Link to={"/signup"}>Signup</Link></Typography>
                </Box>
            </Box>
            <ToastContainer />
        </>

    );
};

export default LoginPage;