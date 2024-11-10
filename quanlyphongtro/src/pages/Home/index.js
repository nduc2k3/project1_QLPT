import React, { useState, useEffect } from "react";
import './Home.css';
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
    const [listRoom, setListRoom] = useState([]);
    const [paidRevenue, setPaidRevenue] = useState(0); // Revenue for paid rooms
    const [unpaidRevenue, setUnpaidRevenue] = useState(0); // Revenue for unpaid rooms
    const fetchRoom = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/room/');
            const data = response.data;
            setListRoom(data);

            // Calculate revenue for paid and unpaid rooms
            const paid = data
                .filter(room => room.trangthaitt === true) // Phòng đã thanh toán
                .reduce((sum, room) => sum + room.giaphong, 0);

            const unpaid = data
                .filter(room => room.trangthaitt === false) // Phòng chưa thanh toán
                .reduce((sum, room) => sum + room.giaphong, 0);

            setPaidRevenue(paid);
            setUnpaidRevenue(unpaid);
        } catch (error) {
            console.error("Error", error);
        }
    };

    useEffect(() => {
        fetchRoom();
    }, []);

    const roomStatusData = {
        labels: ['Phòng Trống', 'Phòng Đã Thuê'], // Labels for the two room statuses
        datasets: [
            {
                label: 'Trạng Thái Phòng',
                data: [
                    listRoom.filter(room => room.trangthaiphong === false).length, // Room status false (trống)
                    listRoom.filter(room => room.trangthaiphong === true).length,  // Room status true (đã thuê)
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',  // Color for empty rooms
                    'rgba(255, 99, 132, 0.2)',  // Color for occupied rooms
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',    // Border color for empty rooms
                    'rgba(255, 99, 132, 1)',    // Border color for occupied rooms
                ],
                borderWidth: 1,
            },
        ],
    };

    const revenueData = {
        labels: ['Doanh Thu Đã Thanh Toán', 'Doanh Thu Chưa Thanh Toán'], // Labels for paid and unpaid revenue
        datasets: [
            {
                label: 'Doanh Thu',
                data: [
                    paidRevenue,      // Paid revenue
                    unpaidRevenue,    // Unpaid revenue
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',  // Color for paid revenue
                    'rgba(255, 159, 64, 0.2)',  // Color for unpaid revenue
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',    // Border color for paid revenue
                    'rgba(255, 159, 64, 1)',    // Border color for unpaid revenue
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Doanh Thu',
            },
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="home-container">
            <div className="row1">
                <div className="trangthai-home">
                    <h2>Trạng Thái</h2>
                    <div className="box">
                        {/* Bar chart for room status */}
                        <Bar data={roomStatusData} options={chartOptions} height={200} />
                    </div>
                </div>
                <div className="doanhthu">
                    <h2>Doanh Thu</h2>
                    <div className="box">
                        {/* Bar chart for revenue */}
                        <Bar data={revenueData} options={chartOptions} height={200} />
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="danhsachphong">
                    <h2>Danh Sách Phòng Trống</h2>
                    <div className="box">
                        <ul>
                            {listRoom
                                .filter(room => !room.trangthaiphong) // Lọc các phòng trống
                                .map(room => (
                                    <li key={room._id}>
                                        {room.tenphong} - Giá: {room.giaphong.toLocaleString()} VND
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className="danhsachkhach">
                    <h2>Danh Sách Khách Nợ Tiền Phòng</h2>
                    <div className="box">
                        <ul>
                            {listRoom
                                .filter(room => !room.trangthaitt) // Lọc các phòng chưa thanh toán
                                .map(room => (
                                    <li key={room._id}>
                                        {room.tenphong} - Nợ: {room.giaphong.toLocaleString()} VND
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row3">
                <div className="gopy">
                    <h2>Góp Ý Cải Thiện Phần Mềm</h2>
                    <div className="box">
                        <ul>
                            <li>Ứng dụng sử dụng khá mượt mà</li>
                            <li>Ứng dụng thỉnh thoảng bị trục trặc. Mong bên nhà phát hành sửa lỗi này</li>
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
