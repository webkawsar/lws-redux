const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const counterReducer = require('../features/counter/counterSlice');
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");


// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamicCounter: dynamicCounterReducer
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(logger)
    }
})

module.exports = store;