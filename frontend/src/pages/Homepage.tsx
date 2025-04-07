import TaskContainer from "../containers/TaskContainer.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Button} from "@mui/material";

const Homepage = () => {
    const navigate = useNavigate();
    const [cookies, _, removeCookie] = useCookies([]);

    useEffect(() => {
        const verifyCookie = async () => {
            // @ts-ignore
            if (!cookies.token) {
                toast.error('You are not logged in!', {
                    position: "top-left",
                });
            }
            const { data } = await axios.post(
                'http://localhost:8080/',
                {},
                { withCredentials: true }
            );
            const { status, user } = data;

            if (status) {
                toast(`Hello ${user}`, {
                    position: "top-left",
                })
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const handleOnClickLogout = () => {
        // @ts-ignore
        removeCookie("token");
        navigate("/login");
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOnClickLogout}>Log out</Button>
            <TaskContainer />
            <ToastContainer />
        </>

    );
};

export default Homepage;