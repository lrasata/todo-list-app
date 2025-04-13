import {useLocation, useNavigate} from 'react-router-dom';

import {Box, Tab, Tabs} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";

const MainNavigation = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname !== '') {
            if (pathname === '/overdue-tasks'){
                setValue(1);
            }
            if (pathname === '/all-tasks'){
                setValue(2);
            }
        }
    }, [pathname])

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 1) {
            navigate("/overdue-tasks");
        } else {
            if (newValue === 2) {
                navigate("/all-tasks");
            } else {
                navigate("/");
            }
        }

    };

    return (
        <Box justifyContent="center" flexDirection="row" display="flex">
            <Tabs value={value} onChange={handleChange} aria-label="main navigation">
                <Tab label="Home"/>
                <Tab label="Overdue tasks" />
                <Tab label="All tasks" />
            </Tabs>
        </Box>
    );
}

export default MainNavigation;