/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import theme from '../../styles/theme';

export const ButtonBox = ({ color, text }: { color?: string; text: string }) => {
  return (
    <button
      type="button"
      css={css`
        padding: 1.6rem;
        background-color: ${color};
        border-radius: 0.8rem;
        ${theme.Typography.ButtonText}
      `}
    >
      {text}
    </button>
  );
};

ButtonBox.defaultProps = {
  color: `${theme.Colors.Primary}`,
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
