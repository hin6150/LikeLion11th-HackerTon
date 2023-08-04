/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
import { ButtonBox, InputBox, LoginContainer } from './components';

const SignIn = () => {
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
      <BsArrowLeft
        css={css`
          position: absolute;
          top: 0;
          left: 1.6rem;
          font-size: 3.2rem;
        `}
      />
      <LoginContainer>
        <h2
          css={css`
            ${theme.Typography.Header1}
            margin-bottom: 1.6rem;
          `}
        >
          로그인
        </h2>
        <InputBox placeholder="이메일" />
        <InputBox placeholder="비밀번호" />
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
          <p>로그인 상태 유지</p>
        </div>
        <ButtonBox text="로그인" />
        <ButtonBox color="#f9e000" text="카카오로 로그인" />
        <p
          css={css`
            ${theme.Typography.ButtonText}
            margin-top: 1.6rem;
          `}
        >
          아이디가 없으신가요?
          <Link to="/signup">
            <span
              css={css`
                color: ${theme.Colors.Primary};
              `}
            >
              회원가입하기
            </span>
          </Link>
        </p>
      </LoginContainer>
    </div>
  );
};

export default SignIn;
