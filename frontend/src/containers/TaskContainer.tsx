import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_TASKS_DUE_TODAY, API_TASKS_ENDPOINT} from '../constants/constants.ts';
import TodoList from '../components/TodoList.tsx';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Stack,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {ITask} from "../types/types.ts";
import {toast} from "react-toastify";
import Brand from "../components/Brand.tsx";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs, {Dayjs} from "dayjs";
import AlertOverdueTasksContainer from "./AlertOverdueTasksContainer.tsx";


const TaskContainer = () => {
    const initialValue = { title: "", completed: false, taskDate: null }
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [currentTask, setCurrentTask] = useState<Pick<ITask, "title" | "completed" | "taskDate">>(initialValue);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");
    const [editingTaskDate, setEditingTaskDate] = useState<Dayjs | null>(dayjs());
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<ITask[]>(API_TASKS_DUE_TODAY, {withCredentials: true});
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
        if (!currentTask) return;

        try {
            const response = await axios.post<ITask>(
                API_TASKS_ENDPOINT,
                { title: currentTask.title, taskDate: currentTask.taskDate },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            setTasks([response.data, ...tasks]);
            setCurrentTask(initialValue);
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
            <Brand height={200}/>
            <Typography variant="h5" component="h2" gutterBottom my={2}>Your planned tasks for today</Typography>
            <AlertOverdueTasksContainer />
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
            />

            <Accordion sx={{ my: 3 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="create-task"
                    id="panel1-create-task"
                >
                    <Typography variant="h6" component="span" color="primary">Create new task</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1}>
                        <TextField
                            value={currentTask.title}
                            onChange={(e) => setCurrentTask(
                                (prevState) => ({ ...prevState, title: e.target.value })
                            )}
                            sx={{ backgroundColor: 'white' }}
                            placeholder="Enter task description"
                            size="medium"
                            fullWidth
                        />
                        <BasicDatePicker onChange={(date) => setCurrentTask(
                            (prevState) => ({ ...prevState, taskDate: dayjs(date) })
                        )}/>
                        <Button variant="contained" onClick={addTask} aria-label="Add task" sx={{ width: isMobile ? "inherit" : "max-content"}}>Add</Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    );

}

export default TaskContainer;