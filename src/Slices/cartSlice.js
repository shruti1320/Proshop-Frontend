import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { displayCartListHandler } from "../service/product";

const initialState = {
  cartList: { cartItems: [], loading: true, error: null },
};

var length = {
  count: 0,
};

 const token = localStorage.getItem("token");

export const cartlist = createAsyncThunk("cart/cartlist", async () => {
 
  if(token==null){
      return []
  }else{
    const response = await displayCartListHandler()
  
    length.count = response.data.length;
    
    return response.data;
  }
 
});



const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      console.log(item , ' to put condition ')
      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x.product._id === item._id
      );
    
      if (existingItemIndex !== -1) {
        state.cartList.cartItems[existingItemIndex].qauntity += item.qauntity;
      } else {
        state.cartList.cartItems.push(item);
      }
    },

    updateCart(state, action) {
      const item = action.payload;

      console.log(item , " cartitems  to see  ");
      const existingItemIndex = state.cartList.cartItems.findIndex(
        (x) => x.product?._id === item.product?._id
      );

      const existingItem = state.cartList.cartItems.find(
        (x) => x.product?._id === item.product?._id
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
    },
  },

  extraReducers: (builder) => {
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
