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
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.6rem;
        padding-bottom: 8rem;
        @media screen and (min-width: 768px) {
          grid-template-columns: repeat(2, 1fr);
          margin: 1.6rem;
        }
        @media screen and (min-width: 1366px) {
          grid-template-columns: repeat(4, 1fr);
          padding-bottom: 0;
        }
      `}
    >
      {repeatedVideos.map(() => {
        const uniqueKey = uuidv4();
        return (
          <VideoContainer key={uniqueKey} id={uniqueKey}>
            <div
              css={css`
                width: 100%;
                height: 240px;
                background-color: ${theme.Gray[400]};
                @media screen and (min-width: 768px) {
                  border-radius: 2rem;
                }
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
