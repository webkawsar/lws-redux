const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");
const { fetchTodos } = require("./functions");
const { delayActionMiddleware, fetchAsyncMiddleware } = require("./middlewares");

// initial state
const initialState = {
    todos: []
};

// reducer
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "todos/todoAdded":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        title: action.payload
                    }
                ]
            }

        case "todos/todoLoaded":
            return {
                ...state,
                todos: [ ...state.todos, ...action.payload ]
            }
    
        default:
            return state;
    }
}

// store
const store = createStore(todoReducer, applyMiddleware(thunk));


// subscribe to state changes
store.subscribe(() => {

    console.log(store.getState());
})


// action dispatch
// store.dispatch({
//     type: "todos/todoAdded",
//     payload: 'Learn Redux from LWS'
// })


// store.dispatch({
//     type: "todos/fetchTodos",
// })


store.dispatch(fetchTodos);


