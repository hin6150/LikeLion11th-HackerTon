import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createFormData = ({
  title,
  videoDetail,
  videoCategory,
  ageCategory,
  hashTag,
  file,
  accessToken,
}: {
  title: string;
  videoDetail: string;
  videoCategory: string;
  ageCategory: string;
  hashTag: string;
  accessToken: string;
  file: File;
}) => {
  console.log(title, videoDetail, [hashTag], videoCategory, ageCategory, accessToken, file);

  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'videoUploadReqeustDto',
    JSON.stringify({
      title,
      videoDetail,
      videoState: 'standBy',
      videoCategory: 'Leisure',
      ageCategory: 'youth',
      hashTag: [hashTag],
    }),
  );

  return formData;
};

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
    getVideo: builder.query({
      query: (id: string | undefined) => {
        return { url: `video/${id}` };
      },
    }),
    getMyVideos: builder.query({
      query: ({ accessToken, memberId }) => {
        if (memberId) {
          return {
            url: `${memberId}/videoList`,
          };
        }

        return {
          url: 'video/myVideo',
          headers: { Authorization: `Bearer ${accessToken}` },
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
      query: ({ username, password, nickname, name }) => ({
        url: 'signup',
        method: 'POST',
        body: { username, password, nickname, name, userRole: 'MEMBER' },
      }),
    }),
    getAccessToken: builder.mutation({
      query: ({ refreshToken }) => ({
        url: 'renew-access-token',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: 'video',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: createFormData(data),
      }),
    }),
    mail: builder.mutation({
      query: ({ email }) => ({
        url: 'mail',
        method: 'post',
        params: { email },
      }),
    }),
  }),
});

// 자동으로 생성되는 훅을 사용하기 위해서 export 합니다.
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetMyVideosQuery,
  usePostChatMutation,
  useLoginMutation,
  useSignUpMutation,
  useGetAccessTokenMutation,
  useUploadVideoMutation,
  useMailMutation,
} = memberApi;

export default memberApi;
