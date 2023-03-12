import { configureStore } from "@reduxjs/toolkit";
import transactionSliceReducer from "../features/transaction/transactionSlice";



const store = configureStore({
    reducer: {
        transaction: transactionSliceReducer
    }
})

export default store;