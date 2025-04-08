import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_TASKS_ENDPOINT} from '../constants/constants.ts';
import TodoList from '../components/TodoList.tsx';
import Typography from '@mui/material/Typography';
import {Box, Button, TextField} from '@mui/material';
import {ITask} from "../types/types.ts";
import {toast} from "react-toastify";


const TaskContainer = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [task, setTask] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<ITask[]>(API_TASKS_ENDPOINT, {withCredentials: true});
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                toast.error(`Error fetching tasks ${error}`, {
                    position: "top-left",
                });
            }
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!task) return;

        try {
            const response = await axios.post<ITask>(
                API_TASKS_ENDPOINT,
                { title: task },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            setTasks([...tasks, response.data]);
            setTask("");
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error(`Error adding task: ${error}`, {
                position: "top-left",
            });
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`${API_TASKS_ENDPOINT}/${id}`, {withCredentials: true});
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(`Error deleting task: ${error}`, {
                position: "top-left",
            });
        }
    };

    const updateTask = async (id: string, updatedTask: Partial<ITask>) => {
        try {
            const response = await axios.put(
                `${API_TASKS_ENDPOINT}/${id}`,
                updatedTask,
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            setTasks(
                tasks.map((task) =>
                    task._id === id ? { ...task, ...response.data } : task
                )
            );
            setEditingTaskId(null);
            setEditingTitle("");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error(`Error updating task: ${error}`, {
                position: "top-left",
            });
        }
    };

    const startEditing = (id: string) => {
        setEditingTaskId(id);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(e.target.value);
    };

    return (
        <Box my={3}>
            <Typography variant="h3" component="h1">My Todo List</Typography>
            <Box display="flex" flexDirection="row" my={3}>
                <TextField
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    sx={{ mr: 2, backgroundColor: 'white' }}
                    placeholder="Enter task description"
                    size="small"
                    fullWidth
                />
                <Button variant="contained" onClick={addTask} aria-label="Add task">Add</Button>
            </Box>
            <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                editingTitle={editingTitle}
                setEditingTitle={setEditingTitle}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                startEditing={startEditing}
                handleEditChange={handleEditChange}
            />
        </Box>
    );

}

export default TaskContainer;