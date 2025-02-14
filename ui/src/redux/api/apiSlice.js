import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config/constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Post', 'UserProfile', 'SuggestedUsers', 'AllUsers'],
  endpoints: () => ({}),
});
