/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ButtonBox, CheckBox, InputBoxForm, LoginContainer, LoginTitle } from './components';
import { useLoginMutation, useSignUpMutation } from '../../store/memberSlice';
import { setUser } from '../../store/userSlice';

const SingUp = () => {
  const [sentEmail, setSentEmail] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postSingUp] = useSignUpMutation();
  const [postLogin] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await postSingUp({
      username: data.email,
      password: data.password,
      nickname: data.nickname,
    });

    if ('data' in response) {
      const loginData = await postLogin({
        username: data.email,
        password: data.password,
      });

      if ('data' in loginData) {
        const token = loginData.data;
        dispatch(setUser({ accessToken: token.accessToken, refreshToken: token.refreshToken }));
        navigate('/home');
      } else if ('error' in loginData) {
        console.log(loginData.error);
      }
    } else if ('error' in response) {
      console.log(response.error);
    }
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          width: 50%;
          min-width: 30rem;
        `}
      >
        <LoginTitle title="회원가입" />
        <InputBoxForm
          placeholder="이름을 입력해 주세요."
          register={register('name', {
            required: '이름을 입력해주세요',
          })}
        />
        <InputBoxForm
          placeholder="별명(닉네임)을 입력해 주세요."
          register={register('nickname', {
            required: '별명(닉네임)을 입력해주세요',
          })}
        />
        <div
          css={css`
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 0.8rem;
          `}
        >
          <InputBoxForm
            type="email"
            placeholder="이메일을 입력해주세요"
            register={register('email', {
              required: '이메일을 입력해주세요',
            })}
          />
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
            <InputBoxForm
              placeholder="인증번호를 입력해주세요"
              register={register('certification', {
                required: '인증번호를 입력해주세요',
              })}
            />
            <ButtonBox text="인증번호 확인" />
          </div>
        )}
        <InputBoxForm
          type="password"
          placeholder="비밀번호를 입력해주세요"
          register={register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        <InputBoxForm
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          register={register('verifyPassword', {
            required: '비밀번호를 한번 더 입력해주세요',
          })}
        />
        <CheckBox id="policy" text="개인정보 수집 및 이용에 동의합니다." />
        <ButtonBox text="회원가입" />
      </form>
    </LoginContainer>
  );
};

export default SingUp;
