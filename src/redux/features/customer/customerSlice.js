import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customerService from "./customerService";


const initialState ={
    customer : null,
    customers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    messege: "",
}

//Create New Customer
export const createCustomer = createAsyncThunk(
    "customers/create",
    async(formData, thunkAPI) => {
        try {
            return await customerService.createCustomer(formData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Get All Customer
export const getCustomers = createAsyncThunk(
    "customers/getAll",
    async(_, thunkAPI) => {
        try {
            return await customerService.getCustomers();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Delete A customer
export const deleteCustomer = createAsyncThunk(
    "customers/delete",
    async(id, thunkAPI) => {
        try {
            return await customerService.deleteCustomer(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Get A customer
export const getCustomer = createAsyncThunk(
    "customers/getCustomer",
    async(id, thunkAPI) => {
        try {
            return await customerService.getCustomer(id);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

//Update Customer
export const updateCustomer = createAsyncThunk(
    "customers/updateCustomer",
    async ({ id, formData }, thunkAPI) => {
      try {
        return await customerService.updateCustomer(id, formData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
          CALC_CATEGORY(state, action) {
            const customers = action.payload;
            const array = [];
            customers.map((item) => {
              const { category } = item;
      
              return array.push(category);
            });
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCustomer.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                console.log(action.payload)
                state.customers.push(action.payload)
                toast.success("Customer Added Successfully")
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messege = action.payload
                toast.error(action.payload)
            })
            .addCase(getCustomers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                console.log(action.payload)
                state.customers = (action.payload)
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.messege = action.payload
                toast.error(action.payload)
            })
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Customer deleted successfully");
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getCustomer.pending, (state) => {
                state.isLoading = true;
              })
            .addCase(getCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.customer = action.payload;
            })
            .addCase(getCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = true;
              })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Customer updated successfully");
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
})


export const { CALC_CATEGORY} = customerSlice.actions;

export const selectIsLoading = (state) => state.customer.isLoading;
export const selectCustomer = (state) => state.customer.customer;


export default customerSlice.reducer;