import { combineReducers } from "redux";
// import displayReducer from "./displayReducer";
// import accountReducer from "./accountReducer";
import UserReducer from "./UserReducer";

const indexReducer = combineReducers({
	UserReducer,
});

export default indexReducer;