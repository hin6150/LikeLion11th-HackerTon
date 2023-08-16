/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  Article,
  ButtonBox,
  CheckBox,
  ErrorDescription,
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [postLogin, { isError, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      setError('password', { message: '올바른 회원정보를 입력해주세요.' });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginContainer>
      <BsArrowLeft
        css={css`
          position: absolute;
          top: 0.8rem;
          left: 1.6rem;
          font-size: 3.2rem;
        `}
        onClick={() => {
          navigate(-1);
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          width: 50%;
          min-width: 30rem;
        `}
      >
        <LoginTitle title="로그인" />

        <Article>
          <InputBoxForm
            placeholder="이메일을 입력해주세요"
            register={register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && <ErrorDescription text={errors.email?.message} />}
        </Article>

        <Article>
          <InputBoxForm
            type="password"
            placeholder="비밀번호를 입력해주세요"
            register={register('password', {
              required: '비밀번호를 입력해주세요',
            })}
          />
          {errors.password && <ErrorDescription text={errors.password?.message} />}
        </Article>

        <CheckBox id="keepLogin" text="로그인 상태 유지" />

        <ButtonBox text={isLoading ? '로그인 중' : '로그인'} submit disabled={isLoading} />
        <ButtonBox textColor="#3A1D1D" color="#f9e000" text="카카오로 로그인" />
        <LoginToRegister />
      </form>
    </LoginContainer>
  );
};

export default SignIn;
