/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserDetailVideoList } from './components';
import { useGetMyVideosQuery } from '../../store/memberApi';
import { selectUser } from '../../store/userSlice';
import { DataType } from '../../types/type';

const MyPageDetail = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector(selectUser);

  const { data: videos, isLoading, isError } = useGetMyVideosQuery({ accessToken });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading videos</div>;
  }

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
      {videos.content.map((data: DataType) => {
        const uniqueKey = uuidv4();
        return <UserDetailVideoList data={data} key={uniqueKey} />;
      })}
    </div>
  );
};

export default MyPageDetail;
