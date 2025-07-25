export const STATUS_CODES = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NoContent: 204,
  ResetContent: 205,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  InternalServerError: 500,
  ServiceUnavailable: 503,
  HTTPVersionNotSupported: 505,
};

export const ROUTES = {
    ROOT: '/',
    AUTH: '/v1/auth',
    USERS: '/v1/users',
    POSTS: '/v1/posts',
    NOTIFICATIONS: '/v1/notifications',
}

export const AUTH_ENDPOINTS = {
  AUTH_CHECK: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  GET_CURRENT_USER_PROFILE: '/profile',
}

export const NOTIFICATION_ENDPOINTS = {
  PROCESS_NOTIFICATIONS: '/',
}
