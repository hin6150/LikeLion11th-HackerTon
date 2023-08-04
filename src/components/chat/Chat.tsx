/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { BsSend } from 'react-icons/bs';
import theme from '../../styles/theme';

const ChatBox = ({ type, children }: { type: 'gpt' | 'user'; children: ReactNode }) => {
  return (
    <div
      css={css`
        background-color: ${type === 'user' ? theme.Colors.Primary : theme.Gray[200]};
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

const ChatImageBox = () => {
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

const Chat = () => {
  return (
    <div
      css={css`
        overflow: scroll;
        height: calc(100vh - 21rem);
      `}
    >
      <div
        css={css`
          margin: 0 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        `}
      >
        <ChatBox type="gpt">
          안녕하세요! 당신의 검색을 도와드리는 OOO 입니다! <br /> 무엇을 찾아보고 싶나요?
        </ChatBox>
        <ChatBox type="user">
          비행기 표 끊고 일본으로 가고 싶은데 어떻게 해야 되는지를 모르겠다.
        </ChatBox>
        <div>
          <ChatBox type="gpt">
            일본으로 비행기 표를 예약하고 여행을 계획하는 것은 간단하지만, 처음에는 혼동스러울 수
            있습니다. 아래는 비행기 표 예약과 여행 계획을 세우는 기본적인 단계들입니다
            <br />
            1. 유효한 여권 확인
            <br />
            2. 여행 날짜와 기간 선정
            <br />
            3. 항공권 예약 및 가격 비교
            <br />
            해당 내용과 관련되어 도움을 줄 수 있는 영상은 다음과 같습니다.
          </ChatBox>
          <ChatImageBox />
        </div>
        <ChatBox type="gpt">
          안녕하세요! 당신의 검색을 도와드리는 OOO 입니다! <br /> 무엇을 찾아보고 싶나요?
        </ChatBox>
        <ChatBox type="gpt">
          안녕하세요! 당신의 검색을 도와드리는 OOO 입니다! <br /> 무엇을 찾아보고 싶나요?
        </ChatBox>
        <ChatBox type="gpt">
          안녕하세요! 당신의 검색을 도와드리는 OOO 입니다! <br /> 무엇을 찾아보고 싶나요?
        </ChatBox>
      </div>
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
        <button
          type="button"
          css={css`
            background-color: ${theme.Gray[100]};
            flex-shrink: 0;
            border-radius: 1.6rem;
            padding: 0.8rem 1.6rem;
            @media screen and (min-width: 1366px) {
              padding: 1.6rem 3.2rem;
              border-radius: 3.2rem;
            }
          `}
        >
          <p>서비스설명</p>
        </button>
        <input
          placeholder="챗봇에게 질문하기"
          css={css`
            background-color: ${theme.Gray[100]};
            border-radius: 1.6rem;
            padding: 0.8rem;
            padding-left: 1.6rem;
            flex: 1;
            &::placeholder {
              color: ${theme.Gray[500]};
            }
            @media screen and (min-width: 1366px) {
              padding: 1.6rem 3.2rem;
              border-radius: 3.2rem;
            }
          `}
        />
        <BsSend
          css={css`
            font-size: 3.2rem;
            @media screen and (min-width: 1366px) {
              font-size: 4.8rem;
            }
          `}
        />
      </div>
    </div>
  );
};

export default Chat;
