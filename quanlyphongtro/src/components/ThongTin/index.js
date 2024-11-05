import React, { useState } from "react";
import './ThongTin.css';

function ThongTin({ onDataChange }) {
    const [formData, setFormData] = useState({
        makt: '',
        tenkt: '',
        sdt: '',
        email: '',
        diachitt: '',
        maphong: '',
        ngaythue: '',
        cccd: '',
        ngaycap: '',
        ngaysinh: '',
        noisinh: '',
        tienphong: '',
        ghichu: '',
        anh: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        onDataChange({ ...formData, [name]: value }); // Gửi dữ liệu về cho AddTenant
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Ngăn không cho gửi dữ liệu trong form
    };

    return (
        <form className='container-information' onSubmit={handleSubmit}>
            <div className='row1-infor'>
                <label>Họ tên</label>
                <input 
                    className='hoten-form' 
                    name='tenkt' 
                    value={formData.tenkt} 
                    onChange={handleChange} 
                    required
                />
                <label style={{paddingLeft:'20px'}}>CCCD</label>
                <input 
                    className='cccd-form' 
                    name='cccd' 
                    value={formData.cccd} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row2-infor">
                <label>Mã khách thuê</label>
                <input 
                    className="makt-form" 
                    name="makt" 
                    value={formData.makt} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row3-infor">
                <label>SĐT</label>
                <input 
                    className="sdt-form" 
                    name="sdt" 
                    value={formData.sdt} 
                    onChange={handleChange} 
                    required
                />
                <label style={{paddingLeft:'20px'}}>Ngày cấp</label>
                <input 
                    className="ngaycap-form" 
                    type="date" 
                    name="ngaycap" 
                    value={formData.ngaycap.split('T')[0]} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row4-infor">
                <label>Email</label>
                <input 
                    className="email-form" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                />
                <label style={{paddingLeft:'20px'}}>Ngày sinh</label>
                <input 
                    className="ngaysinh-form" 
                    type="date" 
                    name="ngaysinh" 
                    value={formData.ngaysinh.split('T')[0]} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row5-infor">
                <label>Địa chỉ thường trú</label>
                <input 
                    className="diachia-form" 
                    name="diachitt" 
                    value={formData.diachitt} 
                    onChange={handleChange} 
                    required
                />
                <label style={{paddingLeft:'20px'}}>Nơi sinh</label>
                <input 
                    className="noisinh-form" 
                    name="noisinh" 
                    value={formData.noisinh} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row6-form">
                <label>Mã phòng</label>
                <input 
                    className="sophong-form" 
                    name="maphong" 
                    value={formData.maphong} 
                    onChange={handleChange} 
                    required
                />
                <label style={{paddingLeft:'20px'}}>Tiền phòng</label>
                <input 
                    className="tienphong-form" 
                    type="number" 
                    name="tienphong" 
                    value={formData.tienphong} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row7-form">
                <label>Ngày thuê</label>
                <input 
                    className="ngaythue-form" 
                    type="date" 
                    name="ngaythue" 
                    value={formData.ngaythue.split('T')[0]} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="row8-form">
                <label>Ghi chú</label>
                <input 
                    className="ghichu-form" 
                    name="ghichu" 
                    value={formData.ghichu} 
                    onChange={handleChange}
                />
            </div>
            <div className="row9-form">
                <label>Ảnh</label>
                <input 
                    className="anh-form" 
                    name="anh" 
                    value={formData.anh} 
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}

export default ThongTin;
