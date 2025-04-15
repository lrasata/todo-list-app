import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, useMediaQuery, useTheme} from "@mui/material";

interface Props {
    onCreateNewTask: () => void;
}
const SelectOrCreateCategory = ({ onCreateNewTask } : Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return <FormControl sx={{ display: "flex", flexDirection: "column", maxWidth: "max-content" }}>
        <InputLabel id="demo-simple-select-label">Select a category</InputLabel>
        <Select
            labelId="category-select-label"
            id="category-select"
            label="Select a category"
            sx={{ minWidth: 300, mb: 2 }}
            fullWidth={isMobile}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Button variant="outlined" onClick={onCreateNewTask}>create a new category</Button>
    </FormControl>
}

export default SelectOrCreateCategory;