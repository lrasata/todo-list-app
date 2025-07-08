import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const AlertOverdueTasksContainer = () => {
  // @ts-ignore
  const overdueTasksSelector = useSelector((state) => state.tasks.overdueTasks);

  return (
    <>
      {overdueTasksSelector.length > 0 && (
        <Alert severity="warning">
          <Typography>
            {"You have "}
            <Link to="/overdue-tasks">{`${overdueTasksSelector.length} overdue ${overdueTasksSelector.length === 1 ? "task" : "tasks"}`}</Link>
            {" which need your attention."}
          </Typography>
        </Alert>
      )}
    </>
  );
};

export default AlertOverdueTasksContainer;
