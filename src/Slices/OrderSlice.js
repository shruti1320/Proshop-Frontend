import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: { orders: {}, loading: false, error: null },
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      addOrder(state, action) {
        const order = action.payload;
        state.orderDetails.orders = order;
    },}

  });

export default orderSlice.reducer;
export const { addOrder } = orderSlice.actions;