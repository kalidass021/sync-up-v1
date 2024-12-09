import { apiSlice } from './apiSlice';
import { POST_URL } from '../../config/constants';

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (newPost) => ({
        url: POST_URL,
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),

    getRecentPosts: builder.query({
      query: () => `${POST_URL}/recents`,
      providesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}/like`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

    likeOrUnlikePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),

    saveOrUnsavePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}/save`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetRecentPostsQuery,
  useDeletePostMutation,
  useLikeOrUnlikePostMutation,
  useSaveOrUnsavePostMutation,
} = postApiSlice;
