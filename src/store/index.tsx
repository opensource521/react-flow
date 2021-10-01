import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as modulesReducer } from "./reducers";
import { ModuleState } from "../types";

export interface RootState {
  modules: ModuleState;
}

const composeEnhancers = composeWithDevTools({});
const store = createStore<RootState, any, any, any>(
  combineReducers({
    modules: modulesReducer,
  }),
  composeEnhancers(applyMiddleware())
);

export default store;
