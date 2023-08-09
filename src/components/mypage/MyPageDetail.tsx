/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { UserDetailVideoList } from './components';

const MyPageDetail = () => {
  const repeatedVideos = Array.from({ length: 10 });
  const navigate = useNavigate();
  return (
    <div
      css={css`
        text-align: left;
        padding: 1.6rem;
        padding-bottom: 8rem;
      `}
    >
      <BsArrowLeft
        css={css`
          font-size: 3.2rem;
        `}
        onClick={() => {
          navigate('/mypage');
        }}
      />
      <div
        css={css`
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;

          @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr 1fr 1fr;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 1.6rem;
          `}
        >
          <input
            type="checkbox"
            css={css`
              display: none;
              @media screen and (min-width: 768px) {
                display: block;
              }
            `}
          />
          <p>동영상</p>
        </div>
        <p>제한사항</p>
        <p>
          봉사시간 <br />
          발급 여부
        </p>
        <p
          css={css`
            display: none;
            @media screen and (min-width: 768px) {
              display: block;
            }
          `}
        >
          조회수
        </p>
      </div>
      <hr />
      {repeatedVideos.map(() => {
        const uniqueKey = uuidv4();
        return <UserDetailVideoList key={uniqueKey} />;
      })}
    </div>
  );
};

export default MyPageDetail;
