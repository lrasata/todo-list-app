import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from "./tasks-slice.ts";
import filterReducer from "./filter-slice.ts";
import categoryReducer from "./categories-slice.ts";

const store = configureStore({
    reducer: { tasks: tasksReducer, filter: filterReducer, categories: categoryReducer }
});

export default store;