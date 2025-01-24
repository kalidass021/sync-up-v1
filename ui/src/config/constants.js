const APP_ENV = import.meta.env.VITE_APP_ENV;
const BASE_API_URL =
  APP_ENV === 'production'
    ? import.meta.env.VITE_APP_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;
export const BASE_URL = BASE_API_URL;
export const AUTH_URL = `${BASE_URL}/v1/auth`;
export const POST_URL = `${BASE_URL}/v1/posts`;
export const USER_URL = `${BASE_URL}/v1/users`;

export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;
