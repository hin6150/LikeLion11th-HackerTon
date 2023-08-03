/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import theme from '../../styles/theme';

export const VideoContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
      `}
    >
      {children}
    </div>
  );
};
interface VideoInfoType {
  title: string;
  author: string;
  view: number;
  uploadDate: Date;
}
export const VideoInfo = ({ title, author, view, uploadDate }: VideoInfoType) => {
  // 현재 시간을 Date 객체로 얻기
  const currentTime = new Date();

  // 두 시간 객체의 차이 계산 (밀리초 단위)
  const timeDifference = currentTime.getTime() - uploadDate.getTime();

  // 차이를 원하는 형식으로 변환 (예시: "2일 3시간 45분 전")
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const timeDifferenceText = `${daysDifference > 0 ? `${daysDifference}일 ` : ''}
${hoursDifference > 0 ? `${hoursDifference}시간 ` : ''}
${minutesDifference}분 전`;

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        gap: 16px;
        padding: 0 8px;
      `}
    >
      <div
        css={css`
          width: 48px;
          height: 48px;
          border-radius: 48px;
          background-color: ${theme.Gray[500]};
        `}
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
          {title}
        </h2>
        <h3
          css={css`
            ${theme.Typography.Small2}
          `}
        >{`${author} · 조회수 ${view}회 · ${timeDifferenceText}`}</h3>
      </div>
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 8px;
          top: 0;
        `}
      />
    </div>
  );
};
