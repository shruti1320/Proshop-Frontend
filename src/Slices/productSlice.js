import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  minPrice: 0,
  maxPrice: 10000,
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
  reducers: {
    setFilteredProducts(state, action) {
      state.maxPrice = action.payload[0];
      state.maxPrice = action.payload[1];
      const filteredProducts = state.productList.products.filter(
        (product) =>
          product.price >= state.minPrice && product.price <= state.maxPrice
      );
      console.log("filteredProducts", filteredProducts);
      state.productList.products = filteredProducts;
    },
  //   updateUser:(state,action)=>{
  //     const{productName,productPrice,productCategory,productdescription,userId,productBrandName,productCountInStock}=action.payload;
  //     const Index = state.productList.products.findIndex(
  //       (product) => product._id === userId
  //     );
  //   if(Index){
  //     Index.productName=productName;
  //     Index.productPrice=productPrice;
  //     Index.productName=productName;
  //     Index.productCategory=productCategory;
  //     Index.productdescription=productdescription;
  //     Index.productId=userId;
  //     Index.productBrandName=productBrandName;
  //     Index.productCountInStock=productCountInStock;
  //   };
  // }



},

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

export const { setFilteredProducts,updateProduct } = productSlice.actions;

export default productSlice.reducer;
