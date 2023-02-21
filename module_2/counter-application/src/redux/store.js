import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import counterReducer from "./counter/counterReducer";
import myLogger from './middlewares/myLogger';

const store = createStore(counterReducer, applyMiddleware(logger, myLogger));


export default store;
