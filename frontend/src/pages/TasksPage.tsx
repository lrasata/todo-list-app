import TaskContainer from "../containers/TaskContainer.tsx";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Button} from "@mui/material";
import {useCookies} from "react-cookie";

const TasksPage = () => {
    const navigate = useNavigate();
    // @ts-ignore
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleOnClickLogout = () => {
        navigate("/login");
        // @ts-ignore
        removeCookie("token");
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOnClickLogout}>Log out</Button>
            <TaskContainer />
            <ToastContainer />
        </>

    );
};

export default TasksPage;