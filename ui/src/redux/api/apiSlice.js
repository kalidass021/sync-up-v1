import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/constants';

const baseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL, credentials: 'include' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post', 'UserProfile', 'SuggestedUsers', 'AllUsers'],
  endpoints: () => ({}),
});
