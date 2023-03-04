const store = require("./rtk/app/store");
const { counterActions } = require("./rtk/features/counter/counterSlice");
const { dynamicCounterActions } = require("./rtk/features/dynamicCounter/dynamicCounterSlice");



// subscribe o state changes
store.subscribe(() => {
    // console.log(store.getState());
})


// counter features
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());



// dynamic counter features
store.dispatch(dynamicCounterActions.increment(3));
store.dispatch(dynamicCounterActions.increment(4));
store.dispatch(dynamicCounterActions.decrement());

