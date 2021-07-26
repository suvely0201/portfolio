import { takeEvery } from "redux-saga/effects";

/* 액션타입 */
// 링크
const GO_HOME = "link/GO_HOME";
export const goHome = () => ({
	type: GO_HOME
})

function* homeAction() {
	const history = yield getContext("history");
	history.push("/");
}

export function* linkModule() {
	yield takeEvery(GO_HOME, homeAction);
}


// 홈으로 이동
// getState를 이용해서 조건부 이동이나 특정 api호출 성공시 이동
/*export const goHome = () => (dispatch, getState, { history }) => {
	history.push("/");
}*/