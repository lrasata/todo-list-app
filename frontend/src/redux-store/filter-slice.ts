import {createSlice} from '@reduxjs/toolkit';

const initialFilterState = {
    search: '',
    date: null
}

const filterSlice = createSlice({
    name: 'filters',
    initialState: initialFilterState,
    reducers: {
        updateSearchText(state, action) {
            state.search = action.payload.search;
        },
        updateDate(state, action) {
            state.date = action.payload.date;
        },
        removeDate(state) {
            state.date = null;
        },
    }
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;