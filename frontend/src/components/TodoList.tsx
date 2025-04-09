import React from "react";
import {Box, Button, Card, Checkbox, IconButton, Stack, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ITask} from "../types/types.ts";
import DateChip from "./DateChip.tsx";
import BasicDatePicker from "./BasicDatePicker.tsx";
import dayjs, {Dayjs} from 'dayjs';


interface ITodoList {
    tasks: ITask[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    editingTitle: string;
    setEditingTitle: (title: string) => void;
    editingTaskDate: Dayjs | null;
    setEditingTaskDate: (date: Dayjs) => void;
    editingTaskId: string | null;
    setEditingTaskId: (id: string | null) => void;
    startEditing: (id: string) => void;
    handleTitleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTaskDateEditChange: (date: Dayjs | null) => void;
}


const TodoList = ({
                      tasks,
                      deleteTask,
                      updateTask,
                      editingTitle,
                      setEditingTitle,
                      editingTaskDate,
                      setEditingTaskDate,
                      editingTaskId,
                      setEditingTaskId,
                      startEditing,
                      handleTitleEditChange,
                      handleTaskDateEditChange,
                  }: ITodoList) => {

    return (
        <>
            {tasks.map((task) => {
                const label = { inputProps: { 'aria-label': task.title } };

                return <Card key={task._id} sx={{ my: 2, py: 2, px: 1 }}>
                            {editingTaskId === task._id ? (
                                <>
                                    <Box display="flex" flexDirection="row">
                                        <TextField value={editingTitle} onChange={handleTitleEditChange} size="small" fullWidth />
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                updateTask(task._id, {title: editingTitle, taskDate: dayjs(editingTaskDate)});
                                                setEditingTaskId(null);
                                            }}
                                            sx={{ ml: 2 }}
                                            size="small"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                    <BasicDatePicker value={editingTaskDate || dayjs()} onChange={handleTaskDateEditChange}/>
                                </>

                            ) : (
                                <>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                        <Box display="flex" flexDirection="row" alignItems="center">
                                            <Checkbox {...label}
                                                      checked={task.completed}
                                                      onChange={() => updateTask(task._id, {completed: !task.completed})}
                                            />
                                            <Typography variant="body1" sx={{textDecoration: task.completed ? "line-through" : "none"}} gutterBottom>
                                                {task.title}
                                            </Typography>
                                        </Box>
                                        <Stack direction="row" spacing={0}>
                                            <IconButton
                                                onClick={() => {
                                                    startEditing(task._id);
                                                    setEditingTitle(task.title);
                                                    setEditingTaskDate(dayjs(task.taskDate));
                                                }}
                                                color="primary"
                                                aria-label="Edit"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => deleteTask(task._id)}
                                                color="error"
                                                aria-label="Delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                    { task.taskDate && <DateChip dateLabel={task.taskDate.toString()}/>}
                                </>

                            )}
                </Card>
            })}
        </>
    );
};

export default TodoList;