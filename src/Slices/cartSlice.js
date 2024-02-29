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

const token = localStorage.getItem("token");

export const cartlist = createAsyncThunk("cart/cartlist", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/cartlist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data, " from the slice 33333333333");
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x._id === item._id
      );

      if (existingItemIndex !== -1) {
        state.cartList.cartItems[existingItemIndex].qty += item.qty;
      } else {
        state.cartList.cartItems.push(item);
      }
    },

    updateCart(state, action) {
      const item = action.payload;

      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x._id === item._id
      );
      const existingItem = state.cartList.cartItems.find(
        (x) => x._id === item._id
      );
      if (existingItemIndex !== -1) {
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
        (x) => x.product._id !== productId
      );
      console.log(state.cartList.cartItems, " cart items for ");
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
    builder.addCase(cartlist.pending, (state) => {
      state.cartList.loading = true;
      state.cartList.error = null;
    });
    builder.addCase(cartlist.fulfilled, (state, action) => {
      state.loading = false;
      state.cartList.cartItems = action.payload;
    });
    builder.addCase(cartlist.rejected, (state, action) => {
      state.cartList.loading = false;
      state.cartList.error = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  updateCartItem,
  updateCartItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
