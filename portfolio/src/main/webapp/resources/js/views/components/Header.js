import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// 다국어 지원 세팅
import i18n from "../../lang/i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gt } from "lodash";

const doc = window.document;
function Header() {

	console.log("HEADER Component");
	const dispatch = useDispatch();
	const urlMatch = window.location.pathname;
	const category = doc.getElementsByClassName("category");
	const mobileCategory = doc.getElementsByClassName("mobile_category");

	// save scroll position
	useEffect(() => {
		
		const scrollPosition = sessionStorage.getItem("scrollPos");
		if(scrollPosition !== null)
			window.scrollTo(0, scrollPosition);

		window.addEventListener("scroll", (e) => {
			sessionStorage.setItem("scrollPos", window.pageYOffset);
		});

	}, []); // [] 넣어줘서 한번만 실행되도록

	// category
	useEffect(() => {

		// url 확인해서 색상
		Array.from(category).forEach((el, i) => {
			
			const href = el.firstChild.getAttribute("href");
			urlMatch === href ? el.classList.add("active") : category;
			// urlMatch === href ? mobileCategory[i].classList.add("active") : mobileCategory[0].classList.add("active");

		});
		
		// category
		const categoryWrap = doc.getElementById("categoryWrap");
		categoryWrap.addEventListener("mouseenter", (e) => {
			categoryWrap.parentNode.classList.add("open");
		});
		
		categoryWrap.addEventListener("mouseleave", (e) => {
			categoryWrap.parentNode.classList.remove("open");
		});

	}, []);

	// Resize
	useEffect(() => {

		const ht = doc.getElementsByTagName("header")[0];
		const mow = doc.getElementsByClassName("mobile_opt_wrap")[0];
		window.addEventListener("resize", (e) => {
			
			e.preventDefault();
			if(window.innerWidth > 768 && ht.classList.contains("on")) {
				ht.classList.remove("on");
				mow.classList.remove("on");
			}

		});

	}, [])

	// language
	useEffect(() => {
		
		const i18lang = i18n.language;
		const lang = doc.getElementsByClassName("lang")[0];
		const mobileLang = doc.getElementsByClassName("mobile_lang");
		switch(i18lang){
			case "ko":
			case "ko-KR":
				lang.textContent = "KOR";
				mobileLang[0].classList.add("on");
				break;
			case "en":
				lang.textContent = "ENG";
				mobileLang[1].classList.add("on");
				break;
			case "ja":
				lang.textContent = "JPN";
				mobileLang[2].classList.add("on");
				break;
			case "zh":
				lang.textContent = "CHN";
				mobileLang[3].classList.add("on");
				break;
		}

		lang.addEventListener("click", (e) => {
			
			let pn = e.currentTarget.parentNode;
			pn.classList.contains("open") ? pn.classList.remove("open") : pn.classList.add("open");

		});

	}, []);

	const toggleCate = element => {

		const el = element.currentTarget;
		if(el.classList.contains("active"))
			return;
		
		Array.from(category).forEach((e, i) => {
			category[i].classList.remove("active");
		});

		el.classList.add("active");

	}
	
	const resetCate = () => {
		Array.from(category).forEach((e, i) => {
			category[i].classList.remove("active");
		});
	}

	const selectLang = (e) => {

		// mobile_bg 클릭 방지
		e.preventDefault();
		e.stopPropagation();

		const lang = doc.getElementsByClassName("lang")[0];
		const select = e.target.firstChild.textContent && e.target.textContent;
		console.log("select ===> " + select);
		switch(select) {
			case "KOR":
				i18n.changeLanguage("ko");
				lang.textContent = "KOR";
				mobileLangFunc(select);
				break;
				
			case "ENG":
				i18n.changeLanguage("en");
				lang.textContent = "ENG";
				mobileLangFunc(select);
				break;
				
			case "JPN":
				i18n.changeLanguage("ja");
				lang.textContent = "JPN";
				mobileLangFunc(select);
				break;
				
			case "CHN":
				i18n.changeLanguage("zh");
				lang.textContent = "CHN";
				mobileLangFunc(select);
				break;
		}

		lang.parentNode.classList.remove("open");

	}

	// function
	function mobileLangFunc(language) {
		
		const mobileLang = doc.getElementsByClassName("mobile_lang");
		Array.from(mobileLang).forEach((e, i) => {
			mobileLang[i].textContent === language ?
				mobileLang[i].classList.add("on") :
				mobileLang[i].classList.remove("on");
		});

	}

	// 모바일 메뉴 클릭
	const mobileOn = (e) => {

		const target = doc.getElementsByClassName("mobile_opt_wrap")[0];
		const pn = target.parentNode;

		target.classList.contains("on") ? (
			target.classList.remove("on"),
			pn.classList.remove("on")
		) : (
			target.classList.add("on"),
			pn.classList.add("on")
		);
		
	}

	// Category + 버튼 클릭이벤트
	const plusIcon = (e) => {

		// link to 이동 방지
		e.preventDefault();
		e.stopPropagation();

		const target = e.currentTarget.parentNode;
		!target.classList.contains("on") ? (
			target.classList.add("on")
		) : (
			target.classList.remove("on")
		);
		
	}

	return (
		<header>

			<div className="logo_wrap">
				<div className="logo" onClick={resetCate}>
					<Link to="/">SUMIN</Link>
				</div>
			</div>
			<div id="categoryWrap" className="category_wrap">
				<ul className="category_container">
					<li className="category" onClick={toggleCate}>
						<Link to="/display">GALLERY</Link>
						<ul className="sub_category_wrap">
							<li className="sub_category">
								<Link to="/display/about">ABOUT</Link>
							</li>
							<li className="sub_category">
								<Link to="/display/contents">CONTENTS</Link>
							</li>
							<li className="sub_category">
								<Link to="/display/artists">ARTISTS</Link>
							</li>
							<li className="sub_category">
								<Link to="/display/curating">CURATING</Link>
							</li>
						</ul>
					</li>
					<li className="category" onClick={toggleCate}>
						<Link to="/solution">SOLUTION</Link>
						<ul className="sub_category_wrap">
							<li className="sub_category">
								<Link to="/solution/about">DISPLAY</Link>
							</li>
							<li className="sub_category">
								<Link to="/solution/contents">SCHEDULE</Link>
							</li>
							<li className="sub_category">
								<Link to="/solution/software">SOFTWARE</Link>
							</li>
						</ul>
					</li>
					<li className="category" onClick={toggleCate}>
						<Link to="/contact">CONTACT</Link>
					</li>
				</ul>
			</div>
			
			<div className="right_wrap">
				
				<div className="lang_wrap">
				<div className="lang"></div>
				<ul className="lang_select">
					<li onClick={selectLang}>KOR</li>
					<li onClick={selectLang}>ENG</li>
					<li onClick={selectLang}>JPN</li>
					<li onClick={selectLang}>CHN</li>
				</ul>
			</div>
				<div className="user_wrap">
					<div className="icon_wrap">
						<FontAwesomeIcon icon="user" />
					</div>
				</div>
				
			</div>
			<div className="mobile_opt_wrap" onClick={mobileOn}>
				<span className="mobile_btn one"></span>
				<span className="mobile_btn two"></span>
				<span className="mobile_btn three"></span>
			</div>

			{/* bg */}
			<div className="category_sub_wrap"></div>
			<div className="mobile_bg" onClick={mobileOn}>
				
				<div className="mobile_lang_wrap">
					<div className="mobile_lang" onClick={selectLang}>KOR</div>
					<div className="mobile_lang" onClick={selectLang}>ENG</div>
					<div className="mobile_lang" onClick={selectLang}>JPN</div>
					<div className="mobile_lang" onClick={selectLang}>CHN</div>
				</div>
				<ul className="mobile_category_wrap">
					<li className="mobile_category">
						<Link to="/">
							<span>SUMIN</span>
						</Link>
					</li>
					<li className="mobile_category">
						<Link to="/gallery" onClick={plusIcon}>
							<span>GALLERY</span>
							<span className="icon_plus">
								<small className="icon_plus_bar"></small>
								<small className="icon_plus_bar"></small>
							</span>
						</Link>
						<ul className="mobile_sub_category_wrap">
							<li className="mobile_sub_category">
								<Link to="/gallery/about">ABOUT</Link>
							</li>
							<li className="mobile_sub_category">
								<Link to="/gallery/contents">CONTENTS</Link>
							</li>
							<li className="mobile_sub_category">
								<Link to="/gallery/artists">ARTISTS</Link>
							</li>
							<li className="mobile_sub_category">
								<Link to="/gallery/curating">CURATING</Link>
							</li>
						</ul>
					</li>
					<li className="mobile_category">
						<Link to="/solution" onClick={plusIcon}>
							<span>SOLUTION</span>
							<span className="icon_plus">
								<small className="icon_plus_bar"></small>
								<small className="icon_plus_bar"></small>
							</span>
						</Link>
						<ul className="mobile_sub_category_wrap">
							<li className="mobile_sub_category">
								<Link to="/solution/display">DISPLAY</Link>
							</li>
							<li className="mobile_sub_category">
								<Link to="/solution/schedule">SCHEDULE</Link>
							</li>
							<li className="mobile_sub_category">
								<Link to="/solution/software">SOFTWARE</Link>
							</li>
						</ul>
					</li>
					<li className="mobile_category">
						<Link to="/contact">
							<span>CONTACT</span>
						</Link>
					</li>
				</ul>
			</div>

		</header>
	)
}

export default Header;