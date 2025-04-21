import {createSlice} from '@reduxjs/toolkit';

const initialDialogState = {
    isOpen: false,
    title: '',
    category: null
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: initialDialogState,
    reducers: {
        open(state, action) {
            state.isOpen = true;
            state.title = action.payload.title;
            state.category = action.payload.category;
        },
        close(state) {
            state.isOpen = false;
            state.title = '';
            state.category = null;
        }
    }
});

export const dialogActions = dialogSlice.actions;

export default dialogSlice.reducer;