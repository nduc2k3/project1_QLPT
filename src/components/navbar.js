import React, { useState } from "react";
import './navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom'; 

const Navbar = ({ onToggleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onToggleMenu(!isOpen);  // Gửi trạng thái menu tới parent component
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <nav>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div>
          <h2>Xin Chào!</h2>
        </div>
        <ul>
          <li>
            <NavLink to="/home" onClick={toggleMenu} activeClassName="active">
              <i className="fas fa-home"></i> Phòng Trọ
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={toggleMenu} activeClassName="active">
              <i className="fas fa-users"></i> Khách Thuê
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" onClick={toggleMenu} activeClassName="active">
              <i className="fas fa-file-contract"></i> Hợp Đồng
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleMenu} activeClassName="active">
              <i className="fas fa-file-invoice-dollar"></i> Hóa Đơn
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
