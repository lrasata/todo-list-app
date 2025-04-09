import logo from '../assets/todolist-logo.png';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const Brand = ({height = 300}) => {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="row" my={2}>
            <a href="https://react.dev" target="_blank">
                <img src={logo} alt="React logo" height={height}/>
            </a>
        </Box>
        <Typography variant="h4" gutterBottom>My TODO List </Typography>
        <Typography variant="subtitle1" color="textSecondary">Built with MongoDB + NodeJS + Express + Vite + React</Typography>
    </Box>
}

export default Brand;