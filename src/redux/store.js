import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import dataReducer from "./dataReducer";

let reducers = combineReducers({
  data: dataReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;