import React from "react";
import './ThongTin.css';
function ThongTin() {
    return ( 
      <div className='container-information'>
        <div className='row1-infor'>
            <label>Họ tên</label>
            <input className='hoten-form'></input>
            <label >CCCD</label>
            <input className='cccd-form'></input>
        </div>
        <div className='row2-infor'>
            <label><input type='checkbox'></input>Nam</label>
            <label><input type='checkbox'></input>Nữ</label>
        </div>
        <div className="row3-infor">
            <label>SĐT</label>
            <input className="sdt-form"></input>
            <label>Ngày cấp</label>
            <input className="ngaycap-form"></input>
        </div>
        <div className="row4-infor">
            <label>Email</label>
            <input className="email-form"></input>
            <label>Ngày sinh</label>
            <input className="ngaysinh-form"></input>
        </div>
        <div className="row5-infor">
            <label>Địa chỉ thường trú</label>
            <input className="diachia-form"></input>
            <label>Nơi sinh</label>
            <input className="noisinh-form"></input>
        </div>
        <div className="row6-form">
            <label>Số phòng</label>
            <input className="sophong-form"></input>
            <label>Tiền phòng</label>
            <input className="tienphong-form"></input>
        </div>
        <div className="row7-form">
            <label>Ngày thuê</label>
            <input className="ngaythue-form"></input>
        </div>
        <div className="row8-form">
            <label>Ghi chú</label>
            <input className="ghichu-form"></input>
        </div>
        <div className="row9-form">
            <label>Ảnh</label>
            <input className="anh-form"></input>
        </div>
      </div>
    );
}

export default ThongTin;