import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredProducts = tempProducts;
    },
    FILTER_CUSTOMERS(state, action) {
      const { customers, search } = action.payload;
      const tempCustomers = customers.filter(
        (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredCustomers = tempCustomers;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredPoducts = (state) => state.filter.filteredProducts;

export const { FILTER_CUSTOMERS } = filterSlice.actions;

export const selectFilteredCustomers = (state) => state.filter.filteredCustomers;

export default filterSlice.reducer;