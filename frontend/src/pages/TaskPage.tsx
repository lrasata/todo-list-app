import DueTodayTaskContainer from "../containers/DueTodayTaskContainer.tsx";
import {ToastContainer} from "react-toastify";
import AllTaskContainer from "../containers/AllTaskContainer.tsx";

interface TaskPageProps {
    path: string;
}
const TaskPage = ({ path }: TaskPageProps) => {

    return (
        <>
            {
                path === '/' && <DueTodayTaskContainer />
            }
            {
                path === 'all-tasks' && <AllTaskContainer />
            }
            <ToastContainer />
        </>

    );
};

export default TaskPage;