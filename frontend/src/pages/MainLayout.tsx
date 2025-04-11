import {Outlet} from 'react-router-dom';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {CookiesProvider} from "react-cookie";
import MainNavigation from "../components/MainNavigation.tsx";
import LogOutButtonContainer from "../containers/LogOutButtonContainer.tsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchAllTasks, fetchDueTodayTasks, fetchOverdueTasks} from "../redux-store/tasks-slice.ts";

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});


const MainLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchDueTodayTasks());
        // @ts-ignore
        dispatch(fetchAllTasks());
        // @ts-ignore
        dispatch(fetchOverdueTasks());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <Container maxWidth="md" sx={{ my: 4}}>
                    <LogOutButtonContainer />
                    <MainNavigation  />
                    <Outlet />
                </Container>
            </CookiesProvider>
        </ThemeProvider>
    );
}

export default MainLayout;