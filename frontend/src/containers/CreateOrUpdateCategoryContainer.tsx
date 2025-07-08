import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../redux-store/categories-slice.ts";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { COLOUR_OPTIONS } from "../constants/constants.ts";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { AppDispatch } from "../redux-store";

interface Props {
  closeDialog: () => void;
  name?: string;
  colour?: string;
  _id?: string;
}
const CreateOrUpdateCategoryContainer = ({
  closeDialog,
  name,
  colour,
  _id,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentName, setCurrentName] = useState<string>(name || "");
  const [currentColour, setCurrentColour] = useState<string>(colour || "");

  const handleOnNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleOnColourChange = (event: SelectChangeEvent<string>) => {
    setCurrentColour(event.target.value);
  };

  const handleOnSave = () => {
    if (_id) {
      dispatch(
        updateCategory({ _id, name: currentName, colour: currentColour }),
      );
    } else {
      dispatch(createCategory({ name: currentName, colour: currentColour }));
    }

    closeDialog();
  };

  return (
    <Box display="flex" flexDirection="column" my={3} minWidth="300px">
      <TextField
        value={currentName}
        label="Enter a category name"
        size="medium"
        sx={{ mb: 2 }}
        onChange={handleOnNameChange}
      />
      <FormControl>
        <InputLabel id="category-colour-select-label">
          Select a colour
        </InputLabel>
        <Select
          labelId="category-colour-select-label"
          id="category-colour-select"
          label="Select a colour"
          sx={{ mb: 2, backgroundColor: "white" }}
          defaultValue=""
          onChange={handleOnColourChange}
          value={currentColour}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {COLOUR_OPTIONS.map((colour) => (
            <MenuItem key={colour.name} value={colour.value}>
              {colour.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        sx={{ maxWidth: "max-content" }}
        onClick={handleOnSave}
      >
        Save
      </Button>
    </Box>
  );
};

export default CreateOrUpdateCategoryContainer;
