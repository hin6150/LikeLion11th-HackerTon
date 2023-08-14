/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import theme from '../../styles/theme';
import { ChatBox, ChatHistory, ChatImageBox, ChatInputContainer } from './components';
import { usePostChatMutation } from '../../store/memberSlice';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<
    Array<{ type: 'gpt' | 'user'; message: string; video?: [] }>
  >([
    {
      type: 'gpt',
      message:
        '안녕하세요 당신의 검색을 도와드리는 000입니다.\n현재는 50자 이내로 답변하고 있습니다.',
    },
  ]);
  const [postChat, { isLoading, isError }] = usePostChatMutation(); // POST 요청 훅

  useEffect(() => {
    if (isError) {
      alert('ERROR!');
    }
  }, [isError]);

  const handleSend = async () => {
    if (message === '') return;

    setMessageList((prevData) => [
      ...prevData,
      { type: 'user', message }, // 새로운 데이터를 추가하는 방식으로 변경
    ]);
    setMessage('');
    try {
      const result = await postChat(message); // POST 요청 보내기

      if ('data' in result) {
        const responseData = result.data;
        const transformedMessage = responseData.replace(/\\n/g, '\n').replace(/\./g, '.\n'); // .을 .\n으로 바꿈
        console.log('요청성공!', responseData);
        setMessageList((prevData) => [
          ...prevData,
          { type: 'gpt', message: transformedMessage, video: responseData.recommendVideo },
        ]);
      } else if ('error' in result) {
        console.log('요청실패!', result);
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
      >
        {messageList.map((data) => {
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
            value={message}
            onChange={(e: any) => {
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyPress}
          />
          {!isLoading ? (
            <BsSend
              css={css`
                font-size: 3.2rem;
                @media screen and (min-width: 1366px) {
                  font-size: 4.8rem;
                }
              `}
              onClick={handleSend}
            />
          ) : (
            <p>Loading</p>
          )}
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
