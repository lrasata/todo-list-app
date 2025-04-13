import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./tasks-slice.ts";
import filterReducer from "./filter-slice.ts";

const store = configureStore({
    reducer: { tasks: tasksReducer, filter: filterReducer }
});

export default store;