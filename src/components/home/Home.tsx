/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';
import { VideoContainer, VideoInfo } from './components';
import theme from '../../styles/theme';

const Home = () => {
  const repeatedVideos = Array.from({ length: 10 });

  return (
    <div
      css={css`
        margin-bottom: 80px;
      `}
    >
      {repeatedVideos.map(() => {
        const uniqueKey = uuidv4();
        return (
          <VideoContainer key={uniqueKey}>
            <div
              css={css`
                width: 100%;
                height: 240px;
                background-color: ${theme.Gray[400]};
              `}
            />
            <VideoInfo title="영상제목" author="영상작성자" view={10} uploadDate={new Date()} />
          </VideoContainer>
        );
      })}
    </div>
  );
};

export default Home;
