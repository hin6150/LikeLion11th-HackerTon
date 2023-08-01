import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import MyPage from './components/mypage/MyPage';
import SignIn from './components/login/SignIn';
import SignUp from './components/login/SignUp';
import Chat from './components/chat/Chat';
import Upload from './components/upload/Upload';
import HomeDetail from './components/home/HomeDetail';
import MyPageDetail from './components/mypage/MyPageDetail';
import { Footer, Header } from './components/emotion/components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/*" element={<HomeDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/*" element={<MyPageDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
