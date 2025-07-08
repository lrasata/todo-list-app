import { ICategory } from "../types/types.ts";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { ChangeEvent } from "react";

interface CategoryFilterContainerProps {
  categories: ICategory[];
  selectedCategories: ICategory[];
  handleCategoryFilterChange: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
}

const CategoryFilterContainer = ({
  categories = [],
  selectedCategories = [],
  handleCategoryFilterChange,
}: CategoryFilterContainerProps) => {
  return (
    <FormGroup>
      <FormLabel component="legend">Filter by category</FormLabel>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {categories.length > 0 &&
          categories.map((category: ICategory) => (
            <FormControlLabel
              key={`${category._id}-filter`}
              control={
                <Checkbox
                  checked={
                    !!selectedCategories.find(
                      (item) => item._id === category._id,
                    ) || false
                  }
                  onChange={handleCategoryFilterChange}
                />
              }
              name={category.name}
              label={category.name}
              sx={{ mr: 4 }}
            />
          ))}
      </Box>
    </FormGroup>
  );
};

export default CategoryFilterContainer;
