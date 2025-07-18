import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  styled,
  TableBody,
} from "@mui/material";
import { ICategory } from "../types/types.ts";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { dialogActions } from "../redux-store/dialog-slice.ts";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../redux-store/categories-slice.ts";
import { RootState } from "../redux-store";

interface StyledTableRowProps extends TableRowProps {
  categoryColour?: string; // Make categoryColour optional or required
}

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "categoryColour",
})<StyledTableRowProps>(({ categoryColour }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  backgroundColor: categoryColour,
}));

const TaskCategoryContainer = () => {
  const dispatch = useDispatch();

  const categoriesSelector = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const handleOpenDialog = (category?: ICategory) => {
    if (category) {
      dispatch(dialogActions.open({ title: "Update category", category }));
    } else {
      dispatch(
        dialogActions.open({
          title: "Create new category",
          category: undefined,
        }),
      );
    }
  };

  const handleOnDelete = (_id: string) => {
    // @ts-ignore
    dispatch(deleteCategory({ _id }));
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchCategories());
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        All task categories
      </Typography>
      <Button
        variant="contained"
        sx={{ my: 3 }}
        onClick={() => handleOpenDialog()}
      >
        Create a new category
      </Button>
      <TableContainer component={Paper}>
        <Table size="medium" aria-label="task category table">
          <TableHead>
            <TableRow>
              <TableCell>Category name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesSelector.map((category: ICategory) => (
              <StyledTableRow
                key={category.name}
                categoryColour={category.colour}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0} justifyContent="flex-end">
                    <IconButton
                      onClick={() => handleOpenDialog(category)}
                      color="primary"
                      aria-label="Edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOnDelete(category._id)}
                      color="error"
                      aria-label="Delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskCategoryContainer;
