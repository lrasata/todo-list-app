import TaskContainer from "./containers/TaskContainer.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import Container from '@mui/material/Container';

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

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <TaskContainer />
            </Container>
        </ThemeProvider>

    );
};

export default App;