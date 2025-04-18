import LogOutButtonContainer from "../containers/LogOutButtonContainer.tsx";
import MainNavigation from "../components/MainNavigation.tsx";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchDueTodayTasks, fetchOverdueTasks} from "../redux-store/tasks-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "../components/Dialog.tsx";
import CreateCategoryContainer from "../containers/CreateCategoryContainer.tsx";
import {dialogActions} from "../redux-store/dialog-slice.ts";
import {fetchCategories} from "../redux-store/categories-slice.ts";
import {useCookies} from "react-cookie";

const MainContent = () => {
    const dispatch = useDispatch();
    const dialogSelector = useSelector((state: { dialog: { isOpen: boolean; }; }) => state.dialog.isOpen);
    const [openDialog, setOpenDialog] = useState(dialogSelector);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        if (cookies.token) {
            // @ts-ignore
            dispatch(fetchDueTodayTasks());
            // @ts-ignore
            dispatch(fetchOverdueTasks());
            // @ts-ignore
            dispatch(fetchCategories());
        }
    }, [cookies]);

    useEffect(() => {
        setOpenDialog(dialogSelector);
    }, [dialogSelector]);

    const handleCloseDialog = () => {
        dispatch(dialogActions.close());
    };


    return <>
        {
            cookies.token && <>
                <LogOutButtonContainer />
                <MainNavigation  />
            </>
        }

        <Outlet />
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            title={"Create a new category"}
            content={<CreateCategoryContainer closeDialog={handleCloseDialog}/>}
        />
    </>
}

export default MainContent;