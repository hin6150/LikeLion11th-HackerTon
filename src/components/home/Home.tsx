/** @jsxImportSource @emotion/react */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideosQuery } from '../../store/memberApi';

const Home = () => {
  const repeatedVideos = Array.from({ length: 10 });
  const { data: videos, isLoading, isError } = useGetVideosQuery({}); // API 슬라이스의 훅을 사용합니다.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading videos</div>;
  }
  console.log(videos);

  return (
    <HomeGridContainer>
      {repeatedVideos.map(() => {
        const uniqueKey = uuidv4();
        return (
          <VideoContainer key={uniqueKey} id={uniqueKey}>
            <VideoFrame />
            <VideoInfo title="영상제목" author="영상작성자" view={10} uploadDate={new Date()} />
          </VideoContainer>
        );
      })}
    </HomeGridContainer>
  );
};

export default Home;
