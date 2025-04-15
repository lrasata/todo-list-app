import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, useMediaQuery, useTheme} from "@mui/material";
import {ICategory} from "../types/types.ts";

interface Props {
    categories: ICategory[] ;
    onCreateNewTask: () => void;
}
const SelectOrCreateCategory = ({ categories = [], onCreateNewTask } : Props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return <FormControl sx={{ display: "flex", flexDirection: "column", maxWidth: "max-content" }}>
        <InputLabel id="category-select-label">Select a category</InputLabel>
        <Select
            labelId="category-select-label"
            id="category-select"
            label="Select a category"
            sx={{ minWidth: 300, mb: 2 }}
            fullWidth={isMobile}
            defaultValue = ""
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {
                categories.map(category => (
                    <MenuItem value={category._id}>{category.name}</MenuItem>
                ))
            }
        </Select>
        <Button variant="outlined" onClick={onCreateNewTask}>create a new category</Button>
    </FormControl>
}

export default SelectOrCreateCategory;