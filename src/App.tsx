import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/home/Home';
import MyPage from './components/mypage/MyPage';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Chat from './components/chat/Chat';
import Upload from './components/upload/Upload';
import HomeDetail from './components/home/HomeDetail';
import MyPageDetail from './components/mypage/MyPageDetail';
import { Footer, Header } from './components/emotion/components';
import { selectUser, setUser } from './store/userSlice';
import { getCookie } from './store/cookie';
import { useGetAccessTokenMutation } from './store/memberApi';

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectUser);
  const [getAccessToken, { isLoading }] = useGetAccessTokenMutation();

  const refreshToken = getCookie('refreshToken');

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await getAccessToken({ refreshToken }).unwrap();

      if (response) {
        dispatch(setUser({ accessToken: response.accessToken }));
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  }, [dispatch, getAccessToken, refreshToken]);

  useEffect(() => {
    // 최초 렌더링 시 fetchAccessToken 실행
    if (!accessToken && refreshToken) {
      fetchAccessToken();
    }

    if (accessToken) {
      // 30분마다 fetchAccessToken 실행
      const intervalId = setInterval(fetchAccessToken, 30 * 60 * 1000);

      // 컴포넌트가 언마운트될 때 인터벌 해제
      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [accessToken, fetchAccessToken, refreshToken]);

  return (
    <div className="App">
      <Header />
      {!isLoading ? (
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/search/:search" element={<Home />} />
          <Route path="/home/:videoId" element={<HomeDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/upload" element={accessToken ? <Upload /> : <SignIn />} />
          <Route path="/mypage" element={accessToken ? <MyPage /> : <SignIn />} />
          <Route path="/mypage/:memberId" element={<MyPage />} />
          <Route path="/mypage/detail" element={<MyPageDetail />} />
          {/* <Route path="/signin" element={<SignIn />} /> */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      ) : (
        <div />
      )}
      <Footer />
    </div>
  );
}

export default App;
