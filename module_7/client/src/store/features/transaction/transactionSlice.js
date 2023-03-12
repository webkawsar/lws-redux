import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTransaction, deleteTransaction, editTransaction, getTransactions } from './transactionAPI';

// initial state
const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    transactions: [],
    error: '',
    editing: {}
}


// async thunk
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
})

export const createTransaction = createAsyncThunk('transaction/createTransaction', async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
})

export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async ({id, data}) => {
    const transaction = await editTransaction(id, data);
    return transaction;
})

export const removeTransaction = createAsyncThunk('transaction/removeTransaction', async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
})


// create slice
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state, action) => {
            state.editing = {};
        },

    },
    extraReducers: (builder) => {

        builder
        .addCase(fetchTransactions.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.transactions = [];
            state.error = '';
        })
        .addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.transactions = action.payload;
            state.error = '';
        })
        .addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.transactions = [];
            state.error = action.error?.message;
        })
        .addCase(createTransaction.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.error = '';
        })
        .addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.transactions.push(action.payload);
            state.error = '';
        })
        .addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase(updateTransaction.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.error = '';
        })
        .addCase(updateTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.error = '';

            const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
            state.transactions[indexToUpdate] = action.payload;
        })
        .addCase(updateTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.error?.message;
        })
        .addCase(removeTransaction.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.error = '';
        })
        .addCase(removeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.error = '';
            state.transactions = state.transactions.filter(t => t.id !== action.payload.id);
        })
        .addCase(removeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.error = action.error?.message;
        })
    }
})

export default transactionSlice.reducer;
export const {editActive, editInActive} = transactionSlice.actions;
