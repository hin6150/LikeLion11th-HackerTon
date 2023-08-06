/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import theme from '../../styles/theme';
import { MyPageVideoComponent, TextBoxContainer, UserBoxContainer } from './components';
import { VideoContainer, VideoFrame, VideoInfo } from '../home/components';
import { selectUser } from '../../store/userSlice';

const MyPage = () => {
  const { token, user } = useSelector(selectUser);
  const navigate = useNavigate();

  const [isWeb, setIsWeb] = useState(window.innerWidth >= 1366);
  const repeatedVideos = Array.from({ length: 20 });

  useEffect(() => {
    if (token === '') {
      navigate('/signin');
    } else {
      navigate(`/mypage/${user}`);
    }
    const handleResize = () => {
      setIsWeb(window.innerWidth >= 1366);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <UserBoxContainer />
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
          {repeatedVideos.map(() => {
            const uniqueKey = uuidv4();
            return (
              <VideoContainer key={uniqueKey} id={uniqueKey}>
                <VideoFrame />
                <VideoInfo title="영상제목" author="영상작성자" view={10} uploadDate={new Date()} />
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
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
          <MyPageVideoComponent />
        </div>
      )}
    </div>
  );
};

export default MyPage;
