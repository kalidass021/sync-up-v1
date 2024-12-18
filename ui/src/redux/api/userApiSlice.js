import { apiSlice } from './apiSlice';
import { USER_URL } from '../../config/constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getUserProfile: builder.query({
      query: (username) => `${USER_URL}/${username}/profile`,
    }),

    followOrUnfollowUser: builder.mutation({
      // id is targer user id
      query: (id) => ({
        url: `${USER_URL}/${id}/follow`,
        method: 'POST',
      }),
    }),

    getSuggestedUsers: builder.query({
      query: () => `${USER_URL}/suggested`,
    }),

    updateUserProfile: builder.mutation({
      query: ({ username, updatedUser }) => ({
        url: `${USER_URL}/${username}/profile`,
        method: 'PUT',
        body: updatedUser,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useFollowOrUnfollowUserMutation,
  useGetSuggestedUsersQuery,
  useUpdateUserProfileMutation,
} = userApiSlice;
