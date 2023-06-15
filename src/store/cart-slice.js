import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
    items: [],
    totalQuantity: 0,
    changed: true,
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: cartInitialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );
            state.changed = true;
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
                existingItem.quantity--;
            }
            state.changed = true;
            state.totalQuantity--;
        },
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.changed = false;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
