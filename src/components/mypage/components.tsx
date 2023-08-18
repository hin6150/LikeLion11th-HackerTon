/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import theme from '../../styles/theme';
import { ContainerType, DataType } from '../../types/type';
import { logout } from '../../store/userSlice';
import { setCookie } from '../../store/cookie';
import { VideoFrame } from '../home/components';

// const MyPageVideoFrame = () => {
//   return (
//     <div
//       css={css`
//         width: 50%;
//         height: 120px;
//         border-radius: 2rem;
//         background-color: ${theme.Gray[400]};
//         position: relative;
//         @media screen and (min-width: 768px) {
//           width: 240px;
//         }
//       `}
//     />
//   );
// };
const MyPageVideoInfo = ({ data }: { data: DataType }) => {
  //   console.log(data);
  //   // 현재 시간을 Date 객체로 얻기
  //   const currentTime = new Date();
  //   const DateObject = new Date(data.createdAt);

  //   // 두 시간 객체의 차이 계산 (밀리초 단위)
  //   const timeDifference = currentTime.getTime() - DateObject.getTime();

  //   // 차이를 원하는 형식으로 변환 (예시: "2일 3시간 45분 전")
  //   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  //   const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // //   const timeDifferenceText = `${daysDifference > 0 ? `${daysDifference}일 ` : ''}
  // // ${hoursDifference > 0 ? `${hoursDifference}시간 ` : ''}
  // // ${minutesDifference}분 전`;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        text-align: left;
        ${theme.Typography.Body2}
      `}
    >
      <p>{data.videoTitle}</p>
      {/* <p>조회수: {data.viewCount}</p> */}
      <p>조회수: 7회</p>
      {/* <p>{timeDifferenceText}</p> */}
      <p>3분 전</p>
    </div>
  );
};
export const MyPageVideoComponent = ({ data }: { data: DataType }) => {
  const navigate = useNavigate();

  return (
    <div
      role="presentation"
      css={css`
        display: flex;
        gap: 1.6rem;
        margin: 0 1.6rem;
      `}
      onClick={() => {
        navigate(`/home/${data.videoId}`);
      }}
    >
      {/* <MyPageVideoFrame /> */}
      <VideoFrame videoFileName={data.videoFileName} mobileVideo preview />
      <MyPageVideoInfo data={data} />
      <BsThreeDotsVertical
        css={css`
          position: absolute;
          right: 1.6rem;
        `}
      />
    </div>
  );
};

const UserIcon = () => {
  return (
    <div
      css={css`
        width: 64px;
        height: 64px;
        border-radius: 64px;
        background-color: ${theme.Gray[400]};
      `}
    />
  );
};

export const UserBoxContainer = ({
  member,
}: {
  member: { nickname: string; username: string };
}) => {
  const dispatch = useDispatch();
  const { memberId } = useParams();

  return (
    <div
      css={css`
        height: 9.6rem;
        border-radius: 2rem;
        background-color: ${theme.Gray[100]};
        display: flex;
        padding: 1.6rem;
        align-items: start;
        position: relative;
        gap: 1.6rem;
      `}
    >
      <UserIcon />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          text-align: left;
          gap: 0.8rem;
          ${theme.Typography.Body2};
        `}
      >
        <p>{member.nickname}</p>
        <p>{member.username}</p>
      </div>
      <p
        role="presentation"
        css={css`
          position: absolute;
          right: 1.6rem;
          top: 1.6rem;
          ${theme.Typography.PreTitle};
          color: red;
          display: ${memberId && 'none'};
          cursor: pointer;
        `}
        onClick={() => {
          dispatch(logout());
          setCookie('refreshToken', '');
        }}
      >
        로그아웃
      </p>
    </div>
  );
};

export const TextBoxContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        display: flex;
        ${theme.Typography.Body2}
        justify-content: space-between;
        margin: 1.6rem;
        margin-bottom: 0.8rem;
      `}
    >
      {children}
    </div>
  );
};

export const UserDetailVideoList = ({ data }: { data: DataType }) => {
  return (
    <>
      <div
        css={css`
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          text-align: left;
          p:last-child {
            display: none;
          }
          @media screen and (min-width: 768px) {
            grid-template-columns: 3fr 1fr 1fr 1fr;
            p:last-child {
              display: block;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 1.6rem;
            align-items: start;
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
          <div
            css={css`
              background-color: ${theme.Gray[300]};
              width: 8rem;
              height: 6rem;
              border-radius: 2rem;
              @media screen and (min-width: 768px) {
                width: 12rem;
                height: 8rem;
              }
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            동영상 예정
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 0.8rem;
            `}
          >
            <h1
              css={css`
                ${theme.Typography.Small1}
              `}
            >
              {data.videoTitle}
            </h1>
            {/* <p
              css={css`
                ${theme.Typography.Small3}
              `}
            >
              {data.videoDetail}
            </p> */}
            <div
              css={css`
                display: none;
                @media screen and (min-width: 768px) {
                  display: block;
                  font-size: 24px;
                  display: flex;
                  gap: 1.6rem;
                }
              `}
            >
              <BsPencil />
              <BsTrash />
            </div>
          </div>
        </div>
        <p>없음</p>
        <p>불가능</p>
        <p>3</p>
      </div>
      <hr />
    </>
  );
};
