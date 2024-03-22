import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderByUserId } from "../service/order";

const initialState = {
  orderDetails: { orders: [], loading: false, error: null },
};

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getOrderByUserId(id)
      return response.data;
    } catch (error) {
      return rejectWithValue("Error in showing orders");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      const order = action.payload;
      state.orderDetails.orders.push(order);
    },
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.orderDetails.loading = true;
        state.orderDetails.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.orders = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.orderDetails.loading = false;
        state.orderDetails.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { addOrder } = orderSlice.actions;
