/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import { ContainerType, DataType } from '../../types/type';

export const VideoContainer = ({ children, id }: { children: ReactNode; id: number }) => {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        margin-bottom: 1.6rem;
      `}
      onClick={() => {
        navigate(`/home/${id}`);
      }}
      role="presentation"
    >
      {children}
    </div>
  );
};

export const VideoInfo = ({ data }: { data: DataType }) => {
  const navigate = useNavigate();

  // 현재 시간을 Date 객체로 얻기
  const currentTime = new Date();

  // 두 시간 객체의 차이 계산 (밀리초 단위)
  const timeDifference = currentTime.getTime() - new Date().getTime();

  // 차이를 원하는 형식으로 변환 (예시: "2일 3시간 45분 전")
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const timeDifferenceText = `${daysDifference > 0 ? `${daysDifference}일 ` : ''}
${hoursDifference > 0 ? `${hoursDifference}시간 ` : ''}
${minutesDifference}분 전`;

  const handleProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/mypage/${data.memberId}`);
  };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        gap: 1.6rem;
        padding: 0 0.8rem;
      `}
    >
      <div
        role="presentation"
        css={css`
          width: 4.8rem;
          height: 4.8rem;
          border-radius: 4.8rem;
          background-color: ${theme.Gray[500]};
        `}
        onClick={handleProfile}
      />
      <div
        css={css`
          text-align: left;
        `}
      >
        <h2
          css={css`
            ${theme.Typography.Body2}
          `}
        >
          {data.videoTitle}
        </h2>
        <h3
          role="presentation"
          css={css`
            ${theme.Typography.Small2}
          `}
          onClick={handleProfile}
        >{`${data.writer} · 조회수 ${20}회 · ${timeDifferenceText}`}</h3>
      </div>
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 0.8rem;
          top: 0;
        `}
      />
    </div>
  );
};

export const VideoFrame = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 24rem;
        background-color: ${theme.Gray[400]};
        @media screen and (min-width: 768px) {
          border-radius: 2rem;
        }
      `}
    />
  );
};

export const HomeGridContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.6rem;
        padding-bottom: 0.8rem;
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
      {children}
    </div>
  );
};
