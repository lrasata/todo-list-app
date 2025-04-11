import DueTodayTaskContainer from "../containers/DueTodayTaskContainer.tsx";
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
        </>

    );
};

export default TaskPage;