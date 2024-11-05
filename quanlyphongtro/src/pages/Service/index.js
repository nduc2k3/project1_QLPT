import React from "react";
import './Service.css';
import ThongTinDichVu from "../../components/ThongTinDichVu/index";
import LoaiDichVu from "../../components/LoaiDichVu/index";
import { useState } from "react";
function Service() {
    const[activeMenu,setActiveMenu] = useState('thongtindichvu')
    const handleMenuClick = (menu) => setActiveMenu(menu);
    return ( 
      <div>
        <div className="container-service">
            <div className="header-service">
                <p className={`TTDV ${activeMenu === 'thongtindichvu' ? 'active' : ''}`} onClick={() => handleMenuClick('thongtindichvu')}>Thông Tin Dịch Vụ</p>
                <p className={`LDV ${activeMenu === 'loaidichvu' ? 'active' : ''}`} onClick={() => handleMenuClick('loaidichvu')}>Loại Dịch Vụ</p>
            </div>
            {activeMenu === 'thongtindichvu' && <ThongTinDichVu/>}
            {activeMenu === 'loaidichvu' && <LoaiDichVu/>}
        </div>
      </div>
    );
}

export default Service;