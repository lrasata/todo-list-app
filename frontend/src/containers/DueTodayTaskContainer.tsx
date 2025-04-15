import {useEffect, useState} from 'react';
import TodoListContainer from '../containers/TodoListContainer.tsx';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Stack,
    TextField,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {ICategory, ITask} from "../types/types.ts";
import Brand from "../components/Brand.tsx";
import BasicDatePicker from "../components/BasicDatePicker.tsx";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from "dayjs";
import AlertOverdueTasksContainer from "./AlertOverdueTasksContainer.tsx";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../components/Spinner.tsx";
import {createTask} from "../redux-store/tasks-slice.ts";
import SelectOrCreateCategory from "../components/SelectOrCreateCategory.tsx";
import Dialog from "../components/Dialog.tsx";
import CreateCategoryContainer from "./CreateCategoryContainer.tsx";
import {fetchCategories} from "../redux-store/categories-slice.ts";


const DueTodayTaskContainer = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const dueTodayTasksSelector = useSelector(state => state.tasks.dueTodayTasks);
    // @ts-ignore
    const isLoading = useSelector((state) => state.tasks.isLoading);

    // @ts-ignore
    const categoriesSelector = useSelector( (state) => state.categories.categories);
    const [categories, setCategories] = useState<ICategory[]>(categoriesSelector || []);

    const initialValue = {title: "", completed: false, taskDate: null, categoryId: undefined}
    const [currentTask, setCurrentTask] = useState<Pick<ITask, "title" | "completed" | "taskDate" | "categoryId">>(initialValue);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDialog, setOpenDialog] = useState(false);

    const handleAddTask = async () => {
        if (!currentTask) return;

        // @ts-ignore
        dispatch(createTask({ task: currentTask}));
        setCurrentTask(initialValue);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    useEffect(() => {
        setCategories(categoriesSelector)
    }, [categoriesSelector]);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCategories());
    }, []);

    return (
        <>
            <Brand height={200}/>
            <AlertOverdueTasksContainer />
            {
                dueTodayTasksSelector.length > 0 && <Typography variant="h5" component="h2" gutterBottom my={2}>Your planned tasks for today</Typography>
            }
            {
                dueTodayTasksSelector.length === 0 && <Typography variant="h5" component="h2" gutterBottom my={2}>You don't have any scheduled tasks for today</Typography>
            }
            {
                isLoading ? <Spinner/> : <TodoListContainer tasks={dueTodayTasksSelector} displayDate={false} />
            }
            <Accordion sx={{my: 3}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="create-task"
                    id="panel1-create-task"
                >
                    <Typography variant="h6" component="span" color="primary">Create new task</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4}>
                        <TextField
                            value={currentTask.title}
                            onChange={(e) => setCurrentTask(
                                (prevState) => ({...prevState, title: e.target.value})
                            )}
                            sx={{backgroundColor: 'white'}}
                            label="Enter task description"
                            size="medium"
                            fullWidth
                        />
                        <BasicDatePicker value={dayjs(currentTask.taskDate) ?? ""} onChange={(date) => setCurrentTask(
                            (prevState) => ({...prevState, taskDate: dayjs(date)})
                        )}/>
                        <SelectOrCreateCategory value={currentTask.categoryId || ""}
                                                categories={categories}
                                                onCreateNewTask={handleOpenDialog}
                                                onChange={(e) => setCurrentTask(
                                                    (prevState) => ({...prevState, categoryId: e.target.value})
                                                )}
                        />
                        <Button variant="contained" onClick={handleAddTask} aria-label="Add task"
                                sx={{width: isMobile ? "inherit" : "max-content"}}>Add</Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                title={"Create a new category"}
                content={<CreateCategoryContainer closeDialog={handleCloseDialog}/>}
            />
        </>
    );

}

export default DueTodayTaskContainer;