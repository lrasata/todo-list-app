import TodoListContainer from '../containers/TodoListContainer.tsx';
import Spinner from "../components/Spinner.tsx";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {fetchOverdueTasks} from "../redux-store/tasks-slice.ts";
import {useDispatch, useSelector} from "react-redux";

const OverdueTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const overdueTasksSelector = useSelector(state => state.tasks.overdueTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchOverdueTasks());
    }, []);


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