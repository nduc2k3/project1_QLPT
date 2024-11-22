// Menu.js
import React, {, useEffect } from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileMedical, faUser } from '@fortawesome/free-solid-svg-icons';
const Menu = ({menuId, children}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
        window.location.reload();
    }
    useEffect(() => {
        switch (menuId) {
            case 1:
                document.title = 'Trang Chủ - Nhà Trọ';
                break;
            case 2:
                document.title = 'Phòng - Nhà Trọ';
                break;
            case 3:
                document.title = 'Chỉ Số Điện - Nhà Trọ';
                break;
            case 4:
                document.title = 'Chỉ Số Nước - Nhà Trọ';
                break;
            case 5:
                document.title = 'DS Khách Thuê - Nhà Trọ';
                break;
            case 6:
                document.title = 'Dịch Vụ - Nhà Trọ';
                break;
            case 7:
                document.title = 'Chi Tiết Hóa Đơn - Nhà Trọ';
                break;
            case 8:
                document.title = 'Đổi Mật Khẩu - Nhà Trọ';
                break;
            default:
                document.title = 'Nhà Trọ';
        }
    }, [menuId]);
    return (
        <>
         <div className="menu-container">
            <div className="side-menu">
                <h2>Quản Lý Nhà Trọ</h2>
                <ul>
                    <li className={` ${menuId === 1 ? 'active' : ''}`} onClick={() => {navigate("/home")}}>Trang Chủ</li>
                    <li className={` ${menuId === 2 ? 'active' : ''}`} onClick={() => {navigate("/rooms")}}>Phòng</li>
                    <li className={` ${menuId === 3 ? 'active' : ''}`} onClick={() => {navigate("/electricity")}}>Chỉ Số Điện</li>
                    <li className={` ${menuId === 4 ? 'active' : ''}`} onClick={() => {navigate("/water")}}>Chỉ Số Nước</li>
                    <li className={` ${menuId === 5 ? 'active' : ''}`} onClick={() => {navigate("/tenants")}}>DS Khách Thuê</li>
                    <li className={` ${menuId === 6 ? 'active' : ''}`} onClick={() => {navigate("/service")}}>Dịch Vụ</li>
                    <li className={` ${menuId === 7 ? 'active' : ''}`} onClick={() => {navigate("/invoice")}}>Chi Tiết Hóa Đơn</li>
                    <div className='btnChangePasswd'>
                        <button className={`ChangePasswd ${menuId === 8 ? 'active' : ' '}`} onClick={() => {navigate("/changepasswd")}}>Đổi Mật Khẩu</button>
                    </div>
                    <div className='btnLogout'>
                        <button className='Logout' onClick={handleLogout}>Đăng Xuất</button>
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
