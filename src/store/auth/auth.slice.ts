import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../store';
import {jwtDecode} from 'jwt-decode';
import {initialState} from "./auth.interface.ts";
import api from "../../lib/http.client.ts";

export const login = createAsyncThunk<{ token: string }, { username: string; password: string }, {
    rejectValue: string
}>('auth/login', async (credentials, thunkAPI) => {
    try {
        const res = await api.post<{ access_token: string }>('/auth/login', credentials);
        return {token: res.data.access_token};
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue('Erro no login');
    }
});

const authSlice = createSlice({
    name: 'auth', initialState, reducers: {
        logout(state) {
            state.token = null;
            state.username = null;
        }, clearError(state) {
            state.error = null;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
                state.loading = false;
                state.token = action.payload.token;
                const decoded: { username: string } = jwtDecode(action.payload.token);
                state.username = decoded.username;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {logout, clearError} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
