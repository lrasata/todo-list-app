import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios, { AxiosError } from "axios";
import { API_BACKEND_URL } from "../constants/constants.ts";

interface Props {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post(
          API_BACKEND_URL,
          {},
          { withCredentials: true },
        );
        const { status, user } = data;

        if (status) {
          setIsAuthenticated(true);
          toast.success(`Hello ${user}`, {
            position: "top-left",
          });
        }
      } catch (e) {
        const error = e as AxiosError;
        console.error(e);
        toast.error(error.message, {
          position: "top-left",
        });
        navigate("/login");
      }
    };
    verifyCookie();
  }, []);

  return (
    <>
      {isAuthenticated && children}
      <ToastContainer />
    </>
  );
};

export default ProtectedRoute;
