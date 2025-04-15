import {Box, Button, TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import BasicDatePicker from "./BasicDatePicker.tsx";
import {ICategory, ITask} from "../types/types.ts";
import React, {ReactNode} from "react";
import SelectOrCreateCategory from "./SelectOrCreateCategory.tsx";
import {SelectChangeEvent} from "@mui/material/Select";

interface TaskCardEditProps {
    task: ITask;
    editingTitle: string;
    editingTaskDate: Dayjs | null;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    setEditingTaskId: (id: string | null) => void;
    handleTitleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTaskDateEditChange: (date: Dayjs | null) => void;
    editingCategoryId: string | null;
    categories: ICategory[];
    handleOpenDialog: () => void;
    handleOnCategoryChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
}


const TaskCardContentEdit = ({
                                 task,
                                 editingTitle,
                                 editingTaskDate,
                                 updateTask,
                                 setEditingTaskId,
                                 handleTaskDateEditChange,
                                 handleTitleEditChange,
                                 editingCategoryId,
                                 categories,
                                 handleOpenDialog,
                                 handleOnCategoryChange,
                             }: TaskCardEditProps) => {
    return <>
        <Box display="flex" flexDirection="row">
            <TextField value={editingTitle} onChange={handleTitleEditChange} size="small" fullWidth/>
            <Button
                variant="contained"
                onClick={() => {
                    updateTask(task._id, {title: editingTitle, taskDate: dayjs(editingTaskDate), category: { categoryId: editingCategoryId || ''}});
                    setEditingTaskId(null);
                }}
                sx={{ml: 2}}
                size="small"
            >
                Save
            </Button>
        </Box>
        <Box my={1}>
            <BasicDatePicker value={editingTaskDate || dayjs()} onChange={handleTaskDateEditChange}/>
        </Box>
        <Box my={1}>
            <SelectOrCreateCategory value={editingCategoryId || ""}
                                    categories={categories}
                                    onCreateNewTask={handleOpenDialog}
                                    onChange={handleOnCategoryChange}
            />
        </Box>

    </>
}

export default TaskCardContentEdit;