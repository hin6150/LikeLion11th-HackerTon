/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { UseFormRegisterReturn } from 'react-hook-form';
import theme from '../../styles/theme';
import { ContainerType } from '../../types/type';

export const LoginContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        overflow: scroll;
        position: relative;
        display: flex;
      `}
    >
      <div
        css={css`
          width: 100%;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 9.6rem;
          @media screen and (min-width: 1366px) {
            padding-bottom: 0;
          }
        `}
      >
        {children}
      </div>
    </div>
  );
};

export const ButtonBox = ({
  color,
  textColor,
  text,
  submit,
  onClick,
  disabled,
}: {
  color?: string;
  textColor?: string;
  text: string;
  submit?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      css={css`
        width: 100%;
        padding: 1.6rem;
        background-color: ${disabled ? theme.Gray[400] : color};
        border-radius: 0.8rem;
        ${theme.Typography.ButtonText}
        color: ${textColor};
      `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

ButtonBox.defaultProps = {
  color: `${theme.Colors.Primary}`,
  textColor: `${theme.Gray[50]}`,
  submit: false,
  disabled: false,
  onClick: () => {},
};

export const InputBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <input
      placeholder={placeholder}
      css={css`
        width: 100%;
        padding: 1.6rem;
        ${theme.Typography.Body2}
        background-color: ${theme.Gray[100]};
        border-radius: 0.8rem;
      `}
    />
  );
};

export const InputBoxForm = ({
  placeholder,
  register,
  type,
}: {
  placeholder: string;
  type?: string;
  register: UseFormRegisterReturn;
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      css={css`
        width: 100%;
        padding: 1.6rem;
        ${theme.Typography.Body2}
        background-color: ${theme.Gray[50]};
        border-radius: 0.8rem;
        box-sizing: border-box;
        border: 2px solid ${theme.Gray[50]};
        transition: border-color 0.3s;
        &:focus {
          border: 2px solid ${theme.Colors.Primary};
        }
      `}
      name={register.name}
      ref={register.ref}
      onChange={register.onChange}
    />
  );
};
InputBoxForm.defaultProps = { type: 'text' };

export const ErrorDescription = ({ text, category }: any) => {
  return (
    <p
      css={css`
        ${theme.Typography.PreTitle}
        color: red;
        text-align: left;
        margin-left: ${category ? 0 : 1.6}rem;
        margin-bottom: 0.8rem;
      `}
    >
      {text}
    </p>
  );
};

export const CheckBox = ({ id, text }: { id: string; text: string }) => {
  return (
    <label
      htmlFor={id}
      css={css`
        display: flex;
        ${theme.Typography.Body2}
        gap: 0.4rem;
      `}
    >
      <input
        id={id}
        type="checkbox"
        css={css`
          width: 1.6rem;
          height: 1.6rem;
          border: 1px solid ${theme.Gray[950]};
        `}
      />
      <p>{text}</p>
    </label>
  );
};

export const LoginTitle = ({ title }: { title: string }) => {
  return (
    <h2
      css={css`
        ${theme.Typography.Header1}
        margin-bottom: 1.6rem;
      `}
    >
      {title}
    </h2>
  );
};

export const LoginToRegister = () => {
  return (
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
            margin-left: 0.8rem;
          `}
        >
          회원가입하기
        </span>
      </Link>
    </p>
  );
};

export const Article = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
      `}
    >
      {children}
    </div>
  );
};

export const GridBox = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 0.8rem;
      `}
    >
      {children}
    </div>
  );
};
