import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/index';
import Rooms from './pages/Rooms/index';
import Electricity from './pages/Electricity/index';
import Water from './pages/Water/index';
import Menu from './components/Menu';
import Login from './components/Login';
import Tenants from './pages/Tenants/index';
import AddTenant from './components/AddTenant/index';
import Service from './pages/Service/index';
import ThemDichVu from './components/ThemDichVu/index';
import './App.css';
import Invoice from './pages/Invoice/index';
import ChangePasswd from './pages/ChangePasswd/index';

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
          <Route path="/home" element={<Menu menuId={1}><Home /></Menu>} />
          <Route path="/rooms" element={<Menu menuId={2} ><Rooms /></Menu>} />
          <Route path="/electricity" element={<Menu menuId={3}><Electricity/></Menu>}/>
          <Route path="/water" element={<Menu menuId={4}><Water/></Menu>}/>
          <Route path="/tenants" element={<Menu menuId={5}><Tenants/></Menu>}/>
          <Route path='/service' element={<Menu menuId={6}><Service/></Menu>}/>
          <Route path='/invoice' element={<Menu menuId={7}><Invoice/></Menu>}/>
          <Route path='/changepasswd' element={<Menu menuId={8}><ChangePasswd/></Menu>}/>
          <Route path='/addservice' element={<Menu><ThemDichVu/></Menu>}/>
          <Route path="/addtenant" element={<AddTenant/>}/>
        </>
      )}
    </Routes>
  );
}

export default App;
