/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { UseFormRegisterReturn } from 'react-hook-form';
import theme from '../../styles/theme';
import { ContainerType } from '../../types/type';

export const LoginContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      `}
    >
      {children}
    </div>
  );
};

export const ButtonBox = ({
  color,
  textColor,
  text,
  onClick,
}: {
  color?: string;
  textColor?: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      css={css`
        width: 100%;
        padding: 1.6rem;
        background-color: ${color};
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
        background-color: ${theme.Gray[100]};
        border-radius: 0.8rem;
      `}
      name={register.name}
      ref={register.ref}
      onChange={register.onChange}
    />
  );
};
InputBoxForm.defaultProps = { type: 'text' };

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
