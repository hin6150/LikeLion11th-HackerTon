/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import { ButtonBox, InputBox, LoginContainer } from './components';

const SingUp = () => {
  const [sentEmail, setSentEmail] = useState(false);
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      <Link to="/signin">
        <BsArrowLeft
          css={css`
            position: absolute;
            top: 0;
            left: 1.6rem;
            font-size: 3.2rem;
          `}
        />
      </Link>
      <LoginContainer>
        <h2
          css={css`
            ${theme.Typography.Header1}
            margin-bottom: 1.6rem;
          `}
        >
          회원가입
        </h2>
        <InputBox placeholder="이름" />
        <div
          css={css`
            display: flex;
            gap: 0.8rem;
          `}
        >
          <InputBox placeholder="이메일" />
          <button onClick={() => setSentEmail(true)} type="button">
            <ButtonBox text="인증번호 전송" />
          </button>
        </div>
        {sentEmail && (
          <div
            css={css`
              display: flex;
              gap: 0.8rem;
            `}
          >
            <InputBox placeholder="인증번호" />
            <ButtonBox text="인증번호 확인" />
          </div>
        )}
        <InputBox placeholder="비밀번호" />
        <InputBox placeholder="비밀번호 확인" />
        <div
          css={css`
            display: flex;
            ${theme.Typography.Body2}
            gap: 0.4rem;
          `}
        >
          <div
            css={css`
              width: 1.6rem;
              height: 1.6rem;
              border-radius: 6.4rem;
              border: 1px solid ${theme.Gray[950]};
            `}
          />
          <p>개인정보 수집 및 이용에 동의합니다</p>
        </div>
        <ButtonBox text="회원가입" />
      </LoginContainer>
    </div>
  );
};

export default SingUp;
