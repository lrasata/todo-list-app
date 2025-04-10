import {useEffect, useState} from "react";
import axios from "axios";
import {ITask} from "../types/types.ts";
import {API_TASKS_OVERDUE} from "../constants/constants.ts";
import {toast} from "react-toastify";
import {Alert} from "@mui/material";
import Typography from "@mui/material/Typography";

const AlertOverdueTasksContainer = () => {
    const [overdueTasksCount, setOverdueTasksCount] = useState<number>(0);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<ITask[]>(API_TASKS_OVERDUE, {withCredentials: true});
                setOverdueTasksCount(response.data.length);
            } catch (error) {
                console.error("Error fetching overdue tasks:", error);
                toast.error(`Error fetching overdue tasks ${error}`, {
                    position: "top-left",
                });
            }
        };
        fetchTasks();
    }, []);

    return <>
        {
            overdueTasksCount > 0 && <Alert severity="warning">
                <Typography>
                    {`You have ${overdueTasksCount} overdue tasks`}
                </Typography>
            </Alert>
        }
    </>

}

export default AlertOverdueTasksContainer;