declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_BASE_URL_PROD: string;
			NEXT_PUBLIC_BASE_URL_DEV: string;
			NEXT_PUBLIC_BASE_GOOGLE_MAPS: string;
		}
	}
}

export {};
