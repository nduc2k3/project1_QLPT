import "./App.css";
// import Navbar from './components/navbar';
// import { useState } from 'react';
// import {Routes,Route} from 'react-router-dom';
// import HoaDon from './pages/QuanLyHoaDon';
// import HopDong from './pages/QuanLyHopDong';
// import KhachThue from './pages/QuanLyKhachThue';
// import PhongTro from './pages/QuanLyPhongTro';
// import Dropdown from './components/DropDown';
import Login from "./components/Login";

function App() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {/* <Navbar onToggleMenu={setIsMenuOpen} />
      <div className={`content ${isMenuOpen ? 'content-shift' : ''}`}>
        <div className="overlay-text"></div>
        <div>
         <Routes>
         <Route path="/home" element={<PhongTro/>}/>
         <Route path="/about" element={<HopDong/>}/>
         <Route path="/services" element={<KhachThue/>}/>
         <Route path="/contact" element={<HoaDon/>}/>
        </Routes>
        </div>
      </div> */}
      <Login />
    </div>
  );
}

export default App;
