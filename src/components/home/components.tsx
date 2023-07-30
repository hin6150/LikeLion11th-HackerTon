/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';
import { BsThreeDotsVertical, BsXLg } from 'react-icons/bs';
import theme from '../../styles/theme';

export const VideoContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 16px;
      `}
    >
      {children}
    </div>
  );
};
interface VideoInfoType {
  title: string;
  author: string;
  view: number;
  uploadDate: Date;
}
export const VideoInfo = ({ title, author, view, uploadDate }: VideoInfoType) => {
  // 현재 시간을 Date 객체로 얻기
  const currentTime = new Date();

  // 두 시간 객체의 차이 계산 (밀리초 단위)
  const timeDifference = currentTime.getTime() - uploadDate.getTime();

  // 차이를 원하는 형식으로 변환 (예시: "2일 3시간 45분 전")
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const timeDifferenceText = `${daysDifference > 0 ? `${daysDifference}일 ` : ''}
${hoursDifference > 0 ? `${hoursDifference}시간 ` : ''}
${minutesDifference}분 전`;

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        gap: 16px;
        padding: 0 8px;
      `}
    >
      <div
        css={css`
          width: 48px;
          height: 48px;
          border-radius: 48px;
          background-color: ${theme.Gray[500]};
        `}
      />
      <div
        css={css`
          text-align: left;
        `}
      >
        <h2
          css={css`
            ${theme.Typography.Body2}
          `}
        >
          {title}
        </h2>
        <h3
          css={css`
            ${theme.Typography.Small2}
          `}
        >{`${author} · 조회수 ${view}회 · ${timeDifferenceText}`}</h3>
      </div>
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 8px;
          top: 0;
        `}
      />
    </div>
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

export const FilterTab = ({
  toggleFilter,
  setToggleFilter,
}: {
  toggleFilter: boolean;
  setToggleFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        display: ${toggleFilter ? 'block' : 'none'};
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
        <BsXLg onClick={() => setToggleFilter(!toggleFilter)} />
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
