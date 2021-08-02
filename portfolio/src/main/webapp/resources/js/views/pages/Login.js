import React, { useEffect, useState } from "react";
import axios from "axios";

const doc = window.document;
function Login() {
	
	const [ id, setId ] = useState("");
	const [ pw, setPw ] = useState("");
	const [ err, setErr ] = useState("");
	const form = doc.getElementsByClassName("login_form");

	const login = (e) => {

		// 페이지 refresh 방지
		e.preventDefault();
		e.stopPropagation();

		// 넘길 계정 정보
		let lgn = new FormData();
		lgn.append("username", id);
		lgn.append("password", pw);
		
		axios("/loginproc", {
			method: "POST",
			data: lgn,
			headers: {
				"Content-Type": "multipart/form-data"
			},
		}).then((response) => {
			console.log(response);
			const authCode = response.data._auth_._authCode;
			const authResult = response.data._auth_._authMessage || response.data._auth_._redirectUrl;
			handleResult(authCode, authResult);
			
		}).catch((err) => {
			console.log(err)
		});
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
		
		Array.from(form).forEach((e, i) => {
			form[i].classList.remove("active");
		});

		e.currentTarget.parentNode.classList.add("active");

	}

	// 로그인 이후 처리
	const handleResult = (code, info) => {
		
		code === "auth_01" ? 
			window.location.href = info:
			setErr(info)
		
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
						<div className="login_failure">
							<p>{err}</p>	
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