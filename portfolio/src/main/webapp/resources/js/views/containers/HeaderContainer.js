import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccount } from "../reducers/accountReducer";


function Header() {

	console.log("set 'SaveScroll' Component");
	const { data, loading, error } = useSelector(
		state => state.accountReducer
	);
	const dispatch = useDispatch();




	// componentDidMount, componentDidUpdate
	useEffect(() => {
		
		dispatch(getAccount());

		console.log("set 'SaveScroll - useEffect'");
		const scrollPosition = sessionStorage.getItem("scrollPos");
		if(scrollPosition !== null)
			window.scrollTo(0, scrollPosition);

		window.addEventListener("scroll", (e) => {
			sessionStorage.setItem("scrollPos", window.pageYOffset);
		});

		// dispatch 지우기
		
	}, []); // [] 넣어줘서 한번만 실행되도록

	return (
		<>
			<div>3123</div>
		</>
	)
}

export default Header;