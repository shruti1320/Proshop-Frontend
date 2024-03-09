import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favouriteProductList: { favouriteProduct: [], loading: true, error: null },
};

const token = localStorage.getItem("token");

export const favouritelist =  createAsyncThunk (
  "favourite/favouritelist",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/users/favouritelist`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response?.data," from the slice 33333333333")
    return response.data ;
  }
)

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {

      addToFavourite(state, action) {
        const item = action.payload;
        const existingItemIndex = state.favouriteProductList.favouriteProduct.findIndex(
          (x) => x._id === item._id
        );
  
        if (existingItemIndex !== -1) {
          state.favouriteProductList.favouriteProduct[existingItemIndex].qty += item.qty;
        } else {
          state.favouriteProductList.favouriteProduct.push(item);
        }
      },
      removeFromFavourite(state, action) {
        const { productId } = action.payload;
        state.favouriteProductList.favouriteProduct = state.favouriteProductList.favouriteProduct.filter(
          (x) => x.product._id !== productId
        );
        // console.log(state.cartList.cartItems, " cart items for ");
      },
    },
    
    extraReducers: (builder) => {
      builder
      .addCase(favouritelist.pending, (state) => {
        state.favouriteProductList.loading = true;
        state.favouriteProductList.error = null;
      })
      .addCase(favouritelist.fulfilled, (state, action) => {
        state.favouriteProductList.loading = false;
        state.favouriteProductList.favouriteProduct = action.payload;
      })
      .addCase(favouritelist.rejected, (state, action) => {
        state.favouriteProductList.loading = false;
        state.favouriteProductList.error = action.error.message;
      });
    },
  });
  
  export const { addToFavourite, removeFromFavourite } = favouriteSlice.actions;
  export default favouriteSlice.reducer;