import {Box, Checkbox, Chip, IconButton, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import dayjs, {Dayjs} from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DateChip from "./DateChip.tsx";
import {ITask} from "../types/types.ts";

interface TaskCardProps {
    task: ITask;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    startEditing: (id: string) => void;
    deleteTask: (id: string) => void;
    setEditingTitle: (title: string) => void;
    setEditingTaskDate: (date: Dayjs) => void;
    setEditingCategoryId: (id: string) => void;
    displayDate: boolean;
}

const TaskCardContent = ({
                             task,
                             updateTask,
                             startEditing,
                             deleteTask,
                             setEditingTitle,
                             setEditingTaskDate,
                             setEditingCategoryId,
                             displayDate,
                         }: TaskCardProps) => {
    const label = {inputProps: {'aria-label': task.title}};

    const handleOnEdit = () => {
        startEditing(task._id);
        setEditingTitle(task.title);
        setEditingTaskDate(dayjs(task.taskDate));
        if (task.category) {
            setEditingCategoryId(task.category.categoryId);
        }
    }

    const handleOnTaskTicked = () => {
        // have to specify the category as missing category for the API means, No category should be linked to the task
        updateTask(task._id, {completed: !task.completed, category: { categoryId: task.category?.categoryId|| ''}})
    }

    return (
        <>
            <Stack direction="row" spacing={1}>
                {task.taskDate && displayDate && <DateChip dateLabel={task.taskDate.toString()} />}
                {task.category && task.category.name && <Chip label={task.category.name} variant="outlined"/>}
            </Stack>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt={1}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Checkbox {...label}
                              checked={task.completed}
                              onChange={handleOnTaskTicked}
                    />
                    <Typography variant="body1" sx={{textDecoration: task.completed ? "line-through" : "none"}}>
                        {task.title}
                    </Typography>
                </Box>
            </Box>
            <Stack direction="row" spacing={0} justifyContent="flex-end">
                <IconButton
                    onClick={handleOnEdit}
                    color="primary"
                    aria-label="Edit"
                >
                    <EditIcon/>
                </IconButton>
                <IconButton
                    onClick={() => deleteTask(task._id)}
                    color="error"
                    aria-label="Delete"
                >
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </>
    );
}

export default TaskCardContent;