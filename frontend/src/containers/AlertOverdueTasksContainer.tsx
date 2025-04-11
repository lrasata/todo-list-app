import {Alert} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

const AlertOverdueTasksContainer = () => {
    // @ts-ignore
    const overdueTasksSelector = useSelector(state => state.tasks.overdueTasks);

    return <>
        {
            overdueTasksSelector.length > 0 && <Alert severity="warning">
                <Typography>
                    {`You have ${overdueTasksSelector.length} overdue tasks`}
                </Typography>
            </Alert>
        }
    </>

}

export default AlertOverdueTasksContainer;