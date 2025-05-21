import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedProductId: null,
}

const productModalSlice = createSlice({
    name: "productDetailsModal",
    initialState,
    reducers: {
        openProductDetails: (state, action) => {
            state.selectedProductId = action.payload;  // Set the ID of the card to be open
        },
        closeProductDetails: (state) => {
            state.selectedProductId = null;  // Reset the ID when the card is closed
        },
    }
});

export const { openProductDetails, closeProductDetails } = productModalSlice.actions;

export default productModalSlice.reducer;