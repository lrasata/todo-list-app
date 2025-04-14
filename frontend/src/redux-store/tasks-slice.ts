import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_TASKS_DUE_TODAY, API_TASKS_ENDPOINT, API_TASKS_OVERDUE} from "../constants/constants.ts";
import axios from "axios";
import {ITask} from "../types/types.ts";
import {dateIsInThePast, dateIsToday, findAndUpdateTask, removeIfExistTask} from "../util/util.ts";
import dayjs from "dayjs";
import qs from 'qs';

const initialAllTasksState = {
    filteredTasks: [],
    dueTodayTasks: [],
    overdueTasks: [],
    isLoading: false,
    error: null,
};

export const fetchFilteredTasks = createAsyncThunk(
    'tasks/fetchFilteredTasks',
    async (arg: { search?: string, date?: string }, { rejectWithValue }) => {
        let url = API_TASKS_ENDPOINT;
        if (arg) {
            const queryString = qs.stringify(arg);
            url = `${url}?${queryString}`;
        }
        try {
            const response = await axios.get<ITask[]>(url, {withCredentials: true});
            return {
                tasks: response.data
            }
        } catch (error) {
            console.error("Error fetching filtered tasks:", error);
            return rejectWithValue('Oops unable to fetch filtered tasks from API');
        }
    }
);

export const fetchDueTodayTasks = createAsyncThunk(
    'tasks/fetchDueTodayTasks',
    async ( _, { rejectWithValue }) => {

        try {
            const response = await axios.get<ITask[]>(API_TASKS_DUE_TODAY, {withCredentials: true});
            return {
                tasks: response.data
            }
        } catch (error) {
            console.error("Error fetching tasks due today task:", error);
            return rejectWithValue('Oops unable to fetch tasks due today from API');
        }
    }
);


export const fetchOverdueTasks = createAsyncThunk(
    'tasks/fetchOverdueTasks',
    async ( _, { rejectWithValue }) => {

        try {
            const response = await axios.get<ITask[]>(API_TASKS_OVERDUE, {withCredentials: true});
            return {
                tasks: response.data
            }
        } catch (error) {
            console.error("Error fetching overdue task:", error);
            return rejectWithValue('Oops unable to fetch overdue tasks from API');
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async ( arg: { id: string}, { rejectWithValue }) => {

        try {
            await axios.delete(`${API_TASKS_ENDPOINT}/${arg.id}`, {withCredentials: true});
            return {
                _id: arg.id
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            return rejectWithValue('Oops unable to delete task from API');
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async ( arg: { task: Partial<ITask>}, { rejectWithValue }) => {
        try {
            const response = await axios.post<ITask>(
                API_TASKS_ENDPOINT,
                arg.task,
                {headers: {"Content-Type": "application/json"}, withCredentials: true}
            );
            return {
                task: response.data
            }
        } catch (error) {
            console.error("Error adding task:", error);
            return rejectWithValue('Oops unable to create task from API');
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ( arg: { id: string, updatedTask: Partial<ITask>}, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_TASKS_ENDPOINT}/${arg.id}`,
                arg.updatedTask,
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            return {
                task: response.data
            }
        } catch (error) {
            console.error("Error updating task:", error);
            return rejectWithValue('Oops unable to update task from API');
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialAllTasksState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFilteredTasks.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchFilteredTasks.fulfilled, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.filteredTasks = action.payload.tasks;
        })
        builder.addCase(fetchFilteredTasks.rejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.error.message
        })
        builder.addCase(fetchDueTodayTasks.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchDueTodayTasks.fulfilled, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.dueTodayTasks = action.payload.tasks;
        })
        builder.addCase(fetchDueTodayTasks.rejected, (state, action) => {
            state.isLoading = false
            // @ts-ignore
            state.error = action.error.message
        })
        builder.addCase(fetchOverdueTasks.fulfilled, (state, action) => {
            // @ts-ignore
            state.overdueTasks = action.payload.tasks;
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            // @ts-ignore
            state.dueTodayTasks = dateIsToday(dayjs(action.payload.task.taskDate)) ? [action.payload.task, ...state.dueTodayTasks] : [...state.dueTodayTasks];
            // @ts-ignore
            state.filteredTasks = [action.payload.task, ...state.filteredTasks];
            // @ts-ignore
            state.overdueTasks = dateIsInThePast(dayjs(action.payload.task.taskDate)) ? [action.payload.task, ...state.overdueTasks] : [...state.overdueTasks];
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const updatedTask = action.payload.task;
            // @ts-ignore
            state.filteredTasks = findAndUpdateTask(updatedTask, [...state.filteredTasks]);

            if (dateIsToday(dayjs(updatedTask.taskDate))) {
                // when date has changed to be today
                // @ts-ignore
                state.overdueTasks = removeIfExistTask(updatedTask, state.overdueTasks);

                const index = state.dueTodayTasks.findIndex( (element: ITask) => element._id === updatedTask._id)
                if (index >= 0) {
                    // @ts-ignore
                    state.dueTodayTasks[index] = {...updatedTask}
                } else {
                    // @ts-ignore
                    state.dueTodayTasks = [updatedTask, ...state.dueTodayTasks]
                }
            }

            if (dateIsInThePast(dayjs(action.payload.task.taskDate))) {
                // when date has changed to be in the past
                // @ts-ignore
                state.dueTodayTasks = removeIfExistTask(updatedTask, state.dueTodayTasks);

                const index = state.overdueTasks.findIndex( (element: ITask) => element._id === updatedTask._id)
                if (index >= 0) {
                    if (updatedTask.completed) {
                        state.overdueTasks.splice(index, 1); // overdueTasks only saves the uncompleted tasks
                    } else {
                        // @ts-ignore
                        state.overdueTasks[index] = updatedTask;
                    }
                } else {
                    if (!updatedTask.completed) {
                        // @ts-ignore
                        state.overdueTasks = [updatedTask, ...state.overdueTasks]
                    }
                }
            }

        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.dueTodayTasks = state.dueTodayTasks.filter((t: ITask) => t._id !== action.payload._id);
            state.filteredTasks = state.filteredTasks.filter((t: ITask) => t._id !== action.payload._id);
            state.overdueTasks = state.overdueTasks.filter((t: ITask) => t._id !== action.payload._id);
        })

    },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;