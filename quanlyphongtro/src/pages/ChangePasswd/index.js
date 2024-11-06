import React from "react";
import './ChangePasswd.css';
function ChangePasswd() {
    return (  
        <div className="container-changepasswd">
            <h2>Đổi Mật Khẩu</h2>
            <div className="row1-change">
                <label>Mật khẩu hiện tại</label>
                <input></input>
                <button>Lưu</button>
            </div>
            <div className="row2-change">
                <label>Mật khẩu mới</label>
                <input></input>
            </div>
            <div className="row3-change">
                <label>Xác nhận mật khẩu mới</label>
                <input></input>
            </div>
        </div>
    );
}

export default ChangePasswd;