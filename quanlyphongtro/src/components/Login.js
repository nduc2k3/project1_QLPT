import React, { useState, useEffect, useLayoutEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [apiEmails, setApiEmails] = useState([]);
    const [apiPasswords, setApiPasswords] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Sử dụng useLayoutEffect để đảm bảo class được thêm trước khi render
    useLayoutEffect(() => {
        document.body.classList.add('login-page');

        return () => {
            document.body.classList.remove('login-page'); // Xóa class khi component unmount
        };
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/acc');
                const users = response.data || [];
                setApiEmails(users.map(user => user.email));
                setApiPasswords(users.map(user => user.password));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
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

        if (apiEmails.includes(email) && apiPasswords.includes(password)) {
            // Lưu thông tin email và password vào localStorage
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            alert('Đăng nhập thành công!');
            onLoginSuccess();
            navigate("/home");
        } else {
            setError("Đăng nhập thất bại. Email hoặc mật khẩu không đúng.");
        }

        setLoading(false);
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
