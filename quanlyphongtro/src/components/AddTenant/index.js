import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import ThongTin from '../../components/ThongTin/index';
import DichVu from '../../components/DichVu/index';
import ThanhVien from '../../components/ThanhVien/index';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddTenant.css';
function AddTenant() {
    const [activeMenu, setActiveMenu] = useState(''); // State để quản lý menu đang hiển thị
    const navigate = useNavigate(); // Khởi tạo hook navigate

    // Hàm để chọn menu
    const handleMenuClick = (menu) => {
        setActiveMenu(menu); // Chọn menu để hiển thị
    };

    // Hàm để quay về trang ban đầu
    const handleGoBack = () => {
        navigate('/tenants'); // Điều hướng về trang danh sách tenants
    };

    return (
        <div className="add-menu">
            <div className='header-form'>
                <button className='themkhachthue'>
                    <FontAwesomeIcon icon={faPlus} /> Thêm khách thuê phòng
                </button>
                <button className='quayve' onClick={handleGoBack}> {/* Sử dụng handleGoBack khi nhấn Quay về */}
                    <FontAwesomeIcon icon={faTimes} /> Quay về
                </button>
                <button className='luu'>
                    <FontAwesomeIcon icon={faCheck} /> Lưu
                </button>
            </div>
            <div className='body-form'>
                <button className='AddInformation' onClick={() => handleMenuClick('thongTin')}>Thông Tin</button>
                <button className='AddService' onClick={() => handleMenuClick('dichVu')}>Dịch Vụ</button>
                <button className='AddTenants' onClick={() => handleMenuClick('thanhvien')}>Thành Viên</button>
            </div>

            {/* Hiển thị nội dung dựa trên menu đang được chọn */}
            {activeMenu === 'thongTin' && <ThongTin />}
            {activeMenu === 'dichVu' && <DichVu />}
            {activeMenu === 'thanhvien' && <ThanhVien />}
        </div>
    );
}

export default AddTenant;
