/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, useState } from 'react';
import {
  BsChatDots,
  BsChatDotsFill,
  BsFilter,
  BsHouseDoor,
  BsHouseDoorFill,
  BsList,
  BsPerson,
  BsPersonFill,
  BsPlusCircle,
  BsPlusCircleFill,
  BsSearch,
  BsSoundwave,
} from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import theme from '../../styles/theme';
import { openModal } from '../../store/modalSlice';
import { ContainerType } from '../../types/type';

const HeaderContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100%;
        background-color: ${theme.Gray[50]};
        z-index: 99;
        @media screen and (min-width: 1366px) {
          margin-left: -8rem;
        }
      `}
    >
      {children}
    </div>
  );
};
const HeaderMobile = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.6rem;

        @media screen and (min-width: 1366px) {
          display: none;
        }
      `}
    >
      {children}
    </div>
  );
};
const HeaderWeb = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        height: 8rem;
        display: none;
        padding: 1.6rem 2.4rem;
        justify-content: space-between;
        @media screen and (min-width: 1366px) {
          display: flex;
        }
      `}
    >
      {children}
    </div>
  );
};
const HeaderWebInputBox = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (!inputValue) return;
    navigate(`/home/search/${inputValue}`);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
        margin: 0 48px;
      `}
    >
      <input
        placeholder="검색어를 입력하세요."
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        css={css`
          width: 100%;
          height: 48px;
          border-radius: 24px;
          background-color: ${theme.Gray[200]};
          padding-left: 24px;
        `}
      />
      <BsSearch
        role="presentation"
        onClick={handleSearch}
        css={css`
          font-size: 28px;
          right: 80px;
          position: absolute;
        `}
      />
      <BsSoundwave
        css={css`
          font-size: 32px;
          margin-left: 24px;
        `}
      />
    </div>
  );
};
const UserIcon = () => {
  return (
    <div
      css={css`
        width: 48px;
        height: 48px;
        border-radius: 48px;
        background-color: ${theme.Gray[400]};
      `}
    />
  );
};

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPathname = location.pathname;

  return (
    <HeaderContainer>
      <HeaderMobile>
        <Link to="/home">
          <img src="/logo.png" alt="logo" width="144px" />
        </Link>
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
            onClick={() => {
              dispatch(openModal({ modalType: 'SearchTabModal' }));
            }}
          />
          <BsFilter
            css={css`
              font-size: 3.2rem;
              display: ${currentPathname === '/home' ? 'block' : 'none'};
            `}
            onClick={() => {
              dispatch(openModal({ modalType: 'FilterTabModal' }));
            }}
          />
          <BsList
            css={css`
              font-size: 3.2rem;
              display: ${currentPathname === '/chat' ? 'block' : 'none'};
            `}
            onClick={() => {
              dispatch(openModal({ modalType: 'HistoryTabModal' }));
            }}
          />
        </div>
      </HeaderMobile>

      <HeaderWeb>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 24px;
          `}
        >
          <BsFilter
            css={css`
              font-size: 3.2rem;
              display: ${currentPathname === '/home' ? 'block' : 'none'};
            `}
            onClick={() => {
              dispatch(openModal({ modalType: 'FilterTabModal' }));
            }}
          />
          <Link to="/home">
            <img src="/logo.png" alt="logo" width="178px" />
          </Link>
        </div>

        <HeaderWebInputBox />

        <Link to="/mypage">
          <UserIcon />
        </Link>
      </HeaderWeb>
    </HeaderContainer>
  );
};

const FooterIcon = ({ type }: { type: 'home' | 'chat' | 'upload' | 'mypage' }) => {
  const location = useLocation();
  const currentPathname = location.pathname.includes(type);

  const IconType: Record<string, [ReactNode, ReactNode]> = {
    home: [<BsHouseDoor />, <BsHouseDoorFill />],
    chat: [<BsChatDots />, <BsChatDotsFill />],
    upload: [<BsPlusCircle />, <BsPlusCircleFill />],
    mypage: [<BsPerson />, <BsPersonFill />],
  };

  const selectedIcon = IconType[type][+currentPathname] || [null, null];

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: ${currentPathname ? theme.Colors.Primary : theme.Gray[950]};
        font-size: 32px;
      `}
    >
      <div>{selectedIcon}</div>
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
        @media screen and (min-width: 768px) {
          justify-content: center;
          gap: 6.4rem;
        }
        @media screen and (min-width: 1366px) {
          margin-top: 8rem;
          padding-top: 1.6rem;
          flex-direction: column;
          left: 0;
          top: 0;
          width: 8rem;
          height: 100vh;
          justify-content: start;
        }
      `}
    >
      <Link to="/home">
        <FooterIcon type="home" />
      </Link>
      <Link to="/chat">
        <FooterIcon type="chat" />
      </Link>
      <Link to="/upload">
        <FooterIcon type="upload" />
      </Link>
      <Link to="/mypage">
        <FooterIcon type="mypage" />
      </Link>
    </div>
  );
};
