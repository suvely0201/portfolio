// 다국어지원 초기세팅
/*
	npm install i18next
	npm install i18next-browser-languagedetector
	npm install react-i18next
	npm install i18next-xhr-backend
*/

import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationKo from "./translation.ko.json";
import translationEn from "./translation.en.json";
import translationJa from "./translation.ja.json";
import translationZh from "./translation.zh.json";

const resource = {

	ko: {
		translation: translationKo
	},
	en: {
		translation: translationEn
	},
	ja: {
		translation: translationJa
	},
	zh: {
		translation: translationZh
	}

}

i18n
	
	// LanguageDetector를 이용해서 자동으로 번역본으로 돌려줌
	// i18n.changeLanguage로 변경하면 language 저장
	.use(XHR)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: resource,
		//lng: "ko", // LanguageDetector 추가했으니 뺀다.
		fallbackLng: "en",
		debug: true,
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false // react already safes from xss
		},
		react: {
			useSuspense: false,
		}
	});

export default i18n;