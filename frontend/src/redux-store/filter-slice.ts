import {createSlice} from '@reduxjs/toolkit';

const initialFilterState = {
    searchText: '',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState: initialFilterState,
    reducers: {
        updateSearchText(state, action) {
            state.searchText = action.payload.searchText;
        },
    }
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;