import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { ICategory } from "../types/types.ts";
import { ReactNode } from "react";

interface Props {
  categories: ICategory[];
  onCreateNewTask: () => void;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  value?: string;
}
const SelectOrCreateCategory = ({
  value,
  categories = [],
  onCreateNewTask,
  onChange,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FormControl
      sx={{ display: "flex", flexDirection: "column", maxWidth: "max-content" }}
    >
      <InputLabel id="category-select-label">Select a category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        label="Select a category"
        sx={{ minWidth: 300, mb: 2, backgroundColor: "white" }}
        fullWidth={isMobile}
        defaultValue=""
        onChange={onChange}
        value={value}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem value={category._id}>{category.name}</MenuItem>
        ))}
      </Select>
      <Button variant="outlined" onClick={onCreateNewTask}>
        create a new category
      </Button>
    </FormControl>
  );
};

export default SelectOrCreateCategory;
