import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config/constants';

const baseQuery = fetchBaseQuery({ baseUrl: API_BASE_URL, credentials: 'include' });

export const apiSlice = createApi({
  baseQuery,
  refetchOnFocus: true, // refetch all subscribed queries after the application window/tab regains the focus
  refetchOnReconnect: true, // refetch all subscribed queries after regaining a network connection
  tagTypes: ['User', 'Post', 'UserProfile', 'SuggestedUsers', 'AllUsers'],
  endpoints: () => ({}),
});
