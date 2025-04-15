import {createSlice} from '@reduxjs/toolkit';

const initialDialogState = {
    isOpen: false
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: initialDialogState,
    reducers: {
        open(state) {
            state.isOpen = true;
        },
        close(state) {
            state.isOpen = false;
        }
    }
});

export const dialogActions = dialogSlice.actions;

export default dialogSlice.reducer;