import React, { useState, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Sử dụng useLayoutEffect để thêm class vào body
    useLayoutEffect(() => {
        document.body.classList.add('login-page');
        document.title = 'Đăng Nhập - Nhà Trọ';
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!validateEmail(email)) {
            setError("Email không hợp lệ.");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Mật khẩu phải có 8 kí tự trở lên.");
            setLoading(false);
            return;
        }

        try {
            // Gửi email và password lên API
            const response = await axios.post('https://qlpt.onrender.com/api/acc/login', { email, password });
            const { result, message } = response.data;

            if (result === 1) {
                alert(message);
                localStorage.setItem('email', email);
                onLoginSuccess();
                navigate("/home");
            } else {
                setError(message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container col-4'>
            <h2 className="title-login">Đăng Nhập</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <label className="text-login">Email or username</label>
            <input
                type='email'
                placeholder='Tên tài khoản...'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <input
                type='password'
                placeholder='Mật khẩu...'
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
