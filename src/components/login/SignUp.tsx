/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import theme from '../../styles/theme';
import { ButtonBox, InputBox, LoginContainer, LoginLayout } from './components';
import { setUser } from '../../store/userSlice';

const SingUp = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <Link to="/signin">
        <BsArrowLeft
          css={css`
            position: absolute;
            top: 0.8rem;
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
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 0.8rem;
          `}
        >
          <InputBox placeholder="이메일" />
          <ButtonBox text="인증번호 전송" onClick={() => setSentEmail(true)} />
        </div>

        {sentEmail && (
          <div
            css={css`
              display: grid;
              grid-template-columns: 3fr 1fr;
              gap: 0.8rem;
            `}
          >
            <InputBox placeholder="인증번호" />
            <ButtonBox text="인증번호 확인" />
          </div>
        )}

        <InputBox placeholder="비밀번호" />
        <InputBox placeholder="비밀번호 확인" />

        <label
          htmlFor="policy"
          css={css`
            display: flex;
            ${theme.Typography.Body2}
            gap: 0.4rem;
          `}
        >
          <input
            id="policy"
            type="checkbox"
            css={css`
              width: 1.6rem;
              height: 1.6rem;
              /* border-radius: 6.4rem; */
              border: 1px solid ${theme.Gray[950]};
            `}
          />
          <p>개인정보 수집 및 이용에 동의합니다.</p>
        </label>

        <ButtonBox
          text="회원가입"
          onClick={() => {
            dispatch(setUser({ user: 'test0001', token: 'jwt' }));
            navigate(`/mypage/test0001`);
          }}
        />
      </LoginContainer>
    </LoginLayout>
  );
};

export default SingUp;
