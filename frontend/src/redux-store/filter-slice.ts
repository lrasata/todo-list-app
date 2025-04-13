import {createSlice} from '@reduxjs/toolkit';

const initialFilterState = {
    searchText: '',
    date: null
}

const filterSlice = createSlice({
    name: 'filters',
    initialState: initialFilterState,
    reducers: {
        updateSearchText(state, action) {
            state.searchText = action.payload.searchText;
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