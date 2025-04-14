import LogOutButtonContainer from "../containers/LogOutButtonContainer.tsx";
import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {fetchDueTodayTasks, fetchOverdueTasks} from "../redux-store/tasks-slice.ts";
import {useDispatch} from "react-redux";

const MainContent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDueTodayTasks());
        // @ts-ignore
        dispatch(fetchOverdueTasks());
    }, []);


    return <>
        <LogOutButtonContainer />
        <MainNavigation  />
        <Outlet />
    </>
}

export default MainContent;