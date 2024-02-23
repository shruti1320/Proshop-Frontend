import { createSlice } from "@reduxjs/toolkit";
import { listProducts } from "./productSlice";

const initialState = {
  minPrice: 0,
  maxPrice: Number.MAX_VALUE,
  filteredProducts: [],
  priceRange: [20, 10000],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setFilteredProducts(state, action) {
      state.maxPrice = action.payload[0];
      state.maxPrice = action.payload[1];
      // const filteredProducts = products?.data.filter(
      //   (product) =>
      //     product.price >= state.minPrice && product.price <= state.maxPrice
      // );
      // state.filteredProducts = filteredProducts;
      // state.filteredProducts = action.payload;
    },
    setPriceRange(state, action) {
      console.log("fgddg", action);
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listProducts.fulfilled, (state, action) => {
      const products = action.payload;
      console.log("products", products);
      const filteredProducts = products.data.filter(
        (product) =>
          product.price >= state.minPrice && product.price <= state.maxPrice
      );
      state.filteredProducts = filteredProducts;
    });
  },
});

export const { setMinPrice, setMaxPrice, setFilteredProducts, setPriceRange } =
  filterSlice.actions;

export default filterSlice.reducer;
