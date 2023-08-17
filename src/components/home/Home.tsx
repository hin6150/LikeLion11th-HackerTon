/** @jsxImportSource @emotion/react */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { HomeGridContainer, VideoContainer, VideoFrame, VideoInfo } from './components';
import { useGetVideosQuery } from '../../store/memberApi';
import { DataType } from '../../types/type';

const Home = () => {
  const { search } = useParams();
  const { data: videos, isLoading, isError } = useGetVideosQuery({ search });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading videos</div>;

  console.log(videos);

  return (
    <HomeGridContainer>
      {videos.numberOfElements !== 0 ? (
        videos.content.map((data: DataType) => {
          const uniqueKey = uuidv4();
          return (
            <VideoContainer key={uniqueKey} id={data.videoId}>
              <VideoFrame />
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
