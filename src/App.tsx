import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/home/Home';
import MyPage from './components/mypage/MyPage';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Chat from './components/chat/Chat';
import Upload from './components/upload/Upload';
import HomeDetail from './components/home/HomeDetail';
import MyPageDetail from './components/mypage/MyPageDetail';
import { Footer, Header } from './components/emotion/components';
import { selectUser } from './store/userSlice';

function App() {
  const { accessToken } = useSelector(selectUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<HomeDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/upload" element={accessToken !== '' ? <Upload /> : <SignIn />} />
          <Route path="/mypage" element={accessToken !== '' ? <MyPage /> : <SignIn />} />
          {/* <Route path="/mypage/:username" element={<MyPage />} /> */}
          <Route path="/mypage/detail" element={<MyPageDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
