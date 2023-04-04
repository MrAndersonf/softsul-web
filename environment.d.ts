declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_BASE_URL_PROD: string;
			NEXT_PUBLIC_BASE_URL_DEV: string;
		}
	}
}

export {};
