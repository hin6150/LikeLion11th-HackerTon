/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { BsXLg } from 'react-icons/bs';
import theme from '../../styles/theme';
import { closeModal } from '../../store/modalSlice';

export const ModalContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        position: fixed;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {children}
    </div>
  );
};

export const Overlay = ({ onClick }: { onClick: React.MouseEventHandler<HTMLDivElement> }) => {
  return (
    <div
      role="presentation"
      css={css`
        background-color: rgba(27, 27, 27, 0.8);
        width: 100vw;
        height: 100vh;
      `}
      onClick={onClick}
    />
  );
};

const FilterList = ({ title, describe }: { title: string; describe: string }) => {
  return (
    <div
      css={css`
        position: relative;
        text-align: left;
        margin: 16px;
      `}
    >
      <h2
        css={css`
          ${theme.Typography.Small1}
          margin-bottom: 4px;
        `}
      >
        {title}
      </h2>
      <p
        css={css`
          ${theme.Typography.Small2}
          color: ${theme.Gray[500]};
        `}
      >
        {describe}
      </p>
      <div
        css={css`
          position: absolute;
          right: 0;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid ${theme.Gray[400]};
        `}
      />
    </div>
  );
};

export const FilterTabModal = () => {
  const dispatch = useDispatch();
  return (
    <div
      css={css`
        text-align: left;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        background-color: ${theme.Gray[100]};
        position: fixed;
        top: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          padding: 16px;
          gap: 16px;
          align-items: center;
        `}
      >
        <BsXLg onClick={() => dispatch(closeModal())} />
        <p
          css={css`
            ${theme.Typography.Small1}
          `}
        >
          필터
        </p>
      </div>
      <hr />
      <h2
        css={css`
          ${theme.Typography.Body2}
          margin: 16px;
        `}
      >
        분야별
      </h2>
      <FilterList title="생활지식" describe="실생활에서 사용하는 간단한 지식에 대한 강의에요" />
      <FilterList title="여가" describe="다양한 즐길거리에 대한 정보를 얻을 수 있어요" />
      <FilterList
        title="정부 지원 정보"
        describe="지자체에서 제공하는 혜택 정보를 정리해둔 영상들이 있어요"
      />
      <FilterList
        title="전자 기기"
        describe="스마트폰, 무인주문기계 등 여러 전자기기의 정보를 얻을 수 있어요"
      />
      <FilterList title="자산" describe="부동산, 금융 등의 제테크 정보들을 얻을 수 있어요" />
      <hr />
      <h2
        css={css`
          ${theme.Typography.Body2}
          margin: 16px;
        `}
      >
        연령별
      </h2>
      <FilterList title="10대 이하" describe="" />
      <FilterList title="20대 ~ 40대" describe="" />
      <FilterList title="50대 이상" describe="" />
    </div>
  );
};
