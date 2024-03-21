import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  minPrice: 0,
  maxPrice: 10000,
  productList: { products: [], loading: true, error: null },
  productDetail: { product: { review: [] }, loading: true, error: null },
  selectedBrand:null
};

export const listProducts = createAsyncThunk(
  "products/listProducts",
  async (_, { getState, dispatch }) => {
    const { productList } = getState().product;
    const token = localStorage.getItem("token");
    let products = [];
    try {
      if (productList.products.length === 0) {
        const { data } = token
          ? await axios.get(
              `${process.env.REACT_APP_API_BASE_PATH}/api/products`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.get(
              `${process.env.REACT_APP_API_BASE_PATH}/api/products`
            );
        products = data;
      } else {
        products = productList.products;
      }
      return products;
    } catch (error) {
      throw error;
    }
  }
);

export const listProductDetail = createAsyncThunk(
  "product/listProductDetail",
  async (id, { getState }) => {
    const products = await axios.get(
      `${process.env.REACT_APP_API_BASE_PATH}/api/products`
    );

    const product = products.data.find((product) => product._id === id);

    

    const productDetail = localStorage.setItem(
      "product",
      JSON.stringify(product)
    );

   

    if (product) {
      const product = JSON.parse(localStorage.getItem("product")) || [];
      return product;
    } else {
      throw new Error("Product not found");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    removeProductFromList(state, action) {
      const productId = action.payload;
      state.productList.products = state.productList.products.filter(
        (x) => x._id !== productId
      );
    },

    addProductFromList(state, action) {
      state.productList.products.push(action.payload);
    },

    setFilteredProducts(state, action) {
      state.minPrice = action.payload[0];
      state.maxPrice = action.payload[1];
      console.log("min range",state.minPrice)
      console.log("productsss",state.productList.products)
      const filteredProducts = state.productList.products.filter(
        (product) =>
          product.price >= state.minPrice && product.price <= state.maxPrice
      );
      console.log("filterd product",filteredProducts)
      state.productList.products = filteredProducts;
    },

    setBrandFilter:(state,action)=>{
      state.selectedBrand=action.payload
      console.log("products",state.selectedBrand)
      const filteredProducts = state.productList.products.filter(
        (product) =>
          product.brand = state.selectedBrand
      );
      console.log("branded prodcurs",filteredProducts)
      state.productList.products = filteredProducts;
    },

    updateProduct(state, action) {
      const updatedProduct = action.payload;
      state.productList.products = state.productList.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        state.productList.loading = true;
      })
      .addCase(listProducts.fulfilled, (state, action) => {
        state.productList.loading = false;
        state.productList.products = action.payload;
      })
      .addCase(listProducts.rejected, (state, action) => {
        state.productList.loading = false;
        state.productList.error = action.error.message;
      })
      .addCase(listProductDetail.pending, (state) => {
        state.productDetail.loading = true;
      })
      .addCase(listProductDetail.fulfilled, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.product = action.payload;
      })
      .addCase(listProductDetail.rejected, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.error = action.error.message;
      });
  },
});

export const {
  removeProductFromList,
  addProductFromList,
  setFilteredProducts,
  updateProduct,
  setBrandFilter
} = productSlice.actions;

export default productSlice.reducer;

