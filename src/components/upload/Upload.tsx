/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Article, ButtonBox, ErrorDescription, InputBoxForm } from '../login/components';
import theme from '../../styles/theme';
import { FilterRadioBox, TextAreaForm, UploadModal } from './components';
import { useUploadVideoMutation } from '../../store/memberApi';
import { selectUser } from '../../store/userSlice';

const isEmptyValue = (value: string) => {
  if (!value.length) {
    return true;
  }
  return false;
};

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [inputHashTag, setInputHashTag] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validateHashTag = () => {
    return hashTags.length > 0 || '하나 입력 후 엔터키나 스페이스 키를 눌러주세요.';
  };

  const hashTagProps = register('hashTag', { validate: validateHashTag });
  const videoCategoryProps = register('videoCategory', {
    required: '동영상의 분야를 선택해주세요.',
  });
  const ageCategoryProps = register('ageCategory', { required: '추천 연령대를 선택해주세요.' });

  const { accessToken } = useSelector(selectUser);

  const [postVideo, { isLoading, isSuccess }] = useUploadVideoMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
      alert('upload에 성공하였습니다!');
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!file) {
      alert('동영상을 업로드 해주세요.');
      return;
    }

    const { title, videoDetail, videoCategory, ageCategory } = data;
    console.log(data);
    try {
      const response = await postVideo({
        title,
        videoDetail,
        videoCategory,
        ageCategory,
        hashTag: hashTags,
        accessToken,
        file,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  // https://velog.io/@reasonz/라이브러리-없이-React로-해시태그-구현하기-feat.-버그와의-싸움

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter', 'Tab'];
    if (!allowedCommand.includes(e.code)) return;

    if (hashTags.length >= 10) {
      alert('해시태그는 최대 10개까지 등록할 수 있습니다.');
      return;
    }

    if (isEmptyValue(e.currentTarget.value.trim())) {
      setInputHashTag('');
      return;
    }

    let newHashTag = e.currentTarget.value.trim();
    const regExp = /[{}/?.;:|)*~`!^\-_+<>@#$%&\\=('""]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag)) return;

    setHashTags((prevHashTags): string[] => {
      return Array.from(new Set([...prevHashTags, newHashTag]));
    });

    setInputHashTag('');
    clearErrors('hashTag');
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && isEmptyValue(e.currentTarget.value)) {
      // 백스페이스 키를 눌렀고 입력 값이 비어있다면 배열의 마지막 요소를 지우기
      setHashTags((prevHashTags): string[] => {
        const updatedHashTags = [...prevHashTags];
        updatedHashTags.pop(); // 배열의 마지막 요소를 제거
        return updatedHashTags;
      });
      return;
    }

    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) {
      setInputHashTag('');
    }
  };

  const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTag(e.currentTarget.value);
  };

  const handleRemoveHashTag = (tagToRemove: string) => {
    setHashTags((prevHashTags) => prevHashTags.filter((tag) => tag !== tagToRemove));
  };

  const handleHashTagBlur = () => {
    if (hashTags.length >= 10) {
      alert('해시태그는 최대 10개까지 등록할 수 있습니다.');
      return;
    }

    if (isEmptyValue(inputHashTag.trim())) {
      setInputHashTag('');
      return;
    }

    let newHashTag = inputHashTag.trim();
    const regExp = /[{}/?.;:|)*~`!^\-_+<>@#$%&\\=('""]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag)) return;

    setHashTags((prevHashTags): string[] => {
      return Array.from(new Set([...prevHashTags, newHashTag]));
    });

    setInputHashTag('');
    clearErrors('hashTag');
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
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              width="100%"
              css={css`
                border-radius: 2rem;
              `}
            >
              <source src={URL.createObjectURL(file)} type={file.type} />
            </video>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                margin: 0.8rem 0;
                ${theme.Typography.Body2}
              `}
            >
              <p>
                <span
                  css={css`
                    ${theme.Typography.SubTitle}
                  `}
                >
                  파일 이름
                </span>
                : {file.name}
              </p>
              <div
                role="presentation"
                onClick={() => {
                  setFile(null);
                  setIsOpen(true);
                }}
                css={css`
                  color: ${theme.Colors.Primary};
                  text-decoration: underline;
                  ${theme.Typography.SubTitle}
                  cursor: pointer;
                `}
              >
                다시 업로드 하기
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              css={css`
                width: 100%;
                height: 40vh;
                border-radius: 2rem;
                background-color: ${theme.Gray[300]};
                margin-bottom: 1.6rem;
              `}
            />
            <ButtonBox text="동영상 업로드" onClick={() => setIsOpen(true)} />
          </>
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
          <h1
            css={css`
              ${theme.Typography.SubTitle}
            `}
          >
            기본정보
          </h1>
          <Article>
            <InputBoxForm
              placeholder="제목을 입력해주세요."
              register={register('title', { required: '제목을 입력해주세요' })}
            />
            {(errors?.title || !getValues('title')) && (
              <ErrorDescription text={errors?.title?.message} />
            )}
          </Article>

          <Article>
            <TextAreaForm
              placeholder="상세정보를 입력해주세요."
              register={register('videoDetail', { required: '상세정보를 입력해주세요' })}
            />
            {(errors?.videoDetail || !getValues('videoDetail')) && (
              <ErrorDescription text={errors?.videoDetail?.message} />
            )}
          </Article>

          <Article>
            <div
              css={css`
                padding: 1.6rem;
                background-color: ${theme.Gray[50]};
                border-radius: 0.8rem;
                box-sizing: border-box;
                border: 2px solid ${theme.Gray[50]};
                transition: border-color 0.3s;
                &:focus-within {
                  border-color: ${theme.Colors.Primary};
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.4rem;
                `}
              >
                {hashTags.length > 0 &&
                  hashTags.map((hashTag) => {
                    return (
                      <div
                        role="presentation"
                        key={hashTag}
                        css={css`
                          padding: 0.8rem;
                          border-radius: 0.8rem;
                          background-color: ${theme.Colors.Primary};
                          color: white;
                          ${theme.Typography.PreTitle}
                          cursor: pointer;
                          &:hover {
                          }
                        `}
                        onClick={() => handleRemoveHashTag(hashTag)}
                      >
                        #{hashTag}
                      </div>
                    );
                  })}
              </div>

              <input
                name={hashTagProps.name}
                ref={hashTagProps.ref}
                onChange={changeHashTagInput}
                css={css`
                  margin-top: 0.4rem;

                  width: 100%;
                  background-color: transparent;
                  ${theme.Typography.Body2}
                `}
                value={inputHashTag}
                onKeyUp={addHashTag}
                onKeyDown={keyDownHandler}
                onBlur={handleHashTagBlur}
                placeholder="한 단어로 #해시태그를 등록해보세요."
              />
            </div>

            {errors?.hashTag && <ErrorDescription text={errors?.hashTag?.message} />}
          </Article>
        </div>

        <hr />

        <div>
          <h2
            css={css`
              ${theme.Typography.SubTitle}
            `}
          >
            동영상의 분야를 알려주세요
          </h2>
          <FilterRadioBox
            title="생활지식"
            id="lifeKnowledge"
            describe="실생활에서 사용하는 간단한 지식에 대한 강의에요"
            register={videoCategoryProps}
          />
          <FilterRadioBox
            title="여가"
            id="Leisure"
            describe="다양한 즐길거리에 대한 정보를 얻을 수 있어요"
            register={videoCategoryProps}
          />
          <FilterRadioBox
            title="정부 지원 정보"
            id="GovernmentSupportInformation"
            describe="지자체에서 제공하는 혜택 정보를 정리해둔 영상들이 있어요"
            register={videoCategoryProps}
          />
          <FilterRadioBox
            title="전자 기기"
            id="Electronics"
            describe="스마트폰, 무인주문기계 등 여러 전자기기의 정보를 얻을 수 있어요"
            register={videoCategoryProps}
          />
          <FilterRadioBox
            title="자산"
            id="asset"
            describe="부동산, 금융 등의 제테크 정보들을 얻을 수 있어요"
            register={videoCategoryProps}
          />
          {errors?.videoCategory && (
            <ErrorDescription text={errors?.videoCategory?.message} category />
          )}
        </div>

        <hr />

        <div>
          <h2
            css={css`
              ${theme.Typography.SubTitle}
            `}
          >
            추천 연령대를 알려주세요
          </h2>
          <FilterRadioBox id="youth" title="10대 이하" describe="" register={ageCategoryProps} />
          <FilterRadioBox id="adult" title="20대 ~ 40대" describe="" register={ageCategoryProps} />
          <FilterRadioBox id="oldMan" title="50대 이상" describe="" register={ageCategoryProps} />
          {errors?.ageCategory && <ErrorDescription text={errors?.ageCategory?.message} category />}
        </div>

        <ButtonBox text={isLoading ? '업로드 중' : '업로드 하기'} submit disabled={isLoading} />
      </form>
      {isOpen && <UploadModal setFile={setFile} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Upload;
