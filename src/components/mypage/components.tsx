/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import theme from '../../styles/theme';

export const MyPageVideoComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.6rem;
        margin: 0 1.6rem;
      `}
    >
      <div
        css={css`
          width: 50%;
          height: 120px;
          border-radius: 2rem;
          background-color: ${theme.Gray[400]};
          position: relative;
          @media screen and (min-width: 768px) {
            width: 240px;
          }
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          ${theme.Typography.Body2}
        `}
      >
        <p>동영상 제목</p>
        <p>조회수: 0회</p>
        <p>업로드 날짜</p>
      </div>
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 1.6rem;
        `}
      />
    </div>
  );
};
