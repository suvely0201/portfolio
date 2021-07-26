import { createAction, handleActions } from "redux-actions";

const initAcc = {
	loading: false,
	data: null,
	error: null,
};

/* 액션타입 정의 */
// 모든 계정
export const getAccount = createAction("GET_ACCOUNT");
export const getAccountSuccess = createAction("GET_ACCOUNT_SUCCESS");
export const getAccountError = createAction("GET_ACCOUNT_ERROR");

const accountReducer = handleActions({
	[getAccount]: (state, action) => {
		return {
			...state
		};
	}

}, initAcc);

export default accountReducer;