/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { BsUpload, BsXLg } from 'react-icons/bs';
import theme from '../../styles/theme';

interface FileUploadProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload = ({ setFile, setIsOpen }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);

  const ValidationTest = (selectedFile: File) => {
    const allowedExtensions =
      /(\.mp4|\.webm|\.avi|\.mov|\.mkv|\.flv|\.wmv|\.mpeg|\.mpg|\.m4v|\.3gp)$/i;

    if (!allowedExtensions.test(selectedFile.name)) {
      alert('올바른 동영상 파일 확장자가 아닙니다.');
      return;
    }
    setFile(selectedFile);
    setIsOpen(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    ValidationTest(droppedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      ValidationTest(selectedFile);
    }
    e.target.value = ''; // 입력을 초기화하여 파일 선택 취소
  };

  return (
    <div
      css={css`
        border: 2px dashed #aaa;
        margin: 1rem;
        text-align: center;
        cursor: pointer;
        transition: border-color 0.3s ease;
        border-color: ${dragging && '#007bff'};
        flex: 1;
      `}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.6rem;
          margin: auto;
          height: 100%;
        `}
      >
        <div
          css={css`
            width: 12.8rem;
            height: 12.8rem;
            border-radius: 12.8rem;
            background-color: ${theme.Gray[200]};
            font-size: 8rem;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <BsUpload />
        </div>
        <p>동영상 파일을 드래그 앤 드롭하여 업로드하세요</p>
        <p>또는 파일 선택을 통해 업로드 할 수 있습니다.</p>
        <label
          htmlFor="video_file"
          css={css`
            width: 100%;
            padding: 1.6rem;
            background-color: ${theme.Colors.Primary};
            border-radius: 0.8rem;
            ${theme.Typography.ButtonText}
            color: ${theme.Gray[50]};
          `}
        >
          파일 업로드하기
          <input
            type="file"
            id="video_file"
            accept=".mp4, .webm, .avi, .mov, .mkv, .flv, .wmv, .mpeg, .mpg, .m4v, .3gp"
            onChange={handleFileChange}
            css={css`
              display: none;
            `}
          />
        </label>
      </div>
    </div>
  );
};

export const UploadModal = ({ setFile, setIsOpen }: FileUploadProps) => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(27, 27, 27, 0.8);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onClick={() => {
        setIsOpen(false);
      }}
      role="presentation"
    >
      <div
        css={css`
          width: 70vw;
          height: 60vh;
          background-color: ${theme.Gray[50]};
          border-radius: 0.8rem;
          display: flex;
          flex-direction: column;
        `}
        onClick={(event) => {
          event.stopPropagation();
        }}
        role="presentation"
      >
        <div
          css={css`
            display: flex;
            padding: 16px;
            gap: 16px;
            align-items: center;
          `}
        >
          <BsXLg onClick={() => setIsOpen(false)} />
          <p
            css={css`
              ${theme.Typography.Small1}
            `}
          >
            동영상 업로드
          </p>
        </div>
        <hr
          css={css`
            width: 99.8%;
          `}
        />
        <FileUpload setFile={setFile} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
