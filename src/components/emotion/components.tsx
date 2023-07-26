/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import theme from '../../styles/theme';

export const Header = () => {
  return (
    <div
      css={css`
        width: 100%;
        background-color: ${theme.Gray[50]};
      `}
    >
      Header
    </div>
  );
};

export const Footer = () => {
  return (
    <div
      css={css`
        width: 100%;
        background-color: ${theme.Gray[50]};
      `}
    >
      Footer
    </div>
  );
};
