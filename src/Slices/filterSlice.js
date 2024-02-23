// // productsSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   filteredProducts: [],
// };

// export const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     filterProductsByPrice: (state, action) => {
//       const [minPrice, maxPrice] = action.payload;
//       state.filteredProducts = state.products.filter(
//         (product) =>
//           product.price >= minPrice && product.price <= maxPrice
//       );
//     },
//   },
// });



// export const { setProducts, filterProductsByPrice } = productsSlice.actions;

// export default productsSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priceRange: [20, 10000],
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        return product.price >= state.priceRange[0] && product.price <= state.priceRange[1];
      });
    },
  },
});

export const { setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;