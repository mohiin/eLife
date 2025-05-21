import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backendUrl } from "../config/url";
import axios from "axios";

export const fetchProducts = createAsyncThunk("product/fetchAll",
    async (_, {rejectWithValue }) => {
        try {
            const res = await axios.get(`${backendUrl}/products`);
            return res.data.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

export const findProducts = createAsyncThunk("product/find",
    async(q, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${backendUrl}/products/search/${q}`);
            return res.data.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

const initialState = {
    productList: [],
    isLoading: false,
    isError: null,
}
const productSlice = createSlice({
    name: "product",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false;
            })
            .addCase(findProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(findProducts.rejected, (state, action) => {
                state.isError = action.payload;
                state.isLoading = false;
            })
    }

});

export default productSlice.reducer;