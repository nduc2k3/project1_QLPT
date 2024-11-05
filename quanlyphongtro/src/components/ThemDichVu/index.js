import React, { useState } from "react";
import './ThemDichVu.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ThemDichVu() {
    const navigate = useNavigate();

    // State để lưu trữ thông tin dịch vụ
    const [madv, setMaDV] = useState('');
    const [tendv, setTenDV] = useState('');
    const [giatien, setGiaDV] = useState('');

    const handleBack = () => {
        navigate('/service');
    };

    const handleSave = async () => {
        // Kiểm tra nếu các trường không được nhập
        if (!madv || !tendv || !giatien) {
            alert("Vui lòng nhập đầy đủ thông tin: Mã DV, Tên DV và Giá DV.");
            return; // Dừng hàm nếu không đủ dữ liệu
        }

        try {
            const newService = {
                madv,
                tendv,
                giatien
            };

            // Gửi yêu cầu POST đến API
            const response = await axios.post('http://localhost:8080/api/dichvu', newService);
            alert("Dịch Vụ Được Thêm Thành Công",response.data); // Thông báo cho người dùng

            // Chuyển hướng trở lại trang danh sách dịch vụ
            handleBack();
        } catch (error) {
            console.error("Có lỗi khi thêm dữ liệu:", error);
            alert("Có lỗi xảy ra khi thêm dịch vụ. Vui lòng thử lại."); // Thông báo lỗi cho người dùng
        }
    };

    return (  
        <div>
            <div className="container-ThemDV">
                <label>Mã DV</label> 
                <input 
                    className="madv-them" 
                    value={madv} 
                    onChange={(e) => setMaDV(e.target.value)} 
                />
                <label>Tên DV</label>
                <input 
                    className="tendv-them" 
                    value={tendv} 
                    onChange={(e) => setTenDV(e.target.value)} 
                />
                <label>Giá DV</label>
                <input 
                    className="giadv-them" 
                    value={giatien} 
                    onChange={(e) => setGiaDV(e.target.value)} 
                />
                <button className="save-them" onClick={handleSave}>Lưu</button>
                <button className="back-them" onClick={handleBack}>Quay Lại</button>
            </div>
        </div>
    );
}

export default ThemDichVu;
