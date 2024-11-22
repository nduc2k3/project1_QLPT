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
            const response = await axios.post('https://qlpt.onrender.com/api/dichvu', newService);
            if(response.data && response.data.message){
                alert(response.data.message);
                handleBack();
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                alert(error.response.data.message);
                setMaDV('');
                setTenDV('');
                setGiaDV('');
            }
            console.error(error);
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
