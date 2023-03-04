
const { createSlice } = require("@reduxjs/toolkit")


// initial state
const initialState = {
    dynamicCount: 0
}


const dynamicCounterSlice = createSlice({
    name: 'dynamicCounter',
    initialState,
    reducers: {
        increment(state, action) {
            state.dynamicCount += action.payload;
        },
        decrement(state, action) {
            state.dynamicCount--;
        },
    }
})


module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterActions = dynamicCounterSlice.actions;
