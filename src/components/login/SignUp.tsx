/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Article,
  ButtonBox,
  CheckBox,
  ErrorDescription,
  GridBox,
  InputBoxForm,
  LoginContainer,
  LoginTitle,
} from './components';
import { useLoginMutation, useMailMutation, useSignUpMutation } from '../../store/memberApi';
import { setUser } from '../../store/userSlice';
import { setCookie } from '../../store/cookie';

const SingUp = () => {
  const [sentEmail, setSentEmail] = useState<boolean | null>(null);
  const [certificationNumber, setCertificationNumber] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { errors },
    formState,
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postSingUp] = useSignUpMutation();
  const [postLogin] = useLoginMutation();
  const [postMail, { isLoading: isLoadingMail }] = useMailMutation();

  const startTimer = ({ min }: { min: number }) => {
    setTimeRemaining(min * 60); // 5분을 초 단위로 설정 (5 * 60)
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // 1초마다 타이머 갱신

    setTimeout(() => {
      clearInterval(timerInterval); // 타이머 종료
      setTimeRemaining(0);
    }, min * 60 * 1000); // 1분 후 타이머 종료 (1 * 60 * 1000)
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes === 0 ? '' : `${minutes}분`} ${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}초`;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (sentEmail === null) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    const response = await postSingUp({
      username: data.email,
      name: data.name,
      password: data.password,
      nickname: data.nickname,
    });

    if ('data' in response) {
      const loginData = await postLogin({
        username: data.email,
        password: data.password,
      }).unwrap();

      const { accessToken, refreshToken } = loginData;

      if (refreshToken) {
        setCookie('refreshToken', refreshToken, {
          path: '/',
          // secure: true, https 서버 필요
          // httpOnly: true, header에만 전송 가능
          expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2주 후의 밀리초(ms) 값
        });
        dispatch(setUser({ accessToken }));
        navigate(-1);
      }
    } else if ('error' in response) {
      console.log(response.error);
    }
  };

  const handleMail = async () => {
    if (timeRemaining > 0) {
      alert(`${formatTime(timeRemaining)} 후 재전송 해주세요.`);
      return;
    }
    const email = getValues('email');
    const response = await postMail({ email }).unwrap();
    const { randomCode } = response;
    setCertificationNumber(randomCode);
    setSentEmail(true);
    startTimer({ min: 1 });
  };

  const handleCheckMail = () => {
    const certification = getValues('certification');
    console.log('input:', certification);
    console.log('number:', certificationNumber);
    if (certification === certificationNumber) {
      setSentEmail(false);
    } else {
      setError('certification', { type: 'validate', message: '올바르지 않은 인증번호 입니다.' });
    }
  };

  const validateVerifyPassword = (value: string) => {
    const password = watch('password');
    return value === password || '비밀번호가 다릅니다.';
  };

  return (
    <div
      css={css`
        overflow: scroll;
      `}
    >
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
            gap: 0.8rem;
            width: 50%;
            min-width: 30rem;
          `}
        >
          <LoginTitle title="회원가입" />

          <Article>
            <InputBoxForm
              placeholder="이름을 입력해 주세요."
              register={register('name', {
                required: '이름을 입력해주세요',
              })}
            />
            {(errors?.name || !getValues('name')) && (
              <ErrorDescription text={errors?.name?.message} />
            )}
          </Article>

          <Article>
            <InputBoxForm
              placeholder="별명(닉네임)을 입력해 주세요."
              register={register('nickname', {
                required: '별명(닉네임)을 입력해주세요',
              })}
            />
            {(errors?.name || !getValues('nickname')) && (
              <ErrorDescription text={errors?.nickname?.message} />
            )}
          </Article>

          <Article>
            <GridBox>
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
              <ButtonBox
                text={
                  isLoadingMail
                    ? '전송 중 . . .'
                    : `${sentEmail ? '인증번호 재전송' : '인증번호 전송'}`
                }
                onClick={handleMail}
                disabled={!!errors.email || !getValues('email') || isLoadingMail}
              />
            </GridBox>

            {(errors?.email || !getValues('email')) && (
              <ErrorDescription text={errors?.email?.message} />
            )}
          </Article>

          {sentEmail && (
            <Article>
              <GridBox>
                <InputBoxForm
                  placeholder="인증번호를 입력해주세요"
                  register={register('certification', {
                    required: '인증번호를 입력해주세요',
                    pattern: { value: /^\d{6}$/, message: '올바른 형식으로 입력해주세요' },
                  })}
                />
                <ButtonBox
                  text="인증번호 확인"
                  onClick={handleCheckMail}
                  disabled={!!errors.certification || !watch('certification')}
                />
              </GridBox>
              {(errors?.certification || !getValues('certification')) && (
                <ErrorDescription text={errors?.certification?.message} />
              )}
            </Article>
          )}
          <Article>
            <InputBoxForm
              type="password"
              placeholder="비밀번호를 입력해주세요"
              register={register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: { value: 8, message: '8자리 이상 입력해주세요' },
              })}
            />
            {(errors?.password || !getValues('password')) && (
              <ErrorDescription text={errors?.password?.message} />
            )}
          </Article>

          <Article>
            <InputBoxForm
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              register={register('verifyPassword', {
                required: '비밀번호를 한번 더 입력해주세요',
                validate: validateVerifyPassword,
              })}
            />
            {(errors?.verifyPassword || !getValues('verifyPassword')) && (
              <ErrorDescription text={errors?.verifyPassword?.message} />
            )}
          </Article>

          <CheckBox id="policy" text="개인정보 수집 및 이용에 동의합니다." />
          <ButtonBox text="회원가입" submit disabled={formState.isSubmitting} />
        </form>
      </LoginContainer>
    </div>
  );
};

export default SingUp;
