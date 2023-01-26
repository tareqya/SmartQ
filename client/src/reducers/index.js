import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import HomeReducer from "./HomeReducer";
import CommonReducer from "./CommonReducer";

export default combineReducers({
  AuthReducer,
  HomeReducer,
  CommonReducer,
});
