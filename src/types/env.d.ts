// env.d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EXPO_PUBLIC_API_URL: string;
            EXPO_PUBLIC_WEBVIEW_URL: string;
            EXPO_PUBLIC_TEMP_ACCESS_TOKEN: string;
            EXPO_PUBLIC_TEMP_STORE_ID: string;
        }
    }
}

export {};