import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/url";


export const getCartData = createAsyncThunk("cart/get", 
    async( userId, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${backendUrl}/cart/get/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.log("Couldn't fetch cart data", error);
            return rejectWithValue("Couldn't fetch cart data");
        }
    }
)
export const addToCart = createAsyncThunk("cart/add",
    async ({ userId, item }, { rejectWithValue }) => {
        try {
            const payload = { userId, item };
            const res = await axios.post(`${backendUrl}/cart/add`, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.log("item not added", error);
            return rejectWithValue(error.message || "item not added");
        }
    }
);

export const removeFromCart = createAsyncThunk("cart/remove",
    async ({ userId, itemId }, { rejectWithValue }) => {
        try {
            // const payload = { userId, itemId };
            const res = await axios.delete(`${backendUrl}/cart/delete`, {
                data: { userId, itemId },
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = res.data;
            return data;
        } catch (error) {
            console.log("Failed to delete item", error);
            return rejectWithValue(error.message || "Failed to delete item");
        }
    }
)




const initialState = {
    cartData: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoading: false,
    isError: false,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addToCart: (state, action) => {
        //     const itemIndex = state.cartData.findIndex((item) => item._id === action.payload._id);
        //     if(itemIndex === -1){
        //         state.cartData.push({...action.payload, quantity: 1});
        //     }else{
        //         state.cartData[itemIndex].quantity += 1;
        //     }
        //     // state.cartData.push(action.payload);
        //     state.totalAmount = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
        //     state.totalQuantity = state.cartData.reduce((total, item) => total + item.quantity, 0);

        // },
        // removeFromCart: (state, action) => {
        //     const itemIndex = state.cartData.findIndex((item) => item._id === action.payload);
        //     if (itemIndex !== -1) {
        //         if (state.cartData[itemIndex].quantity > 1) {
        //             state.cartData[itemIndex].quantity -= 1;
        //         } else {
        //             state.cartData = state.cartData.filter((item) => item._id !== action.payload);
        //         }
        //     }
        //     state.totalAmount = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
        //     state.totalQuantity = state.cartData.reduce((total, item) => total + item.quantity, 0);
        // },
        clearCart: (state) => {
            state.cartData = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload.cartData;
                state.totalAmount = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
                state.totalQuantity = state.cartData.reduce((total, item) => total + item.quantity, 0);
            })
            .addCase(getCartData.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false;
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload.cartData;
                state.totalAmount = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
                state.totalQuantity = state.cartData.reduce((total, item) => total + item.quantity, 0);
                state.isError = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true,
                state.isError = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartData = action.payload.cartData;
                state.totalAmount = state.cartData ? state.cartData.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
                state.totalQuantity = state.cartData ?  state.cartData.reduce((total, item) => total + item.quantity, 0):0;
                state.isError = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false;
            })
    }
});

export const { clearCart } = cartSlice.actions; // addToCart, removeFromCart,

export default cartSlice.reducer;