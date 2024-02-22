// productsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    filterProductsByPrice: (state, action) => {
      const [minPrice, maxPrice] = action.payload;
      state.filteredProducts = state.products.filter(
        (product) =>
          product.price >= minPrice && product.price <= maxPrice
      );
    },
  },
});

export const { setProducts, filterProductsByPrice } = productsSlice.actions;

export default productsSlice.reducer;
