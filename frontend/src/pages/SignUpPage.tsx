import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {API_SIGN_UP_ENDPOINT} from "../constants/constants.ts";
import {Box, Button, Card, TextField, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";

const SignUpPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;

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
                API_SIGN_UP_ENDPOINT,
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                navigate("/login");
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Card>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3 }}
                >
                    <Typography variant="h4" component="h1">Sign up</Typography>
                    <TextField
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter your email"
                        label="Email"
                    />
                    <TextField
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        label="Username"
                        onChange={handleOnChange}
                    />
                    <TextField
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                        label="Password"
                    />
                    <Box display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
                        <Button variant="contained" type="submit" fullWidth={isMobile}>Submit</Button>
                        <Typography>Already have an account? <Link to={"/login"}>Login</Link></Typography>
                    </Box>
                </Box>
            </Card>
            <ToastContainer />
        </>
    );
};

export default SignUpPage;