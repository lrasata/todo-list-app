import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_TASKS_ENDPOINT} from '../constants/constants.ts';
import TodoList from '../components/TodoList.tsx';
import {
    Box
} from '@mui/material';
import {ITask} from "../types/types.ts";
import {toast} from "react-toastify";
import dayjs, {Dayjs} from "dayjs";


const AllTaskContainer = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");
    const [editingTaskDate, setEditingTaskDate] = useState<Dayjs | null>(dayjs());

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
                tasks.map((task: ITask) =>
                    task._id === id ? { ...task, ...response.data } : task
                )
            );
            setEditingTaskId(null);
            setEditingTitle("");
            setEditingTaskDate(dayjs());
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

    const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(e.target.value);
    };

    const handleTaskDateEditChange = (date: Dayjs | null) => {
        setEditingTaskDate(date);
    };

    return (
        <Box my={1}>
            <TodoList
                tasks={tasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                editingTitle={editingTitle}
                setEditingTitle={setEditingTitle}
                editingTaskDate={editingTaskDate}
                setEditingTaskDate={setEditingTaskDate}
                editingTaskId={editingTaskId}
                setEditingTaskId={setEditingTaskId}
                startEditing={startEditing}
                handleTitleEditChange={handleEditTitleChange}
                handleTaskDateEditChange={handleTaskDateEditChange}
                displayDate={true}
            />
        </Box>
    );

}

export default AllTaskContainer;