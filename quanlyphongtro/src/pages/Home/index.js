import React from "react";
import './Home.css';
function Home() {
    return (  
        <div className="home-container">
            <div className="row1">
                <div className="trangthai-home">
                    <h2>Trạng Thái</h2>
                    <div className="input">
                        <input className="Ngay"/>
                        <input className="Thang"/>
                    </div>
                    <div className="box">
                        
                    </div>
                </div>
                <div className="doanhthu">
                    <h2>Doanh Thu</h2>
                    <div className="box">
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="danhsachphong">
                    <h2>Danh Sách Phòng Trống</h2>
                    <div className="box">

                    </div>
                </div>
                <div className="danhsachkhach">
                    <h2>Danh Sách Khách Nợ Tiền Phòng</h2>
                    <div className="box">

                    </div>
                </div>
            </div>
            <div className="row3">
                <div className="gopy">
                    <h2>Góp Ý Cải Thiện Phần Mềm</h2>
                    <div className="box">
                        <ul>
                            <li>Ứng dụng sử dụng khá mượt mà</li>
                            <li>Ứng dụng thỉnh thoảng bị trục trặc .Mong bên nhà phát hành sửa lỗi này </li>
                            <li>Ứng dụng đã có những trải nghiệm rất tốt</li>
                            <li>Thật tuyệt vời</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;