import { createAction, handleActions } from "redux-actions";

const initDisp = {
	loading: false,
	data: null,
	error: null,
};

/* 액션타입 정의 */
// 모든 디스플레이
export const getDisplay = createAction("disp/GET_DISPLAY");
export const getDisplaySuccess = createAction("disp/GET_DISPLAY_SUCCESS");
export const getDisplayError = createAction("disp/GET_DISPLAY_ERROR");

// 권한으로 디스플레이
export const getIdDisplay = createAction("disp/GET_ID_DISPLAY");
export const getIdDisplaySuccess = createAction("disp/GET_ID_DISPLAY_SUCCESS");
export const getIdDisplayError = createAction("disp/GET_ID_DISPLAY_ERROR");

const displayReducer = handleActions({

	// 여기서 사용하는 state는 여기있는 initDisp의 상태
	[getDisplay]: (state, action) => {
		return {
			...state,
			
		};
	}
	// [GET_DISPLAY_SUCCESS]:
	// [GET_DISPLAY_ERROR]:
}, initDisp);

export default displayReducer;