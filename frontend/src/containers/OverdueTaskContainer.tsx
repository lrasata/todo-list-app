import TodoListContainer from '../containers/TodoListContainer.tsx';
import Spinner from "../components/Spinner.tsx";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchOverdueTasks} from "../redux-store/tasks-slice.ts";
import {fetchCategories} from "../redux-store/categories-slice.ts";

const OverdueTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const overdueTasksSelector = useSelector(state => state.tasks.overdueTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchOverdueTasks());

        // @ts-ignore
        dispatch(fetchCategories());
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