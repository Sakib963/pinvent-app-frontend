import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import productReducer from "../redux/features/product/productSlice"
import customerReducer from "../redux/features/customer/customerSlice"
import filterReducer from "../redux/features/product/filterSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer, 
        product: productReducer,
        customer: customerReducer,
        filter: filterReducer,
    },
});