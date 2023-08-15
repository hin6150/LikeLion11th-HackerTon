import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.39.21.135:8080/api/v1/member/',
  }),

  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => {
        // const { api_key, language } = arg;
        return {
          url: 'video',
          //   params: { api_key, language },
        };
      },
    }),
    postChat: builder.mutation({
      query: (question) => ({
        url: 'chat/askChatGPT',
        method: 'POST',
        body: question,
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    signUp: builder.mutation({
      query: ({ username, password, nickname }) => ({
        url: 'signup',
        method: 'POST',
        body: { username, password, nickname, userRole: 'MEMBER' },
      }),
    }),
    getAccessToken: builder.mutation({
      query: ({ refreshToken }) => ({
        url: 'renew-access-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});

// 자동으로 생성되는 훅을 사용하기 위해서 export 합니다.
export const {
  useGetVideosQuery,
  usePostChatMutation,
  useLoginMutation,
  useSignUpMutation,
  useGetAccessTokenMutation,
} = memberApi;

export default memberApi;
