import React, { useState, useEffect } from "react";
import axios from "axios";
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

    const [suggestions, setSuggestions] = useState([]);

    // Gọi API để lấy danh sách phòng trống
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("https://qlpt.onrender.com/api/room");
                const availableRooms = response.data.filter(room => room.trangthaiphong === false);
                setSuggestions(availableRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

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
                    type="text"
                    className='hoten-form'
                    name='tenkt'
                    value={formData.tenkt}
                    onChange={handleChange}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[0-9]/g, '');
                    }}
                    required
                />
                <label style={{ paddingLeft: '20px' }}>CCCD</label>
                <input
                    className='cccd-form'
                    name='cccd'
                    value={formData.cccd}
                    onChange={handleChange}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[a-zA-Z]/g, '');
                    }}
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
                    onInput={(e) =>{
                        e.target.value = e.target.value.replace(/[a-zA-Z]/g, '');
                    }}
                    required
                />
                <label style={{ paddingLeft: '20px' }}>Ngày cấp</label>
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
                <label style={{ paddingLeft: '20px' }}>Ngày sinh</label>
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
                <label style={{ paddingLeft: '20px' }}>Nơi sinh</label>
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
                    list="room-suggestions" // Gắn datalist cho autocomplete
                    required
                />
                <datalist id="room-suggestions">
                    {suggestions.map(room => (
                        <option key={room._id} value={room.maphong}>
                            {room.tenphong}
                        </option>
                    ))}
                </datalist>
                <label style={{ paddingLeft: '20px' }}>Tiền phòng</label>
                <input
                    className="tienphong-form"
                    name="tienphong"
                    value={formData.tienphong}
                    onChange={handleChange}
                    onInput={(e) =>{
                        e.target.value = e.target.value.replace(/[a-zA-Z]/g, '');
                    }}
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
