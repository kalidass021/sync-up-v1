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
    }),

    getRecentPosts: builder.query({
      query: () => `${POST_URL}/recents`,
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetRecentPostsQuery,
  useDeletePostMutation,
} = postApiSlice;
