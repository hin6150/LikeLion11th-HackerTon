/** @jsxImportSource @emotion/react */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideosQuery } from '../../store/memberApi';
import { DataType } from '../../types/type';

const Home = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery({}); // API 슬라이스의 훅을 사용합니다.

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading videos</div>;

  console.log(videos);

  return (
    <HomeGridContainer>
      {videos.content.map((data: DataType) => {
        const uniqueKey = uuidv4();
        return (
          <VideoContainer key={uniqueKey} id={data.videoId}>
            <VideoFrame />
            <VideoInfo data={data} />
          </VideoContainer>
        );
      })}
    </HomeGridContainer>
  );
};

export default Home;
