import React from "react";
import { createGlobalStyle } from "styled-components";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
library.add( faUser );

import Router from "./router/Router"

import header from "../style/header.scss";
import login from "../style/login.scss";

const GlobalBlock = createGlobalStyle`
	body, html {
		margin: 0;
		padding: 0;
		min-width: 280px;
		cursor: default;
	};

	ul, li, ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	button {
		cursor: pointer;
	}

	button, input, textarea {
		appearance: none;
		outline: none;
	}

	textarea {
		resize: none;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	.block {
		display: block !important;
	}

	.inline {
		display: inline !important;
	}
`;

const App = () => {
	return (
		<>
			<GlobalBlock />
			<Router />
		</>
	);
}

export default App;