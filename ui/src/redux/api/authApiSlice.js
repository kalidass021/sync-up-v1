import { apiSlice } from './apiSlice';
import { AUTH_URL } from '../../config/constants';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signin`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    signout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/signout`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    getCurrentUserProfile: builder.query({
      query: () => `${AUTH_URL}/profile`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useGetCurrentUserProfileQuery,
  useLazyGetCurrentUserProfileQuery,
} = authApiSlice;
