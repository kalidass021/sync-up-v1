// mongo db object id pattern regex
export const MONGO_ID_REGEX = '([0-9a-fA-F]{24})';

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
};

export const AUTH_ENDPOINTS = {
  AUTH_CHECK: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  GET_CURRENT_USER_PROFILE: '/profile',
};

export const NOTIFICATION_ENDPOINTS = {
  PROCESS_NOTIFICATIONS: '/',
};

export const POST_ENDPOINTS = {
  CREATE_POST: '/',
  GET_SPECIFIC_POST: `/:id${MONGO_ID_REGEX}`,
  GET_RECENT_POSTS: '/recents',
  GET_POSTS_BY_IDS: '/',
  GET_INFINITE_POSTS: '/infinite',
  SEARCH_POSTS: '/search',
  FETCH_MEME_OF_THE_DAY: '/meme',
  GET_USER_POSTS: '/:username',
  UPDATE_POST: `/:id${MONGO_ID_REGEX}`,
  DELETE_POST: `/:id${MONGO_ID_REGEX}`,
  LIKE_OR_UNLIKE_POST: `/:id${MONGO_ID_REGEX}/like`,
  SAVE_OR_UNSAVE_POST: `/:id${MONGO_ID_REGEX}/save`,
};

export const USER_ENDPOINTS = {
  GET_USER_PROFILE: '/:username/profile',
  FOLLOW_OR_UNFOLLOW_USER: `/:id${MONGO_ID_REGEX}/follow`,
  FETCH_SUGGESTED_USERS: '/suggested',
  FETCH_ALL_USERS: '/all',
  SEARCH_USERS: '/search',
  UPDATE_USER_PROFILE: '/:username/profile',
}

export const API_STATUS = {
  WORKING: 'API is working!',
}
