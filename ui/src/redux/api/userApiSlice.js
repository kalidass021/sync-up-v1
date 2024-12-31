import { apiSlice } from './apiSlice';
import { USER_URL } from '../../config/constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (username) => `${USER_URL}/${username}/profile`,
      providesTags: ['UserProfile'],
    }),

    followOrUnfollowUser: builder.mutation({
      // id is targer user id
      query: (id) => ({
        url: `${USER_URL}/${id}/follow`,
        method: 'POST',
      }),
      invalidatesTags: ['UserProfile', 'SuggestedUsers', 'AllUsers'],
    }),

    getSuggestedUsers: builder.query({
      query: () => `${USER_URL}/suggested`,
      providesTags: ['SuggestedUsers'],
    }),

    fetchAllUsers: builder.query({
      query: () => `${USER_URL}/all`,
      providesTags: ['AllUsers'],
    }),

    updateUserProfile: builder.mutation({
      query: ({ username, updatedUser }) => ({
        url: `${USER_URL}/${username}/profile`,
        method: 'PUT',
        body: updatedUser,
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useFollowOrUnfollowUserMutation,
  useGetSuggestedUsersQuery,
  useFetchAllUsersQuery,
  useUpdateUserProfileMutation,
} = userApiSlice;
