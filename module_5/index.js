const store = require("./rtk/app/store");
const { counterActions } = require("./rtk/features/counter/counterSlice");



// subscribe o state changes
store.subscribe(() => {
    console.log(store.getState());
})


store.dispatch(counterActions.increment());
store.dispatch(counterActions.increment());
store.dispatch(counterActions.decrement());

