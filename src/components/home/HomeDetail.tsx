/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../styles/theme';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';

const HomeDetail = () => {
  const repeatedVideos = Array.from({ length: 10 });

  return (
    <div
      css={css`
        text-align: left;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 50vw;
          background-color: ${theme.Gray[300]};
          @media screen and (min-width: 768px) {
            height: 40vw;
          }
        `}
      />
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
          영상 제목
        </h2>
        <div
          css={css`
            display: flex;
            ${theme.Typography.Body2}
            color: ${theme.Gray[500]};
          `}
        >
          <p>조회수 · 시간</p>
          <p>...더보기</p>
        </div>

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
            <p>올린 사람 정보</p>
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
    </div>
  );
};

export default HomeDetail;
