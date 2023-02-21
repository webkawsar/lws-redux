

// middleware
const myLogger = (store) => (next) => (action) => {

    console.log(`Action: ${JSON.stringify(actions)}`)
    console.log(`Before: ${JSON.stringify(store.getState())}`)

    // pass action
    return next(action);
}

export default myLogger;
