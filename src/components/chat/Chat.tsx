/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../styles/theme';
import { ChatBox, ChatHistory, ChatImageBox, ChatInputContainer } from './components';
import { usePostChatMutation } from '../../store/memberApi';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<
    Array<{ type: 'gpt' | 'user'; message: string; video?: [] }>
  >([
    {
      type: 'gpt',
      message:
        '안녕하세요 당신의 검색을 도와드리는 디지털 구명보트입니다.\n현재는 50자 이내로 답변하고 있습니다.\n 저는 10개까지 대화를 기억 할 수 있어요!\n 궁금하신 내용이 있으면 무엇이든 물어보세요 ~',
    },
  ]);
  const [postChat, { isLoading, isError }] = usePostChatMutation();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isError) {
      alert('ERROR!');
    }
  }, [isError]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus(); // 자동으로 포커스 주기
    }
  }, [messageList]);

  const handleSend = async () => {
    if (message === '') return;

    setMessageList((prevData) => [...prevData, { type: 'user', message }]);
    setMessage('');

    try {
      const response = await postChat({ chatGptReq: message });

      if ('data' in response) {
        const responseData = response.data;
        const transformedMessage = responseData.content
          .replace(/\\n/g, '\n')
          .replace(/\. /g, '.\n');
        console.log('요청성공!', responseData);
        setMessageList((prevData) => [
          ...prevData,
          { type: 'gpt', message: transformedMessage, video: responseData.recommendVideo },
        ]);
      } else if ('error' in response) {
        console.log('요청실패!', response);
        setMessageList((prevData) => [
          ...prevData,
          { type: 'gpt', message: '에러! 올바르게 입력해주세요.' },
        ]);
      }
    } catch (error) {
      console.error('GPT 요청에 실패했습니다.', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isLoading && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      css={css`
        display: block;
        grid-template-columns: 4fr 1fr;
        @media screen and (min-width: 1366px) {
          display: grid;
        }
      `}
    >
      <div
        css={css`
          position: relative;
          overflow: scroll;
          height: calc(100vh - 21rem);
        `}
        ref={chatContainerRef}
      >
        {messageList.map((data, index) => {
          const uniqueKey = uuidv4();
          return (
            <div
              key={uniqueKey}
              css={css`
                display: flex;
                flex-direction: column;
                margin: 1.6rem;
              `}
            >
              <ChatBox type={data.type}>{data.message}</ChatBox>
              {data.video && data.video.length > 0 ? <ChatImageBox /> : null}
              {(data.video?.length || index !== 0) && data.type === 'gpt' ? (
                <ChatBox type={data.type}>
                  요청하신 내용에 해당하는 해시태그를 가진 동영상이 없어요 !
                </ChatBox>
              ) : null}
            </div>
          );
        })}
        <ChatInputContainer>
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
            서비스설명
          </button>
          <input
            ref={inputRef}
            placeholder={!isLoading ? '챗봇에게 질문하기' : '답변 중 입니다 ...'}
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
            value={message}
            onChange={(e: any) => {
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <BsSend
            css={css`
              font-size: 3.2rem;
              @media screen and (min-width: 1366px) {
                font-size: 4.8rem;
              }
            `}
            onClick={handleSend}
          />
        </ChatInputContainer>
      </div>
      <div
        css={css`
          display: none;
          @media screen and (min-width: 1366px) {
            display: block;
          }
        `}
      >
        <ChatHistory />
      </div>
    </div>
  );
};

export default Chat;
