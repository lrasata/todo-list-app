import {Box, Checkbox, IconButton, Stack} from "@mui/material";
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
}

const TaskCardContent = ({
                             task,
                             updateTask,
                             startEditing,
                             deleteTask,
                             setEditingTitle,
                             setEditingTaskDate
                         }: TaskCardProps) => {
    const label = {inputProps: {'aria-label': task.title}};

    return (
        <>
            {task.taskDate && <DateChip dateLabel={task.taskDate.toString()}/>}
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt={1}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Checkbox {...label}
                              checked={task.completed}
                              onChange={() => updateTask(task._id, {completed: !task.completed})}
                    />
                    <Typography variant="body1" sx={{textDecoration: task.completed ? "line-through" : "none"}}>
                        {task.title}
                    </Typography>
                </Box>
            </Box>
            <Stack direction="row" spacing={0} justifyContent="flex-end">
                <IconButton
                    onClick={() => {
                        startEditing(task._id);
                        setEditingTitle(task.title);
                        setEditingTaskDate(dayjs(task.taskDate));
                    }}
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