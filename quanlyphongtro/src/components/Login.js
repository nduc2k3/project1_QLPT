import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate để điều hướng

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apiEmails, setApiEmails] = useState([]); // Thay đổi thành mảng để lưu nhiều email
    const [apiPassword, setApiPassword] = useState("password123"); // Mật khẩu mẫu
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Khởi tạo navigate

    // Gọi API để lấy tất cả email từ server
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users'); // API lấy danh sách người dùng
                const users = response.data.data; // Danh sách người dùng

                // Lấy tất cả email từ danh sách người dùng
                const emails = users ? users.map(user => user.email) : [];
                setApiEmails(emails); // Lưu email vào state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password.length < 8) {
            setError("Mật khẩu phải có 8 kí tự trở lên");
            setLoading(false);
            return;
        }

        // So sánh dữ liệu người dùng nhập vào với dữ liệu từ API
        if (apiEmails.includes(email) && password === apiPassword) {
            alert('Đăng nhập thành công!');
            onLoginSuccess(); // Gọi hàm onLoginSuccess khi đăng nhập thành công
            navigate("/home"); // Sử dụng navigate để điều hướng đến trang Home
        } else {
            setError("Đăng nhập thất bại. Email hoặc mật khẩu không đúng.");
        }

        setLoading(false);
    };

    return (
        <div className='login-container col-4'>
            <div className="title-login">Đăng Nhập</div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="text-login">Email or username</div>
            <input
                type='email'
                placeholder='Tên tài khoản...'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <input
                type='password'
                placeholder='Password...'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />

            <button
                className={`btn btn-primary w-100 mt-3 ${email && password ? "active" : ""}`}
                onClick={handleLogin}
                disabled={loading || !(email && password)}
            >
                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
        </div>
    );
};

export default Login;
