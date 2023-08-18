/** @jsxImportSource @emotion/react */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideosQuery } from '../../store/memberApi';
import { DataType } from '../../types/type';
import { selectFliter } from '../../store/filterSlice';

const Home = () => {
  const { search } = useParams();
  const { ageCategory, videoCategory } = useSelector(selectFliter);
  const {
    data: videos,
    isLoading,
    isError,
  } = useGetVideosQuery({ search, ageCategory, videoCategory });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading videos</div>;

  return (
    <HomeGridContainer>
      {videos.numberOfElements !== 0 ? (
        videos.content.map((data: DataType) => {
          const uniqueKey = uuidv4();
          return (
            <VideoContainer key={uniqueKey} id={data.videoId}>
              <VideoFrame videoFileName={data.videoFileName} />
              <VideoInfo data={data} />
            </VideoContainer>
          );
        })
      ) : (
        <div>조건에 해당하는 동영상이 없습니다.</div>
      )}
    </HomeGridContainer>
  );
};

export default Home;
