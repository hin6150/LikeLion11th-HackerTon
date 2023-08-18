/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import theme from '../../styles/theme';
import { ContainerType, DataType } from '../../types/type';
import { logout } from '../../store/userSlice';
import { setCookie } from '../../store/cookie';

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
const MyPageVideoInfo = ({ data }: { data: DataType }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        text-align: left;
        ${theme.Typography.Body2}
      `}
    >
      <p>{data.videoTitle}</p>
      <p>조회수: 0회</p>
      <p>업로드 날짜</p>
    </div>
  );
};
export const MyPageVideoComponent = ({ data }: { data: DataType }) => {
  const navigate = useNavigate();
  return (
    <div
      role="presentation"
      css={css`
        display: flex;
        gap: 1.6rem;
        margin: 0 1.6rem;
      `}
      onClick={() => {
        navigate(`/home/${data.videoId}`);
      }}
    >
      <MyPageVideoFrame />
      <MyPageVideoInfo data={data} />
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

export const UserBoxContainer = ({ data }: { data: DataType }) => {
  const dispatch = useDispatch();
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
        <p>{data.nickname}</p>
        {/* <p>이메일</p>
        <p>{data.nickname}</p> */}
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
      <p
        role="presentation"
        css={css`
          position: absolute;
          right: 1.6rem;
          bottom: 1.6rem;
          ${theme.Typography.PreTitle};
          color: red;
        `}
        onClick={() => {
          dispatch(logout());
          setCookie('refreshToken', '');
        }}
      >
        로그아웃
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

export const UserDetailVideoList = () => {
  return (
    <>
      <div
        css={css`
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          text-align: left;
          p:last-child {
            display: none;
          }
          @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr 1fr 1fr;
            p:last-child {
              display: block;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 1.6rem;
            align-items: start;
          `}
        >
          <input
            type="checkbox"
            css={css`
              display: none;
              @media screen and (min-width: 768px) {
                display: block;
              }
            `}
          />
          <div
            css={css`
              background-color: ${theme.Gray[300]};
              width: 8rem;
              height: 6rem;
              border-radius: 2rem;
              @media screen and (min-width: 768px) {
                width: 12rem;
                height: 8rem;
              }
            `}
          />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
            `}
          >
            <h1
              css={css`
                ${theme.Typography.Small1}
              `}
            >
              동영상 제목
            </h1>
            <p
              css={css`
                ${theme.Typography.Small3}
              `}
            >
              동영상 설명
            </p>
            <div
              css={css`
                display: none;
                @media screen and (min-width: 768px) {
                  display: block;
                  font-size: 24px;
                  display: flex;
                  gap: 1.6rem;
                }
              `}
            >
              <BsPencil />
              <BsTrash />
            </div>
          </div>
        </div>
        <p>없음</p>
        <p>불가능</p>
        <p>3</p>
      </div>
      <hr />
    </>
  );
};
