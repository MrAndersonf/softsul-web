import axios from 'axios';

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? process.env.NEXT_PUBLIC_BASE_URL_PROD
			: process.env.NEXT_PUBLIC_BASE_URL_DEV,
});

instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default instance;
