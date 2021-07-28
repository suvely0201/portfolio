import "regenerator-runtime/runtime";
import { delay, call, put, all, select, take, takeEvery, takeLatest, } from "redux-saga/effects";
import * as UserReducer from "../reducers/UserReducer";
import { axiosFormData } from "../axios/Server";

export function* UserWatch() {
	yield takeLatest(UserReducer.loginProc, loginAction);
}

// login
function* loginAction(obj) {
	try {

		const data = obj.payload;
		let baseUrl = "/logi232323nproc";

		const result = yield call([axiosFormData, axiosFormData.post], baseUrl, data);
		yield put(UserReducer.loginProcdfdf(result));

	} catch(error) {
		console.log("Error ===> " + error);
		// window.location.reload();
	}

}