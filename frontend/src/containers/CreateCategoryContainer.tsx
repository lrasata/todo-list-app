import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {createCategory} from "../redux-store/categories-slice.ts";


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

    const handleOnColourChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColour(e.target.value);
    }

    const handleOnSave = () => {
        // @ts-ignore
        dispatch(createCategory({ name, colour}));
        closeDialog();
    }

    return <Box display="flex" flexDirection="column" my={3} minWidth="300px">
        <TextField value={name} label="Enter a category name" size="medium" sx={{ mb: 2}} onChange={handleOnNameChange}/>
        <TextField value={colour} label="Enter a colour in hex code" size="medium" sx={{ mb: 2}} onChange={handleOnColourChange}/>
        <Button variant="contained" size="large" sx={{ maxWidth: "max-content"}} onClick={handleOnSave}>Save</Button>
    </Box>
}

export default CreateCategoryContainer;