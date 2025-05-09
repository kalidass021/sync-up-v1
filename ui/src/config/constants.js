const APP_ENV = import.meta.env.VITE_APP_ENV;
export const API_BASE_URL =
  APP_ENV === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;
export const AUTH_URL = `${API_BASE_URL}/v1/auth`;
export const POST_URL = `${API_BASE_URL}/v1/posts`;
export const USER_URL = `${API_BASE_URL}/v1/users`;

export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

export const TEST_USER = {
  EMAIL: import.meta.env.VITE_TEST_USER_EMAIL,
  PASSWORD: import.meta.env.VITE_TEST_USER_PASSWORD,
}

