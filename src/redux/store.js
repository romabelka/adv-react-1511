import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
import history from "../history";

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger);

const store = createStore(reducer, composeWithDevTools(enhancer));

//dev only!
window.store = store;

export default store;
