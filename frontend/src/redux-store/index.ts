import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./tasks-slice.ts";

const store = configureStore({
    reducer: { tasks: tasksReducer }
});

export default store;