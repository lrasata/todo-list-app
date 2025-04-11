import TodoListContainer from '../containers/TodoListContainer.tsx';
import {useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";

const AllTaskContainer = () => {
    // @ts-ignore
    const allTasksSelector = useSelector(state => state.tasks.allTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);


    return (
        <>
            {
                isLoading ? <Spinner/> : (<TodoListContainer tasks={allTasksSelector} displayDate={true}/>)
            }
        </>

    );

}

export default AllTaskContainer;