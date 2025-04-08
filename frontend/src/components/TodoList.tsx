import React from "react";
import {Box, Button, Card, Checkbox, IconButton, Stack, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ITask} from "../types/types.ts";

interface ITodoList {
    tasks: ITask[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    editingTitle: string;
    setEditingTitle: (title: string) => void;
    editingTaskId: string | null;
    setEditingTaskId: (id: string | null) => void;
    startEditing: (id: string) => void;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const TodoList = ({
                      tasks,
                      deleteTask,
                      updateTask,
                      editingTitle,
                      setEditingTitle,
                      editingTaskId,
                      setEditingTaskId,
                      startEditing,
                      handleEditChange,
                  }: ITodoList) => {

    return (
        <>
            {tasks.map((task) => {
                const label = { inputProps: { 'aria-label': task.title } };

                return <Card key={task._id} sx={{ my: 2, py: 2, px: 1 }}>
                            {editingTaskId === task._id ? (
                                <Box display="flex" flexDirection="row">
                                    <TextField value={editingTitle} onChange={handleEditChange} size="small" fullWidth/>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            updateTask(task._id, {title: editingTitle});
                                            setEditingTaskId(null);
                                        }}
                                        sx={{ ml: 2 }}
                                        size="small"
                                    >
                                        Save
                                    </Button>
                                </Box>
                            ) : (
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
                            )}
                </Card>
            })}
        </>
    );
};

export default TodoList;