// Menu.js
import React from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedical, faUser } from '@fortawesome/free-solid-svg-icons';
const Menu = ({children}) => {
    return (
        <>
         <div className="menu-container">
            <div className="side-menu">
                <h2>Quản Lý Nhà Trọ</h2>
                <ul>
                    <li><Link to="/home">Trang Chủ</Link></li>
                    <li><Link to="/rooms">Phòng</Link></li>
                    <li><Link to="/services">Dịch Vụ</Link></li>
                    <li><Link to="/electricity">Chỉ Số Điện</Link></li>
                    <li><Link to="/water">Chỉ Số Nước</Link></li>
                    <li><Link to="/tenants">Danh Sách Khách Thuê</Link></li>
                    <li><Link to="/involde-details">Chi Tiết Hóa Đơn</Link></li>
                    <div className='btnChangePasswd'>
                        <button className='ChangePasswd'>Đổi Mật Khẩu</button>
                    </div>
                    <div className='btnLogout'>
                        <button className='Logout'>Đăng Xuất</button>
                    </div>
                </ul>
            </div>
            <div className="beside">
                <div className="header">
                    <div className="hamburger">
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="fontawesome-icons">
                        <div className="fontawesome-icon">
                            <FontAwesomeIcon icon={faFileMedical} size="2x" />
                        </div>
                        <div className="fontawesome-icon">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                        </div>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
         </div>  
        </>    
    );
};

export default Menu;
