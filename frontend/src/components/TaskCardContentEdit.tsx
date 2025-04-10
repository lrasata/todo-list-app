import {Box, Button, TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import BasicDatePicker from "./BasicDatePicker.tsx";
import {ITask} from "../types/types.ts";
import React from "react";

interface TaskCardEditProps {
    task: ITask;
    editingTitle: string;
    editingTaskDate: Dayjs | null;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    setEditingTaskId: (id: string | null) => void;
    handleTitleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTaskDateEditChange: (date: Dayjs | null) => void;
}


const TaskCardContentEdit = ({
                          task,
                          editingTitle,
                          editingTaskDate,
                          updateTask,
                          setEditingTaskId,
                          handleTaskDateEditChange,
                          handleTitleEditChange
                      }: TaskCardEditProps) => {
    return <>
        <Box display="flex" flexDirection="row">
            <TextField value={editingTitle} onChange={handleTitleEditChange} size="small" fullWidth/>
            <Button
                variant="contained"
                onClick={() => {
                    updateTask(task._id, {title: editingTitle, taskDate: dayjs(editingTaskDate)});
                    setEditingTaskId(null);
                }}
                sx={{ml: 2}}
                size="small"
            >
                Save
            </Button>
        </Box>
        <BasicDatePicker value={editingTaskDate || dayjs()} onChange={handleTaskDateEditChange}/>
    </>
}

export default TaskCardContentEdit;