import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
    cartIsVisible: false,
    notification: null,
};

const uiSlice = createSlice({
    name: 'UISlice',
    initialState: uiInitialState,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            };
        },

        hideNotification(state) {
            state.notification = null;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
