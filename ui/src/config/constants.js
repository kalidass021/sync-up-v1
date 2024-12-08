const APP_ENV = import.meta.env.VITE_APP_ENV;
const BASE_API_URL =
  APP_ENV === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;
export const BASE_URL = BASE_API_URL;
export const AUTH_URL = `${BASE_URL}/api/v1/auth`;
export const POST_URL = `${BASE_URL}/api/v1/posts`;
