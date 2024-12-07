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
    
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreatePostMutation, useDeletePostMutation } = postApiSlice;
