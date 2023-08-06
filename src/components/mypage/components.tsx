/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import theme from '../../styles/theme';
import { ContainerType } from '../../types/type';

const MyPageVideoFrame = () => {
  return (
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
  );
};
const MyPageVideoInfo = () => {
  return (
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
  );
};
export const MyPageVideoComponent = () => {
  return (
    <div
      css={css`
        display: flex;
        gap: 1.6rem;
        margin: 0 1.6rem;
      `}
    >
      <MyPageVideoFrame />
      <MyPageVideoInfo />
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 1.6rem;
        `}
      />
    </div>
  );
};

const UserIcon = () => {
  return (
    <div
      css={css`
        width: 64px;
        height: 64px;
        border-radius: 64px;
        background-color: ${theme.Gray[400]};
      `}
    />
  );
};

export const UserBoxContainer = () => {
  return (
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
      <UserIcon />
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
  );
};

export const TextBoxContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        ${theme.Typography.Body2}
        justify-content: space-between;
        margin: 1.6rem;
        margin-bottom: 0.8rem;
      `}
    >
      {children}
    </div>
  );
};
