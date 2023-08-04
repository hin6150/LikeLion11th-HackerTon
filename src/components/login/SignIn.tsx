import { css } from '@emotion/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import theme from '../../styles/theme';

const SignIn = () => {
  return (
    <div>
      <BsArrowLeft
        css={css`
          position: absolute;
          top: 1.6rem;
          left: 1.6rem;
          font-size: 3.2rem;
        `}
      />
      <div>
        <h2
          css={css`
            ${theme.Typography.Header1}
          `}
        >
          로그인
        </h2>
        <input />
        <input />
        <div>
          <div></div>
          <p>로그인 상태 유지</p>
        </div>
        <button type="button">로그인</button>
        <button type="button">카카오로 로그인</button>
        <p>
          아이디가 없으신가요? <span>회원가입하기</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
