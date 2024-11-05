import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import ThongTin from '../../components/ThongTin/index';
import DichVu from '../../components/DichVu/index';
import ThanhVien from '../../components/ThanhVien/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddTenant.css';

function AddTenant() {
    const [activeMenu, setActiveMenu] = useState('thongTin');
    const [tenantData, setTenantData] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleMenuClick = (menu) => setActiveMenu(menu);

    const handleGoBack = () => navigate('/tenants');

    const handleDataChange = (data) => setTenantData(data);

    const handleSave = async () => {
        // Kiểm tra các trường cần thiết
        const requiredFields = [
            'makt', 'tenkt', 'sdt', 'email', 'diachitt', 
            'maphong', 'ngaythue', 'cccd', 'ngaycap', 
            'ngaysinh', 'noisinh', 'tienphong'
        ];
        
        const isValid = requiredFields.every(field => tenantData[field]);

        if (!isValid) {
            setMessage('Vui lòng nhập đầy đủ thông tin trước khi lưu.');
            // Tắt thông báo sau 3 giây
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        } else {
            setMessage('');
        }

        try {
            await axios.post('http://localhost:8080/api/tenant', tenantData);
            alert('Thông tin đã được lưu thành công!');
            navigate('/tenants');
        } catch (error) {
            alert('Có lỗi xảy ra khi lưu thông tin.');
            console.error(error);
        }
    };

    return (
        <div className="add-menu">
            <div className='header-form'>
                <button className='themkhachthue'>
                    <FontAwesomeIcon icon={faPlus} /> Thêm khách thuê phòng
                </button>
                <button className='quayve' onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faTimes} /> Quay về
                </button>
                <button className='luu' onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} /> Lưu
                </button>
            </div>
            {/* Hiển thị thông báo lỗi ở đầu */}
            {message && <p className="error-message">{message}</p>}
            <div className='body-form'>
                <button className='AddInformation' onClick={() => handleMenuClick('thongTin')}>Thông Tin</button>
                <button className='AddService' onClick={() => handleMenuClick('dichVu')}>Dịch Vụ</button>
                <button className='AddTenants' onClick={() => handleMenuClick('thanhvien')}>Thành Viên</button>
            </div>
            {activeMenu === 'thongTin' && <ThongTin onDataChange={handleDataChange} />}
            {activeMenu === 'dichVu' && <DichVu />}
            {activeMenu === 'thanhvien' && <ThanhVien />}
        </div>
    );
}

export default AddTenant;
