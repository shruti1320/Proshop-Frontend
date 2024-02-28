import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartList: { cartItems: [], loading: true, error: null },
};

export const existedCartItem = createAsyncThunk(
  "cart/existedCartItem",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products`
    );
    const data = response.data.filter((ele) => ele.addedInCart);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x.product === item.product
      );

      if (existingItemIndex !== -1) {
        // If item already exists in cart, update its quantity
        state.cartList.cartItems[existingItemIndex].qty += item.qty;
      } else {
        // If item is not in cart, add it
        state.cartList.cartItems.push(item);
      }
    },

    updateCart(state, action) {
      const item = action.payload;
      console.log(item," from slice ")
      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x._id === item.id
      );
      const existingItem = state.cartList.cartItems.find(
        (x) => x._id === item.id
      );
      if (existingItem !== -1) {
        const keys = Object.keys(existingItem);
        keys.forEach((ele) => {
          existingItem[ele] = item[ele];
        });
      } else {
        state.cartList.cartItems.push(item);
      }
      state.cartList.cartItems[existingItemIndex] = existingItem;
    },

    removeFromCart(state, action) {
      const { productId } = action.payload;
      state.cartList.cartItems = state.cartList.cartItems.filter(
        (x) => x._id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(existedCartItem.pending, (state) => {
      state.cartList.loading = true;
    });
    builder.addCase(existedCartItem.fulfilled, (state, action) => {
      state.cartList.cartItems = action.payload;
      state.cartList.loading = false; 
    });
    builder.addCase(existedCartItem.rejected, (state, action) => {
      state.cartList.loading = false;
      state.cartList.error = action.error.message;
    });
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
