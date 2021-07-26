import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { CookiesProvider } from "react-cookie";
import { createBrowserHistory } from "history";
import { logger } from "redux-logger";
import { Router } from "react-router-dom";
import App from "./App";

// redux-thunk는 함수를 디스패치 할 수 있게 해주는 미들웨어
// redux-saga는 액션을 모니터링 하고있다가, 특정 액션이 발생하면 이에 따라 특정 작업을 하는 방식
import ReduxThunk from "redux-thunk"; // 비동기 처리할 때 많이 사용하는 미들웨어
import createSagaMiddleware from "redux-saga";
import indexReducer from "./reducers/indexReducer";
import indexSaga from "./sagas/indexSaga";

// 다국어 지원 세팅
import { I18nextProvider } from "react-i18next";
import i18n from "./lang/i18n";

// 리덕스 개발자 도구
import { composeWithDevTools } from "redux-devtools-extension";



// history.push("/") // url 이동
const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
	context: {
		history: customHistory
	}
}); // redux-saga middle ware



// store는 1개만 존재
const store = createStore(
	indexReducer,
	// logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
	composeWithDevTools(
		applyMiddleware(
			// 미들웨어는 여러개 적용할 수 있다.
			ReduxThunk.withExtraArgument({ history: customHistory }),
			sagaMiddleware,
			logger
		)
	)
);

console.log("*** store info ***");
console.log(store.getState());

sagaMiddleware.run(indexSaga);



const render = () => {

	ReactDOM.render(
		<Router history={customHistory}>
			<CookiesProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</CookiesProvider>
		</Router>,
		document.getElementById("root")
	);

}

render();