/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsArrowLeft, BsChat, BsSearch, BsSoundwave, BsXLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, UseFormRegisterReturn, useForm } from 'react-hook-form';
import theme from '../../styles/theme';
import { closeModal } from '../../store/modalSlice';
import { ContainerType } from '../../types/type';
import { ButtonBox } from '../login/components';
import { selectFliter, setFliter } from '../../store/filterSlice';

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

const TabContainer = ({ children }: ContainerType) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100vw;
        height: 100vh;
        text-align: left;
        z-index: 100;
        background-color: ${theme.Gray[100]};
        @media screen and (min-width: 768px) {
          width: 60%;
          right: 0;
        }
        @media screen and (min-width: 1366px) {
          width: 40%;
          left: 0;
        }
      `}
    >
      {children}
    </div>
  );
};

export const UpperBar = ({ title }: { title: string }) => {
  const dispatch = useDispatch();

  return (
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
        {title}
      </p>
    </div>
  );
};

const FilterCheckBox = ({
  title,
  id,
  describe,
  register,
  checked,
}: {
  title: string;
  id:
    | 'lifeKnowledge'
    | 'Leisure'
    | 'GovernmentSupportInformation'
    | 'Electronics'
    | 'asset'
    | 'youth'
    | 'adult'
    | 'oldMan'
    | 'NULL';
  describe: string;
  register: UseFormRegisterReturn;
  checked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <div
      css={css`
        margin: 1.6rem 0;
      `}
    >
      <label
        htmlFor={id}
        css={css`
          position: relative;
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
        <input
          id={id}
          value={id}
          name={register.name}
          ref={register.ref}
          onChange={(event) => {
            register.onChange(event);
            setIsChecked(!isChecked);
          }}
          type="checkBox"
          checked={isChecked}
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
      </label>
    </div>
  );
};

export const FilterTabModal = () => {
  const dispatch = useDispatch();
  const { ageCategory, videoCategory } = useSelector(selectFliter);
  const { register, handleSubmit } = useForm({
    defaultValues: { videoCategory: [], ageCategory: [] },
  });

  const videoCategoryProps = register('videoCategory', {});
  const ageCategoryProps = register('ageCategory', {});

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(setFliter({ ageCategory: data.ageCategory, videoCategory: data.videoCategory }));
    dispatch(closeModal());
  };

  const handleReset = () => {
    dispatch(setFliter({ ageCategory: [], videoCategory: [] }));
    dispatch(closeModal());
  };

  return (
    <TabContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UpperBar title="필터" />
        <hr />
        <div
          css={css`
            margin: 1.6rem;
          `}
        >
          <h2
            css={css`
              ${theme.Typography.Body2}
            `}
          >
            분야별
          </h2>
          <FilterCheckBox
            title="생활지식"
            id="lifeKnowledge"
            describe="실생활에서 사용하는 간단한 지식에 대한 강의에요"
            register={videoCategoryProps}
            checked={videoCategory.includes('lifeKnowledge')}
          />
          <FilterCheckBox
            title="여가"
            id="Leisure"
            describe="다양한 즐길거리에 대한 정보를 얻을 수 있어요"
            register={videoCategoryProps}
            checked={videoCategory.includes('Leisure')}
          />
          <FilterCheckBox
            title="정부 지원 정보"
            id="GovernmentSupportInformation"
            describe="지자체에서 제공하는 혜택 정보를 정리해둔 영상들이 있어요"
            register={videoCategoryProps}
            checked={videoCategory.includes('GovernmentSupportInformation')}
          />
          <FilterCheckBox
            title="전자 기기"
            id="Electronics"
            describe="스마트폰, 무인주문기계 등 여러 전자기기의 정보를 얻을 수 있어요"
            register={videoCategoryProps}
            checked={videoCategory.includes('Electronics')}
          />
          <FilterCheckBox
            title="자산"
            id="asset"
            describe="부동산, 금융 등의 제테크 정보들을 얻을 수 있어요"
            register={videoCategoryProps}
            checked={videoCategory.includes('asset')}
          />
        </div>
        <hr />
        <div
          css={css`
            margin: 1.6rem;
          `}
        >
          <h2
            css={css`
              ${theme.Typography.Body2}
            `}
          >
            연령별
          </h2>
          <FilterCheckBox
            id="youth"
            title="10대 이하"
            describe=""
            register={ageCategoryProps}
            checked={ageCategory.includes('youth')}
          />
          <FilterCheckBox
            id="adult"
            title="20대 ~ 40대"
            describe=""
            register={ageCategoryProps}
            checked={ageCategory.includes('adult')}
          />
          <FilterCheckBox
            id="oldMan"
            title="50대 이상"
            describe=""
            register={ageCategoryProps}
            checked={ageCategory.includes('oldMan')}
          />
        </div>
        <div
          css={css`
            margin: 3.2rem 1.6rem;
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 1.6rem;
          `}
        >
          <ButtonBox text="필터 적용하기" submit />
          <ButtonBox text="초기화" onClick={handleReset} />
        </div>
      </form>
    </TabContainer>
  );
};

export const SearchTabModal = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isValueExist = inputValue !== '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!inputValue) return;
    navigate(`/home/search/${inputValue}`);
    dispatch(closeModal());
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        width: 100vw;
        height: 64px;
        padding: 16px;
        display: flex;
        gap: 1.6rem;
        align-items: center;
        background-color: ${theme.Gray[100]};
      `}
    >
      <BsArrowLeft
        css={css`
          font-size: 3.2rem;
        `}
        onClick={() => {
          dispatch(closeModal());
        }}
      />
      <input
        ref={inputRef}
        placeholder="검색어를 입력하세요."
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        css={css`
          flex: 1;
          height: 32px;
          background-color: ${theme.Gray[200]};
          border-radius: 1.2rem;
          ${theme.Typography.Small2}
          padding-left: 1.6rem;
          &::placeholder {
            color: ${theme.Gray[500]};
          }
        `}
      />

      {isValueExist ? (
        <BsSearch
          css={css`
            font-size: 2.8rem;
          `}
          role="presentation"
          onClick={handleSearch}
        />
      ) : (
        <BsSoundwave
          css={css`
            font-size: 3.2rem;
          `}
        />
      )}
    </div>
  );
};

const ChatList = ({ title }: { title: string }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 0.8rem;
      `}
    >
      <BsChat />
      <p>{title}</p>
    </div>
  );
};

export const HistoryTabModal = () => {
  return (
    <TabContainer>
      <UpperBar title="채팅 기록" />
      <hr />
      <div
        css={css`
          width: 100%;
          padding: 0.8rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        `}
      >
        <button
          type="button"
          css={css`
            background-color: ${theme.Gray[200]};
            padding: 0.8rem 1.6rem;
            border-radius: 1.2rem;
            width: 100%;
          `}
        >
          + 새로운 채팅 시작하기
        </button>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          <p>이전 7일간 채팅</p>
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          `}
        >
          <p>이전 7일간 채팅</p>
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
          <ChatList title="Japan Travel" />
        </div>
      </div>
    </TabContainer>
  );
};
