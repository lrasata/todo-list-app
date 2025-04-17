import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {createCategory} from "../redux-store/categories-slice.ts";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {COLOUR_OPTIONS} from "../constants/constants.ts";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


interface Props {
    closeDialog: () => void;
}
const CreateCategoryContainer= ({ closeDialog } : Props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [colour, setColour] = useState<string>("");

    const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleOnColourChange = (event: SelectChangeEvent<string>) => {
        setColour(event.target.value);
    }

    const handleOnSave = () => {
        // @ts-ignore
        dispatch(createCategory({ name, colour}));
        closeDialog();
    }

    return <Box display="flex" flexDirection="column" my={3} minWidth="300px">
        <TextField value={name} label="Enter a category name" size="medium" sx={{ mb: 2}} onChange={handleOnNameChange}/>
        <FormControl>
            <InputLabel id="category-colour-select-label">Select a colour</InputLabel>
            <Select
                labelId="category-colour-select-label"
                id="category-colour-select"
                label="Select a colour"
                sx={{ mb: 2, backgroundColor: "white" }}
                defaultValue = ""
                onChange={handleOnColourChange}
                value={colour}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    COLOUR_OPTIONS.map(colour => (
                        <MenuItem key={colour.name} value={colour.value}>{colour.name}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>

        <Button variant="contained" size="large" sx={{ maxWidth: "max-content"}} onClick={handleOnSave}>Save</Button>
    </Box>
}

export default CreateCategoryContainer;