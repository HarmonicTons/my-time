import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { userReducer } from "./user/reducer";

const rootReducer = combineReducers({
  user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));
export default store;
