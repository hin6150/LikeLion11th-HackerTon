/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import {
  BsChatDots,
  BsChatDotsFill,
  BsFilter,
  BsHouseDoor,
  BsHouseDoorFill,
  BsPerson,
  BsPersonFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsSearch,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import theme from '../../styles/theme';
import { openModal } from '../../store/modalSlice';

export const Header = () => {
  const dispatch = useDispatch();
  return (
    <div
      css={css`
        width: 100%;
        background-color: ${theme.Gray[50]};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.6rem;
      `}
    >
      <img src="./img/logo.png" alt="logo"></img>
      <div
        css={css`
          display: flex;
          gap: 1.6rem;
        `}
      >
        <BsSearch
          css={css`
            font-size: 2.8rem;
          `}
        />
        <BsFilter
          css={css`
            font-size: 3.2rem;
          `}
          onClick={() => {
            dispatch(openModal({ modalType: 'FilterTabModal' }));
          }}
        />
      </div>
    </div>
  );
};

const FooterIcon = ({
  type,
  page,
}: {
  type: '홈' | '검색' | '업로드' | '마이페이지';
  page: '홈' | '검색' | '업로드' | '마이페이지';
}) => {
  const IconType: Record<string, [ReactNode, ReactNode]> = {
    홈: [<BsHouseDoor />, <BsHouseDoorFill />],
    검색: [<BsChatDots />, <BsChatDotsFill />],
    업로드: [<BsPlusCircle />, <BsPlusCircleFill />],
    마이페이지: [<BsPerson />, <BsPersonFill />],
  };
  const index = type === page ? 1 : 0;
  const selectedIcon = IconType[type][index] || [null, null];
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${index ? theme.Colors.Primary : theme.Gray[950]};
      `}
    >
      <div
        css={css`
          font-size: 32px;
        `}
      >
        {selectedIcon}
      </div>
      <p
        css={css`
          width: 56px;
          ${theme.Typography.Small2};
        `}
      >
        {type}
      </p>
    </div>
  );
};

export const Footer = () => {
  return (
    <div
      css={css`
        position: fixed;
        z-index: 99;
        bottom: 0;
        right: 0;
        width: 100vw;
        background-color: ${theme.Gray[50]};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 32px;
      `}
    >
      <Link to="/">
        <FooterIcon type="홈" page="홈" />
      </Link>
      <Link to="/chat">
        <FooterIcon type="검색" page="홈" />
      </Link>
      <Link to="/upload">
        <FooterIcon type="업로드" page="홈" />
      </Link>
      <Link to="mypage">
        <FooterIcon type="마이페이지" page="홈" />
      </Link>
    </div>
  );
};
