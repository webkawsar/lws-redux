const { default: fetch } = require("node-fetch");


const fetchTodos = async (store) => {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const todos = await response.json();

    store.dispatch({
        type: "todos/todoLoaded",
        payload: todos
    })

    console.log(`Number of updated todos: ${store.getState().todos.length}`);
}

module.exports = {
    fetchTodos
}