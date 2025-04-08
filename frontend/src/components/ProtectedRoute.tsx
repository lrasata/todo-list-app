import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {toast, ToastContainer} from "react-toastify";
import axios, {AxiosError} from "axios";
import {API_BACKEND_URL} from "../constants/constants.ts";

interface Props {
    children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
    const [cookies] = useCookies(['token']);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookie = async () => {
            // @ts-ignore
            if (!cookies.token) {
                setIsAuthenticated(false)
                toast.error('You are not logged in!', {
                    position: "top-left",
                });
            }
            try {
                const { data } = await axios.post(
                    API_BACKEND_URL,
                    {},
                    { withCredentials: true }
                );
                const { status, user } = data;

                if (status) {
                    setIsAuthenticated(true);
                    toast.success(`Hello ${user}`, {
                        position: "top-left",
                    })
                }
            } catch (e) {
                const error = e as AxiosError;
                console.error(e);
                toast.error(error.message, {
                    position: "top-left",
                })
                navigate("/login");
            }
        };
        verifyCookie();
    }, [cookies]);

    return <>
        {
            (isAuthenticated  && children )
        }
        <ToastContainer />
    </>
};

export default ProtectedRoute;