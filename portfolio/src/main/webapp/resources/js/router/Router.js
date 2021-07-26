import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import Header from "../views/components/Header";
import Display from "../views/pages/Display";
import Test from "../views/pages/Test";

const App = () => {
	//<Route path="/gms/:idv" component={PostPage} />
	//<Route path="/3" component={Display} exact />
	return (
		<>
			<Header />
			<Switch>
				<Route path="/" component={Display} exact />
				<Route path="/display" component={Test} exact />
				<Route path="/gallery" component={Test} exact />
			</Switch>
		</>
	);
}

export default App;