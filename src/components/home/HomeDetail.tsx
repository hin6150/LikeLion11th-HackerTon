/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import theme from '../../styles/theme';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideoQuery, useGetVideosQuery } from '../../store/memberApi';
import { DataType } from '../../types/type';

const HomeDetail = () => {
  const { videoId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  // useGetVideosQuery는 컴포넌트 내에서 호출되는 경우에도 매 렌더링마다 새로운 함수가 생성될 수 있습니다.
  const {
    data: getVideosQuery,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useGetVideosQuery({});
  const {
    data: getVideoQuery,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useGetVideoQuery(videoId);

  // useCallback을 사용하여 함수 메모이제이션
  const getVideos = useCallback(() => {
    return getVideosQuery;
  }, [getVideosQuery]);

  const getVideo = useCallback((): DataType => {
    return getVideoQuery;
  }, [getVideoQuery]);

  // useMemo를 사용하여 계산된 값을 메모이제이션
  const videos = useMemo(() => getVideos(), [getVideos]);
  const video = useMemo(() => getVideo(), [getVideo]);

  console.log(video);
  if (isLoadingVideos || isLoadingVideo) return <div>Loading...</div>;
  if (isErrorVideos || isErrorVideo) return <div>Error loading videos</div>;
  return (
    <div
      css={css`
        text-align: left;
        padding-bottom: 9.6rem;
      `}
    >
      <div
        css={css`
          @media screen and (min-width: 1366px) {
            height: 72vh;
          }
        `}
      >
        <VideoFrame videoFileName={video.videoFileName} singleVideo />
      </div>
      <div
        css={css`
          margin: 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        `}
      >
        <h2
          css={css`
            ${theme.Typography.Header3}
          `}
        >
          {video.videoTitle}
        </h2>

        <p
          css={css`
            ${theme.Typography.Body2}
          `}
        >
          조회수: {video.viewCount} · 시간
        </p>

        <p>{video.videoDetail}</p>

        <div
          css={css`
            margin-top: 0.8rem;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.8rem;
            `}
          >
            <div
              css={css`
                width: 4.8rem;
                height: 4.8rem;
                border-radius: 4.8rem;
                background-color: ${theme.Gray[200]};
              `}
            />
            <p>{video.nickname}</p>
          </div>
          <div
            css={css`
              display: flex;
              font-size: 3.2rem;
              gap: 1.6rem;
            `}
          >
            <BsHandThumbsUp />
            <BsHandThumbsDown />
          </div>
        </div>
      </div>
      <hr />
      <p
        css={css`
          margin: 1.6rem;
        `}
      >
        관련된 동영상 강의
      </p>
      <HomeGridContainer>
        {videos?.content.map((data: DataType) => {
          const uniqueKey = uuidv4();
          if (data.videoId === Number(videoId)) return null;
          return (
            <VideoContainer key={uniqueKey} id={data.videoId}>
              <VideoFrame videoFileName={data.videoFileName} preview />
              <VideoInfo data={data} />
            </VideoContainer>
          );
        })}
      </HomeGridContainer>
    </div>
  );
};

export default HomeDetail;
