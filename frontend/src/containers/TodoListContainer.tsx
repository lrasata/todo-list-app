import React, {useState} from "react";
import {Alert, Box, Card, useTheme} from "@mui/material";
import {ITask} from "../types/types.ts";
import dayjs, {Dayjs} from 'dayjs';
import {deleteTask, updateTask} from "../redux-store/tasks-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import TaskCardContentEdit from "../components/TaskCardContentEdit.tsx";
import TaskCardContent from "../components/TaskCardContent.tsx";
import Typography from "@mui/material/Typography";
import {dialogActions} from "../redux-store/dialog-slice.ts";


interface ITodoList {
    tasks: ITask[];
    displayDate: boolean;
}


const TodoListContainer = ({
                      tasks,
                      displayDate = true,
                  }: ITodoList) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>("");
    const [editingTaskDate, setEditingTaskDate] = useState<Dayjs | null>(dayjs());
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

    // @ts-ignore
    const categoriesSelector = useSelector( (state) => state.categories.categories);


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

    const handleOnCategoryChange = (e: { target: { value: React.SetStateAction<string | null>; }; }) => {
        setEditingCategoryId(e.target.value);
    }

    const handleUpdateTask = async (id: string, updatedTask: Partial<ITask>) => {
        // @ts-ignore
        dispatch(updateTask({id, updatedTask}));
        setEditingTaskId(null);
        setEditingTitle("");
        setEditingTaskDate(dayjs());
    };

    const handleOpenDialog = () => {
        dispatch(dialogActions.open());
    };

    return (
        <Box my={1}>
            {
                tasks.length === 0 && <Alert severity="info"><Typography>No task to display</Typography></Alert>
            }
            {tasks.map((task, index) => {
                return <Card key={`${task._id}-${index}`} sx={{ my: 2, padding: 1, backgroundColor: task.category?.colour || theme.palette.background.paper}}>
                    {editingTaskId === task._id ? (
                        <TaskCardContentEdit task={task}
                                             editingTitle={editingTitle}
                                             editingTaskDate={editingTaskDate}
                                             updateTask={handleUpdateTask}
                                             setEditingTaskId={setEditingTaskId}
                                             handleTitleEditChange={handleEditTitleChange}
                                             handleTaskDateEditChange={handleTaskDateEditChange}
                                             key={`${task._id}-task-edit`}
                                             editingCategoryId={editingCategoryId}
                                             categories={categoriesSelector}
                                             handleOpenDialog={handleOpenDialog}
                                             handleOnCategoryChange={handleOnCategoryChange}


                        />

                    ) : (<TaskCardContent task={task}
                                          updateTask={handleUpdateTask}
                                          startEditing={startEditing}
                                          deleteTask={handleDeleteTask}
                                          setEditingTitle={setEditingTitle} setEditingTaskDate={setEditingTaskDate}
                                          displayDate={displayDate}
                                          key={`${task._id}-task-card-content`}
                        />
                    )}
                </Card>
            })}
        </Box>
    );
};

export default TodoListContainer;