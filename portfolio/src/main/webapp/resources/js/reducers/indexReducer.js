import { combineReducers } from "redux";
import displayReducer from "./displayReducer";
import accountReducer from "./accountReducer";

const indexReducer = combineReducers({
	displayReducer,
	accountReducer,
});

export default indexReducer;