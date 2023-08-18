import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AgeCategoryType, ViedoCategoryType } from '../types/type';

const createFormData = ({
  title,
  videoDetail,
  videoCategory,
  ageCategory,
  hashTag,
  file,
}: {
  title: string;
  videoDetail: string;
  videoCategory: string;
  ageCategory: string;
  hashTag: string[];
  file: File;
}) => {
  const formData = new FormData();
  formData.append('file', file);

  formData.append('title', title);
  formData.append('videoDetail', videoDetail);
  formData.append('videoState', 'standBy');
  formData.append('videoCategory', videoCategory);
  formData.append('ageCategory', ageCategory);
  formData.append('hashTag', JSON.stringify(hashTag));

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  return formData;
};

export const memberApi = createApi({
  reducerPath: 'memberApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.39.21.135:8080/api/v1/member/',
  }),

  endpoints: (builder) => ({
    getVideos: builder.query({
      query: ({
        search: s,
        videoCategory,
        ageCategory,
      }: {
        search?: string;
        videoCategory?: ViedoCategoryType[];
        ageCategory?: AgeCategoryType[];
      }) => {
        if (s) {
          return {
            url: 'video/search',
            params: { s },
          };
        }

        return {
          url: 'video',
          params: {
            categories: videoCategory && videoCategory.length > 0 ? videoCategory?.join(',') : '',
            ageCategories: ageCategory && ageCategory.length > 0 ? ageCategory?.join(',') : '',
          },
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
      query: (chatGptReq) => ({
        url: 'chat/askChatGPT',
        method: 'POST',
        body: chatGptReq,
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
          // 'Content-Type': 'multipart/form-data',
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
