/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  ButtonBox,
  CheckBox,
  InputBoxForm,
  LoginContainer,
  LoginTitle,
  LoginToRegister,
} from './components';
import { useLoginMutation } from '../../store/memberApi';
import { setUser } from '../../store/userSlice';
import { setCookie } from '../../store/cookie';

const SignIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const [postLogin, { isError }] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await postLogin({ username: data.email, password: data.password }).unwrap();

    const { accessToken, refreshToken } = response;

    if (refreshToken) {
      setCookie('refreshToken', refreshToken, {
        path: '/',
        // secure: true, https 서버 필요
        // httpOnly: true, header에만 전송 가능
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2주 후의 밀리초(ms) 값
      });
      // 암호화를 하려면, https://velog.io/@defaultkyle/react-cookie처럼 header에 refreshToken 값을 담아서 보내야함.

      dispatch(setUser({ accessToken }));
    }
  };

  return (
    <LoginContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          width: 50%;
          min-width: 30rem;
        `}
      >
        <LoginTitle title="로그인" />

        <InputBoxForm
          type="email"
          placeholder="이메일을 입력해주세요"
          register={register('email', {
            required: '이메일을 입력해주세요',
          })}
        />
        <InputBoxForm
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register('password', {
            required: '올바른 형식의 이름을 입력해주세요',
          })}
        />
        <CheckBox id="keepLogin" text="로그인 상태 유지" />
        {isError ? <p>올바른 정보를 입력해주세요.</p> : null}

        <ButtonBox text="로그인" />
        <ButtonBox textColor="#3A1D1D" color="#f9e000" text="카카오로 로그인" />
        <LoginToRegister />
      </form>
    </LoginContainer>
  );
};

export default SignIn;
