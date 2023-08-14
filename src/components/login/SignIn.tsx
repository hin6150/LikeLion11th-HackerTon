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
import { useLoginMutation } from '../../store/memberSlice';
import { setUser } from '../../store/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [postLogin] = useLoginMutation();
  // , { isLoading, isError, isSuccess }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const response = await postLogin({ username: data.email, password: data.password });
    console.log(response);

    if ('data' in response) {
      dispatch(setUser({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    } else if ('error' in response) {
      console.log(response.error);
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

        <ButtonBox text="로그인" />
        <ButtonBox textColor="#3A1D1D" color="#f9e000" text="카카오로 로그인" />
        <LoginToRegister />
      </form>
    </LoginContainer>
  );
};

export default SignIn;
