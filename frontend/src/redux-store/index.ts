import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks-slice.ts";
import filterReducer from "./filter-slice.ts";
import categoryReducer from "./categories-slice.ts";
import dialogReducer from "./dialog-slice.ts";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    categories: categoryReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
