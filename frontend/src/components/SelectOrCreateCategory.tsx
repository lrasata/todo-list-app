import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";

const SelectOrCreateCategory = () => {

    return <FormControl sx={{ display: "flex", flexDirection: "column", maxWidth: "max-content" }}>
        <InputLabel id="demo-simple-select-label">Select a category</InputLabel>
        <Select
            labelId="category-select-label"
            id="category-select"
            label="Select a category"
            sx={{ minWidth: 300 }}
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Button variant="text" >or create a new category</Button>
    </FormControl>
}

export default SelectOrCreateCategory;