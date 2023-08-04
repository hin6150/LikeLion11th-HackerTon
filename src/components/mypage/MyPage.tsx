/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../styles/theme';
import { MyPageVideoComponent } from './components';
import { VideoContainer, VideoInfo } from '../home/components';

const MyPage = () => {
  const [isWeb, setIsWeb] = useState(window.innerWidth <= 1366);
  const repeatedVideos = Array.from({ length: 20 });

  useEffect(() => {
    const handleResize = () => {
      setIsWeb(window.innerWidth <= 1366);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <div
        css={css`
          height: 9.6rem;
          border-radius: 2rem;
          background-color: ${theme.Gray[100]};
          display: flex;
          padding: 1.6rem;
          align-items: start;
          position: relative;
          gap: 1.6rem;
        `}
      >
        <div
          css={css`
            width: 64px;
            height: 64px;
            border-radius: 64px;
            background-color: ${theme.Gray[400]};
          `}
        />
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 2fr;
            text-align: left;
            gap: 0.8rem;
            ${theme.Typography.Body2};
          `}
        >
          <p>이름</p>
          <p>홍길동</p>
          <p>이메일</p>
          <p>example@email.com</p>
        </div>
        <p
          css={css`
            position: absolute;
            right: 1.6rem;
            top: 1.6rem;
            ${theme.Typography.PreTitle};
            color: ${theme.Colors.Primary};
          `}
        >
          회원정보 변경하기
        </p>
      </div>
      <div
        css={css`
          display: flex;
          ${theme.Typography.Body2}
          justify-content: space-between;
          margin: 1.6rem;
          margin-bottom: 0.8rem;
        `}
      >
        <p>업로드한 동영상 강의</p>
        <p
          css={css`
            ${theme.Typography.PreTitle}
            color: ${theme.Colors.Primary};
          `}
        >
          상세보기
        </p>
      </div>
      {isWeb ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
            flex: 1;
            overflow: scroll;
            margin-bottom: 8rem;
          `}
        >
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
        </div>
      ) : (
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 1.6rem;
            grid-template-columns: repeat(4, 1fr);
            margin: 1.6rem;
            flex: 1;
            overflow: scroll;
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
      )}
    </div>
  );
};

export default MyPage;
