import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/index';
import Rooms from './pages/Rooms/index';
import Menu from './components/Menu';
import Login from './components/Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State để kiểm tra người dùng đã đăng nhập hay chưa

  // Hàm này sẽ được gọi khi đăng nhập thành công
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      {/* Nếu người dùng chưa đăng nhập, chuyển hướng họ đến trang đăng nhập */}
      {!isLoggedIn ? (
        <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </>
      ) : (
        <>
          {/* Khi người dùng đã đăng nhập, cho phép truy cập các trang */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Menu><Home /></Menu>} />
          <Route path="/rooms" element={<Menu><Rooms /></Menu>} />
        </>
      )}
    </Routes>
  );
}

export default App;
