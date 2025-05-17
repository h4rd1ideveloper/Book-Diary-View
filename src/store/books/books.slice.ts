import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import {type Book, initialState} from "./book.interface.ts";
import type {RootState} from "../index.ts";
import api from "../../lib/http.client.ts";

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, thunkAPI) => {
    try {
        const res = await api.get<Book[]>('/api/books');
        return res.data;
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue('Erro ao carregar livros');
    }
});

export const addBook = createAsyncThunk('books/addBook', async (book: Omit<Book, 'id'>, thunkAPI) => {
    try {
        const res = await api.post<Book>('/api/books', book);
        return res.data;
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue('Erro ao adicionar livro');
    }
});

export const updateBook = createAsyncThunk('books/updateBook', async (book: Book, thunkAPI) => {
    try {
        const {id, ...payload} = book;
        const res = await api.put<Book>(`/api/books/${id}`, payload);
        return res.data;
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue('Erro ao atualizar livro');
    }
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id: string, thunkAPI) => {
    try {
        await api.delete(`/api/books/${id}`);
        return id;
    } catch (err) {
        console.log(err)
        return thunkAPI.rejectWithValue('Erro ao excluir livro');
    }
});

const booksSlice = createSlice({
    name: 'books', initialState, reducers: {
        clearError(state) {
            state.error = null;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.items.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.items.findIndex((b) => b.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter((b) => b.id !== action.payload);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {clearError} = booksSlice.actions;
export const selectBooks = (state: RootState) => state.books;
export default booksSlice.reducer;
