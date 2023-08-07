/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import theme from '../../styles/theme';
import { ContainerType } from '../../types/type';

export const LoginLayout = ({ children }: ContainerType) => {
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
      type="button"
      css={css`
        width: 100%;
        padding: 1.6rem;
        background-color: ${color};
        border-radius: 0.8rem;
        ${theme.Typography.ButtonText}
        color: ${textColor}
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

export const LoginContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.6rem;
        width: 100%;
        padding: 0 1.6rem;
        @media screen and (min-width: 768px) {
          width: 80%;
        }
        @media screen and (min-width: 1366px) {
          width: 50%;
        }
      `}
    >
      {children}
    </div>
  );
};
