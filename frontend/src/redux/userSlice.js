import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../config/url";

// userSlice.js
export const getCurrentUser = createAsyncThunk("user/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return rejectWithValue("No token found");
            }

            const { data } = await axios.get(`${backendUrl}/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
        }
    }
);

export const register = createAsyncThunk("user/register",

    async (userData, { rejectWithValue }) => {//, { dispatch, rejectWithValue }
        try {
            const response = await axios.post(`${backendUrl}/user/register`, userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue("Register failed due to server error");
        }
    }
);

export const login = createAsyncThunk("user/login",
    async (userData, { dispatch, rejectWithValue }) => {//, { dispatch, rejectWithValue }
        try {
            const response = await axios.post(`${backendUrl}/user/login`, userData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue("Login failed due to server error");
        }
    }
);

const initialState = {
    user: null,
    isLoading: false,
    error: null,

}

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                localStorage.removeItem('token'); // Clear invalid token
            });
    }
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;