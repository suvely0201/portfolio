import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

const axiosMain = axios.create({
	baseURL: MAIN_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});

const axiosFormData = axios.create({
	baseURL: MAIN_HOST,
	timeout: 180000,
	header: {
		"Content-Type": "multipart/form-data"
	}
});

const axiosResource = axios.create({
	baseURL: RESOURCE_HOST,
	timeout: 180000,
	transformRequest: [(response) => JSON.stringify(response)]
});


const axiosWeather = axios.create({
	baseURL: OPEN_WEATHER_HOST,
	timeout: 180000,
	withCredentials: false,
});

export { axiosMain, axiosResource, axiosFormData, axiosWeather };