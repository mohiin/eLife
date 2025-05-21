import { configureStore } from "@reduxjs/toolkit";
import openReducer from "./productModalSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";


const store = configureStore({
    reducer:{
        productDetailsModal: openReducer,
        cart: cartReducer,
        user: userReducer, 
        product: productReducer,
    }
});

export default store;
