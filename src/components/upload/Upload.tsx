/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { ButtonBox, InputBoxForm } from '../login/components';
import { FilterList } from '../modal/component';
import theme from '../../styles/theme';
import { UploadModal } from './components';
import { useUploadVideoMutation } from '../../store/memberApi';
import { selectUser } from '../../store/userSlice';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const { register, handleSubmit } = useForm();

  const titleProps = register('title', { required: '제목을 입력해주세요' });
  const descriptionProps = register('description', { required: '상세정보를 입력해주세요' });
  const tagProps = register('tag', { required: '#태그를 입력해주세요' });

  const { accessToken } = useSelector(selectUser);

  const [postVideo, { isLoading }] = useUploadVideoMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (file) {
      const req = { title: data.title, detail: data.description, tag: data.tag, file, accessToken };
      console.log(req);
      const response = await postVideo(req);
      console.log(response);
    }
  };

  return (
    <div
      css={css`
        display: grid;
        gap: 1.6rem;
        text-align: left;
        margin: 1.6rem;
        padding-bottom: 8rem;
        @media screen and (min-width: 1366px) {
          grid-template-columns: 1fr 1.5fr;
        }
      `}
    >
      <div>
        {file ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            controls
            width="100%"
            css={css`
              border-radius: 2rem;
            `}
          >
            <source src={URL.createObjectURL(file)} type={file.type} />
          </video>
        ) : (
          <div
            css={css`
              width: 100%;
              height: 40vh;
              border-radius: 2rem;
              background-color: ${theme.Gray[300]};
              margin-bottom: 1.6rem;
            `}
          />
        )}
        {file ? (
          <div
            css={css`
              display: flex;
            `}
          >
            <p>파일 이름: {file.name}</p>
            <ButtonBox
              text="다시 업로드 하기"
              onClick={() => {
                setFile(null);
                setIsOpen(true);
              }}
            />
          </div>
        ) : (
          <ButtonBox text="동영상을 올려주세요." onClick={() => setIsOpen(true)} />
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          <h1>기본정보</h1>
          <InputBoxForm placeholder="제목을 입력해 주세요." register={titleProps} />
          <textarea
            name={descriptionProps.name}
            ref={descriptionProps.ref}
            onBlur={descriptionProps.onBlur}
            placeholder="상세정보를 입력해주세요"
            css={css`
              background-color: ${theme.Gray[100]};
              border-radius: 0.8rem;
              padding: 1.6rem;
              resize: none;
              height: 16rem;
            `}
          />
          <InputBoxForm placeholder="#태그를 입력해 주세요." register={tagProps} />
        </div>
        <hr />
        <div>
          <h2
            css={css`
              ${theme.Typography.Body2}
            `}
          >
            동영상의 분야를 알려주세요
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
        </div>
        <hr />
        <div>
          <h2
            css={css`
              ${theme.Typography.Body2}
            `}
          >
            추천 연령대를 알려주세요
          </h2>
          <FilterList title="10대 이하" describe="" />
          <FilterList title="20대 ~ 40대" describe="" />
          <FilterList title="50대 이상" describe="" />
          {!isLoading ? (
            <ButtonBox text="업로드 하기" />
          ) : (
            <div
              css={css`
                background-color: ${theme.Colors.Primary};
                color: white;
                text-align: center;
                padding: 1.6rem;
                border-radius: 1.6rem;
              `}
            >
              업로드 중
            </div>
          )}
        </div>
      </form>
      {isOpen && <UploadModal setFile={setFile} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Upload;
