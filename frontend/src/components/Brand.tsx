import logo from '../assets/todolist-logo.png';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const Brand = ({height = 300}) => {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <img src={logo} alt="React logo" height={height}/>
        <Typography variant="h4" gutterBottom>My TODO List</Typography>
        <Typography variant="subtitle1" color="textSecondary" textAlign="center">Built with MongoDB + NodeJS + Express + Vite + React</Typography>
    </Box>
}

export default Brand;