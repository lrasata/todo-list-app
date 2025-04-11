import React, {useState} from "react";
import {Box, Card} from "@mui/material";
import {ITask} from "../types/types.ts";
import dayjs, {Dayjs} from 'dayjs';
import {deleteTask, updateTask} from "../redux-store/tasks-slice.ts";
import {useDispatch} from "react-redux";
import TaskCardContentEdit from "../components/TaskCardContentEdit.tsx";
import TaskCardContent from "../components/TaskCardContent.tsx";


interface ITodoList {
    tasks: ITask[];
    displayDate: boolean;
}


const TodoListContainer = ({
                      tasks,
                      displayDate = true,
                  }: ITodoList) => {
    const dispatch = useDispatch();

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");
    const [editingTaskDate, setEditingTaskDate] = useState<Dayjs | null>(dayjs());

    const startEditing = (id: string) => {
        setEditingTaskId(id);
    };

    const handleEditTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingTitle(e.target.value);
    };

    const handleTaskDateEditChange = (date: Dayjs | null) => {
        setEditingTaskDate(date);
    };

    const handleDeleteTask = (id: string) => {
        // @ts-ignore
        dispatch(deleteTask({ id }));
    };

    const handleUpdateTask = async (id: string, updatedTask: Partial<ITask>) => {
        // @ts-ignore
        dispatch(updateTask({id, updatedTask}));
        setEditingTaskId(null);
        setEditingTitle("");
        setEditingTaskDate(dayjs());
    };

    return (
        <Box my={1}>
            {tasks.map((task) => {
                return <Card key={task._id} sx={{my: 2, padding: 1}}>
                    {editingTaskId === task._id ? (
                        <TaskCardContentEdit task={task} editingTitle={editingTitle} editingTaskDate={editingTaskDate}
                                             updateTask={handleUpdateTask} setEditingTaskId={setEditingTaskId}
                                             handleTitleEditChange={handleEditTitleChange}
                                             handleTaskDateEditChange={handleTaskDateEditChange}/>

                    ) : (<TaskCardContent task={task}
                                          updateTask={handleUpdateTask}
                                          startEditing={startEditing}
                                          deleteTask={handleDeleteTask}
                                          setEditingTitle={setEditingTitle} setEditingTaskDate={setEditingTaskDate}
                                          displayDate={displayDate}
                        />
                    )}
                </Card>
            })}
        </Box>
    );
};

export default TodoListContainer;