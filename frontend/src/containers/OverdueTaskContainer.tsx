import TodoListContainer from '../containers/TodoListContainer.tsx';
import {useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";
import Typography from "@mui/material/Typography";

const OverdueTaskContainer = () => {
    // @ts-ignore
    const overdueTasksSelector = useSelector(state => state.tasks.overdueTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);


    return (
        <>
            <Typography variant="h5" component="h2" gutterBottom my={2}>Quick reminder — these tasks are waiting for you!</Typography>
            {
                isLoading ? <Spinner/> : (<TodoListContainer tasks={overdueTasksSelector} displayDate={true}/>)
            }
        </>

    );

}

export default OverdueTaskContainer;