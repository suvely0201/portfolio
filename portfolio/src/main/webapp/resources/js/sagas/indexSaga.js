import { all } from "redux-saga/effects";
import { UserWatch } from "./UserSaga";

export function* indexSaga() {
	yield all([
		UserWatch(),
	]);
};

export default indexSaga;