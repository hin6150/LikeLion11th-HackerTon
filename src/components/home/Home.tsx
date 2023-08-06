/** @jsxImportSource @emotion/react */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';

const Home = () => {
  const repeatedVideos = Array.from({ length: 10 });

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
