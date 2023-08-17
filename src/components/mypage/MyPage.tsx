/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import theme from '../../styles/theme';
import { MyPageVideoComponent, TextBoxContainer, UserBoxContainer } from './components';
import { VideoContainer, VideoFrame, VideoInfo } from '../home/components';
import { useGetMyVideosQuery } from '../../store/memberApi';
import { selectUser } from '../../store/userSlice';
import { DataType } from '../../types/type';

const MyPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectUser);

  const { data: videos, isLoading, isError } = useGetMyVideosQuery({ accessToken, memberId });

  const [isWeb, setIsWeb] = useState(window.innerWidth >= 1366);

  useEffect(() => {
    console.log(videos);

    const handleResize = () => {
      setIsWeb(window.innerWidth >= 1366);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate, videos]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading videos</div>;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <UserBoxContainer data={videos.content[0]} />
      <TextBoxContainer>
        <p>업로드한 동영상 강의</p>
        <Link to="/mypage/detail">
          <p
            css={css`
              ${theme.Typography.PreTitle}
              color: ${theme.Colors.Primary};
            `}
          >
            상세보기
          </p>
        </Link>
      </TextBoxContainer>
      {isWeb ? (
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
          {videos.content.map((data: DataType) => {
            const uniqueKey = uuidv4();
            return (
              <VideoContainer key={uniqueKey} id={data.videoId}>
                <VideoFrame />
                <VideoInfo data={data} />
              </VideoContainer>
            );
          })}
        </div>
      ) : (
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
          {videos.content.map((data: DataType) => {
            const uniqueKey = uuidv4();
            return <MyPageVideoComponent data={data} key={uniqueKey} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MyPage;
