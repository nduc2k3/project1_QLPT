import React, { useState } from "react";
import axios from "axios"; // Import axios để gửi yêu cầu API
import './ChangePasswd.css';

function ChangePasswd() {
    // State để lưu giá trị input
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Hàm xử lý lưu mật khẩu mới
    const handleSave = async () => {
        const storedPassword = localStorage.getItem('password'); // Lấy mật khẩu từ localStorage
        const email = localStorage.getItem('email'); // Lấy email từ localStorage
        if(!currentPassword || !newPass || !confirmPassword){
            setError('Vui lòng nhập đầy đủ thông tin!');
            setSuccess('');
            return;
        }

        // Kiểm tra mật khẩu hiện tại
        if (currentPassword !== storedPassword) {
            setError('Mật khẩu hiện tại không chính xác');
            setSuccess('');
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
        if (newPass !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            setSuccess('');
            return;
        }

        // Kiểm tra mật khẩu mới có ít nhất 8 ký tự không
        if (newPass.length < 8) {
            setError('Mật khẩu mới phải có ít nhất 8 ký tự');
            setSuccess('');
            return;
        }

        try {
            // Gửi yêu cầu cập nhật mật khẩu mới đến API
            const response = await axios.put('https://qlpt.onrender.com/api/acc', {
                email: email, // Email người dùng
                newPass: newPass // Mật khẩu mới
            });

            // Kiểm tra nếu cập nhật thành công
            if (response.status === 200) {
                localStorage.setItem('password', newPass); // Lưu mật khẩu mới vào localStorage
                setSuccess('Mật khẩu đã được thay đổi thành công');
                setError('');
                setNewPass(''); // Reset form sau khi lưu thành công
                setCurrentPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi cập nhật mật khẩu');
            setSuccess('');
        }
    };

    return (
        <div className="container-changepasswd">
            <h2>Đổi Mật Khẩu</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Hiển thị thông báo thành công */}

            <div className="row1-change">
                <label>Mật khẩu hiện tại</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="row2-change">
                <label>Mật khẩu mới</label>
                <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                />
            </div>
            <div className="row3-change">
                <label>Xác nhận mật khẩu mới</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Lưu</button>
        </div>
    );
}

export default ChangePasswd;
