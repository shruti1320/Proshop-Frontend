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
    console.log(response.data[0].product," from the slice 33333333333")
    return response.data ;
  }
)

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {

    
      
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
  
  export const {  } = favouriteSlice.actions;
  export default favouriteSlice.reducer;