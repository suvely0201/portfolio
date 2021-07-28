import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import * as UserReducer from "../../reducers/UserReducer";

const doc = window.document;
function Login() {
	
	const [ id, setId ] = useState("");
	const [ pw, setPw ] = useState("");
	const form = doc.getElementsByClassName("login_form");

	const dispatch = useDispatch();

	const login = (e) => {

		// 페이지 refresh 방지
		e.preventDefault();
		//e.stopPropagation();

		// form 태그가 아니라 div태그에 button 클릭 이벤트로 동작시켜도 상관없음.
		console.log("lgin");

		let lgn = new Object();
		lgn.username = id;
		lgn.password = pw;

		// axois 서버로 보내야 함.
		//dispatch(UserReducer.loginProc(lgn));

		axios("/loginproc", {
			method: "POST",
			auth: {
				username: id,
				password: pw
			}
		}).then((response => {
			console.log(response)
		})).catch((err=>{
			console.log(err)
		}));

	};

	// ID, PW 클릭하면 input 박스로 포커싱 변경
	const focusOn = (e) => {
		
		e.currentTarget.nextElementSibling.focus();
		Array.from(form).forEach((e, i) => {
			form[i].classList.remove("active");
		});

		e.currentTarget.parentNode.classList.add("active");

	}

	// 인풋 포커싱 아웃일 때 border 제거
	const focusOut = (e) => {
		e.currentTarget.parentNode.classList.remove("active");
	}

	// 직접적인 input 포커싱
	const inputClick = (e) => {
		
		console.log("!@3123 adddf");

		Array.from(form).forEach((e, i) => {
			form[i].classList.remove("active");
		});

		e.currentTarget.parentNode.classList.add("active");

	}

	useEffect(() => {
		console.log("Login");
	}, []);

	return (
		<>
			<div className="login_container">
				<div className="login_wrap">
			
					<div className="login_logo">
						SUMIN
					</div>

					<form onSubmit={login}>
						
						<div className="login_form id">
							<span id="idFocus" onClick={focusOn}>ID</span>
							<input
								type={"text"}
								value={id}
								onChange={(e) => setId(e.currentTarget.value)}
								onClick={inputClick}
								onBlur={focusOut} />
						</div>

						<div className="login_form pw">
							<span id="pwFocus" onClick={focusOn}>PW</span>
							<input
								type={"password"}
								value={pw}
								onChange={(e) => setPw(e.currentTarget.value)}
								onClick={inputClick}
								onBlur={focusOut} />
						</div>

						<div className="login_option" id="opt">
							<input type="checkbox" id="remember" />
							<label htmlFor="remember"></label>
							<span>remember me</span>
						</div>
						
						<div className="login_btn">
							<button className="login_submit_btn" type="submit">Sign In</button>
						</div>

					</form>
				</div>
			</div>
		</>
	);

}

export default Login;