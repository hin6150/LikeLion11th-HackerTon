/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ButtonBox, CheckBox, InputBox, LoginContainer, LoginTitle } from './components';
import { setUser } from '../../store/userSlice';

const SingUp = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <LoginContainer>
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
      <form>
        <LoginTitle title="회원가입" />
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

        <CheckBox id="policy" text="개인정보 수집 및 이용에 동의합니다." />

        <ButtonBox
          text="회원가입"
          onClick={() => {
            dispatch(setUser({ user: 'test0001', token: 'jwt' }));
            navigate(`/mypage/test0001`);
          }}
        />
      </form>
    </LoginContainer>
  );
};

export default SingUp;
