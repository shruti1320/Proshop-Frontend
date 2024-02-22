import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productList: { products: [], loading: true, error: null },
  productDetail: { product: { review: [] }, loading: true, error: null },
};

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products`
    );
    return data;
  }
);

export const listProductDetail = createAsyncThunk(
  "product/listProductDetail",
  async (id) => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
    );
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(listProducts.pending, (state) => {
      state.productList.loading = true;
    });
    builder.addCase(listProducts.fulfilled, (state, action) => {
      state.productList.loading = false;
      state.productList.products = action.payload.data;
    });
    builder.addCase(listProducts.rejected, (state, action) => {
      state.productList.loading = false;
      state.productList.error = action.error.message;
    });
    builder.addCase(listProductDetail.pending, (state) => {
      state.productDetail.loading = true;
    });
    builder.addCase(listProductDetail.fulfilled, (state, action) => {
      state.productDetail.loading = false;
      state.productDetail.product = action.payload.data;
    });
    builder.addCase(listProductDetail.rejected, (state, action) => {
      state.productDetail.loading = false;
      state.productDetail.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
