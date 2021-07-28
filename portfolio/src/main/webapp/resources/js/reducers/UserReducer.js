import { createAction, handleActions } from "redux-actions";

const initState = {
	loading: false,
};

export const loginProc = createAction("LOGIN_PROCESSING", (obj) => (obj));
export const loginProcdfdf = createAction("LOGIN_PROCESSINGdfdf", (obj) => (obj));

export const UserReducer = handleActions({
	
	[loginProc]: (state) => {
		return {
			...state,
		}
	},
	[loginProcdfdf]: (state) => {
		return {
			...state,
		}
	},

}, initState);

export default UserReducer;