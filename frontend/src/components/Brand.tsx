import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const Brand = () => {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="row" my={5}>
            <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} alt="Vite logo" height={50}/>
            </a>
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} alt="React logo" height={50}/>
            </a>

        </Box>
        <Typography variant="h4">My TODO List App</Typography>
        <Typography variant="subtitle2">Built with Vite + React</Typography>
    </Box>
}

export default Brand;