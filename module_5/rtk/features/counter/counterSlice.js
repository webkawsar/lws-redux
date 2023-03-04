const { createSlice } = require("@reduxjs/toolkit")
const { dynamicCounterActions } = require("../dynamicCounter/dynamicCounterSlice")


// initial state
const initialState = {
    count: 0
}


const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state, action) {
            state.count++
        },
        decrement(state, action) {
            state.count--
        },
    },
    // extraReducers: {
    //     ['dynamicCounter/increment']: (state, action) => {
    //         state.count += action.payload;
    //     }
    // }
    extraReducers: (builder) => {
        builder
        .addCase(dynamicCounterActions.increment, (state, action) => {
            state.count += action.payload;
        })
    }
    
})


module.exports = counterSlice.reducer;
module.exports.counterActions = counterSlice.actions;
