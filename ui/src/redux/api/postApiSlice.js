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
      invalidatesTags: ['Post', 'User'],
    }),

    getSpecificPost: builder.query({
      query: (id) => `${POST_URL}/${id}`,
      providesTags: ['Post'],
    }),

    getRecentPosts: builder.query({
      query: () => `${POST_URL}/recents`,
      providesTags: ['Post'],
    }),

    getPostsByIds: builder.query({
      query: (postIds) => {
        const query = postIds.join(',');
        return {
          url: `${POST_URL}?ids=${query}`,
          method: 'GET',
        };
      },
      provideTags: ['Post'],
    }),

    getInfinitePosts: builder.query({
      query: ({ page, limit }) =>
        `${POST_URL}/infinite?page=${page}&limit=${limit}`,
      provideTags: ['Post'],
    }),

    searchPosts: builder.query({
      query: (searchText) => `${POST_URL}/search?query=${searchText}`,
      providesTags: ['Post'],
    }),

    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `${POST_URL}/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
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
      invalidatesTags: ['User', 'Post'],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetSpecificPostQuery,
  useGetRecentPostsQuery,
  useGetPostsByIdsQuery,
  useGetInfinitePostsQuery,
  useSearchPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikeOrUnlikePostMutation,
  useSaveOrUnsavePostMutation,
} = postApiSlice;