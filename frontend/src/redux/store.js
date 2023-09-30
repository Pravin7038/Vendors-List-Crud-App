import { reducer as VendorReducer } from "./reducer"
import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = legacy_createStore(VendorReducer, applyMiddleware(thunk)) //created redux store