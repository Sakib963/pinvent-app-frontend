import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredCustomers: [],
};
 
const customerFilterSlice = createSlice({
  name: "customerFilter",
  initialState,
  reducers: {
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

export const { FILTER_CUSTOMERS } = customerFilterSlice.actions;

export const selectFilteredCustomers = (state) => state.filter.filteredCustomers;

export default customerFilterSlice.reducer;