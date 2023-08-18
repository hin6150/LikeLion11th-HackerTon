/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideosQuery } from '../../store/memberApi';
import { DataType } from '../../types/type';
import { selectFliter } from '../../store/filterSlice';

const Home = () => {
  const { search } = useParams();
  const { ageCategory, videoCategory } = useSelector(selectFliter);
  const {
    data: videos,
    isLoading,
    isError,
    refetch,
  } = useGetVideosQuery({ search, ageCategory, videoCategory });

  useEffect(() => {
    refetch();
  }, [search, ageCategory, videoCategory]); // 필요한 의존성 배열

  if (isLoading)
    return (
      <div
        css={css`
          display: grid;
          grid-template-columns: 3fr 1fr;
        `}
      >
        Loading...
      </div>
    );

  if (isError) return <div>Error loading videos</div>;

  return (
    <HomeGridContainer>
      {videos.numberOfElements !== 0 ? (
        videos.content.map((data: DataType) => {
          const uniqueKey = uuidv4();
          return (
            <VideoContainer key={uniqueKey} id={data.videoId}>
              <VideoFrame videoFileName={data.videoFileName} preview />
              <VideoInfo data={data} />
            </VideoContainer>
          );
        })
      ) : (
        <div>조건에 해당하는 동영상이 없습니다.</div>
      )}
    </HomeGridContainer>
  );
};

export default Home;
