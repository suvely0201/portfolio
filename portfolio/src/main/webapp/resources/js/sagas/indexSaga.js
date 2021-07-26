import { all } from "redux-saga/effects";
import { displaySaga } from "./displaySaga";

export function* indexSaga() {
	yield all([
		displaySaga(),
	]);
};

export default indexSaga;