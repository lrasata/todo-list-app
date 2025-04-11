import TodoListContainer from '../containers/TodoListContainer.tsx';
import {useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";

const OverdueTaskContainer = () => {
    // @ts-ignore
    const overdueTasksSelector = useSelector(state => state.tasks.overdueTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);


    return (
        <>
            {
                isLoading ? <Spinner/> : (<TodoListContainer tasks={overdueTasksSelector} displayDate={true}/>)
            }
        </>

    );

}

export default OverdueTaskContainer;