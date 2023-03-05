const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const counterReducer = require('../features/counter/counterSlice');
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const postReducer = require("../features/posts/postsSlice");


// configure store
const store = configureStore({
    reducer: {
        counter: counterReducer,
        dynamicCounter: dynamicCounterReducer,
        posts: postReducer
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(logger)
    }
})

module.exports = store;