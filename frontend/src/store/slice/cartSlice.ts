

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}


const initialState: CounterState = {
    value: 0,
};



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCartAmmount: (state, action: PayloadAction<number>) => {


            state.value = action.payload

        },

        incrementByAmount: (state, action: PayloadAction<number>) => {

            state.value += action.payload;
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {

            state.value += action.payload;
        },

    },
});

export const { incrementByAmount, decrementByAmount, setCartAmmount } = cartSlice.actions;
export default cartSlice.reducer;