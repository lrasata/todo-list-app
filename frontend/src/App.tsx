import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList.tsx";
import "./App.css";
import {API_TASKS_ENDPOINT} from "./constants/constants.ts";

interface Task {
    _id: string;
    title: string;
    completed: boolean;
}

const App = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<Task[]>(API_TASKS_ENDPOINT);
                console.log("Fetched tasks:", response.data); // Debugging log
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!task) return;

        try {
            console.log("Adding task:", task); // Debugging log
            const response = await axios.post<Task>(
                API_TASKS_ENDPOINT,
                { title: task },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Task added response:", response.data);
            setTasks([...tasks, response.data]);
            setTask("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`${API_TASKS_ENDPOINT}/${id}`);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTask = async (id: string, updatedTask: Partial<Task>) => {
        try {
            const response = await axios.put(
                `${API_TASKS_ENDPOINT}/${id}`,
                updatedTask,
                { headers: { "Content-Type": "application/json" } }
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
        }
    };

    const startEditing = (id: string) => {
        setEditingTaskId(id);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(e.target.value);
    };

    return (
        <div className="App">
            <h1>Todo App</h1>
            <div>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
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
        </div>
    );
};

export default App;