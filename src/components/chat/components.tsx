/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import { BsChat } from 'react-icons/bs';
import theme from '../../styles/theme';
import { ContainerType } from '../../types/type';

export const ChatBox = ({ type, children }: { type: 'gpt' | 'user'; children: ReactNode }) => {
  return (
    <div
      css={css`
        background-color: ${type === 'user' ? theme.Colors.Primary : theme.Gray[200]};
        color: ${type === 'user' ? theme.Gray[50] : theme.Gray[950]};
        padding: 1.6rem;
        max-width: 80%;
        text-align: start;
        border-radius: 1.6rem;
        align-self: ${type === 'user' ? 'flex-end' : 'flex-start'};
        ${theme.Typography.Small2}
        @media screen and (min-width: 768px) {
          ${theme.Typography.Body2};
          max-width: 65%;
        }
        @media screen and (min-width: 1366px) {
          border-radius: 3.2rem;
          padding: 1.6rem 3.2rem;
          ${theme.Typography.Body1};
        }
      `}
    >
      <p>{children}</p>
    </div>
  );
};

export const ChatImageBox = () => {
  return (
    <div
      css={css`
        background-color: ${theme.Gray[200]};
        max-width: 80%;
        text-align: start;
        border-radius: 1.6rem;
        ${theme.Typography.PreTitle};
        @media screen and (min-width: 768px) {
          ${theme.Typography.Body2};
          max-width: 65%;
        }
        @media screen and (min-width: 1366px) {
          border-radius: 3.2rem;
          ${theme.Typography.Body1};
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 30vw;
          border-radius: 16px 16px 0px 0px;
          background-color: ${theme.Gray[400]};
        `}
      />
      <p
        css={css`
          padding: 0.8rem 1.6rem;
          @media screen and (min-width: 1366px) {
            padding: 1.6rem 3.2rem;
          }
        `}
      >
        지금 바로 떠나요, 일본 여행 A부터 Z까지
      </p>
    </div>
  );
};

export const ChatInputContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        width: 100%;
        position: fixed;
        bottom: 8rem;
        left: 0;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        padding: 0.8rem 1.6rem;
        ${theme.Typography.Small2}

        @media screen and (min-width: 1366px) {
          bottom: 2.4rem;
          padding-left: 8rem;
          ${theme.Typography.Body1}
        }
      `}
    >
      {children}
    </div>
  );
};

const ChatList = ({ title }: { title: string }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
      `}
    >
      <BsChat />
      <p>{title}</p>
    </div>
  );
};

export const ChatHistory = () => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 0.8rem 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
      `}
    >
      <button
        type="button"
        css={css`
          background-color: ${theme.Gray[200]};
          padding: 0.8rem 1.6rem;
          border-radius: 1.2rem;
          width: 100%;
        `}
      >
        + 새로운 채팅 시작하기
      </button>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <p>이전 7일간 채팅</p>
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        <p>이전 7일간 채팅</p>
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
        <ChatList title="Japan Travel" />
      </div>
    </div>
  );
};
