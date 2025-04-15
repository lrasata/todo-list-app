import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {ICategory} from "../types/types.ts";
import {API_CATEGORIES_ENDPOINT} from "../constants/constants.ts";


interface Props {
    closeDialog: () => void;
}
const CreateCategoryContainer= ({ closeDialog } : Props) => {
    const [name, setName] = useState<string>("");
    const [colour, setColour] = useState<string>("");
    const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);

    const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleOnColourChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColour(e.target.value);
    }

    const handleOnSave = () => {
        setIsSaveClicked(true);
    }

    useEffect(() => {
        const postData = async () => {
            try {
                await axios.post<ICategory>(
                    API_CATEGORIES_ENDPOINT,
                    { name, colour },
                    {headers: {"Content-Type": "application/json"}, withCredentials: true}
                );

            } catch (error) {
                console.error("Error adding task:", error);
            }
        };

        if (isSaveClicked) {
            postData();
            closeDialog();
        }

    }, [isSaveClicked]);

    return <Box display="flex" flexDirection="column" my={3} minWidth="300px">
        <TextField value={name} label="Enter a category name" size="medium" sx={{ mb: 2}} onChange={handleOnNameChange}/>
        <TextField value={colour} label="Enter a colour in hex code" size="medium" sx={{ mb: 2}} onChange={handleOnColourChange}/>
        <Button variant="contained" size="large" sx={{ maxWidth: "max-content"}} onClick={handleOnSave}>Save</Button>
    </Box>
}

export default CreateCategoryContainer;