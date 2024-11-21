import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Invoice.css';
import axios from "axios";

function Invoice() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [data, setData] = useState(false); // true = không có dữ liệu
    const [invoice, setInvoice] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    const fetchInvoices = useCallback(async () => {
        try {
            const params = {};
            if (month) params.thang = month;
            if (year) params.nam = year;
            if (room) params.tenphong = room;
            if (floor) params.tang = floor;
            const response = await axios.get('https://qlpt.onrender.com/api/ttkt/tongtien', { params });
            const data = response.data;
            setData(data.length === 0); // Nếu không có dữ liệu thì setData là true
            setInvoice(data);
        } catch (error) {
            console.error("Error", error);
        }
    }, [month, year, room, floor]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const handleSearchClick = () => {
        if (searchClicked) {
            // Reset tất cả các giá trị khi nhấn lần thứ hai
            setMonth('');
            setYear('');
            setRoom('');
            setFloor('');
            setSearchClicked(false); // Đặt lại trạng thái nút
        } else {
            setSearchClicked(true); // Đánh dấu là đã tìm kiếm
        }
        fetchInvoices(); // Gọi hàm fetchInvoices để lấy dữ liệu với các điều kiện hiện tại
    };

    return (
        <div className="container-invoice">
            <div className='header-invoice'>
                <h2 className='invoice-h2'>Chi Tiết Hóa Đơn</h2>
                <div className='btn-invoice'>
                    <button className="button">
                        <FontAwesomeIcon icon={faFileExcel} /> Xuất file excel
                    </button>
                    <button className="button">
                        <FontAwesomeIcon icon={faPrint} /> In danh sách
                    </button>
                    <button className="button">
                        <FontAwesomeIcon icon={faTrash} /> Xóa
                    </button>
                </div>
            </div>
            <div className='body-invoice'>
                <div className='row1-invoice'>
                    <div className='invoice-thang'>
                        <h2>Tháng</h2>
                        <input
                            className='thang-invoice'
                            type="text"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            onInput={(e) =>{
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                            }}
                            maxLength={2}
                        />
                    </div>
                    <div className='invoice-nam'>
                        <h2>Năm</h2>
                        <input
                            className='nam-invoice'
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onInput={(e) =>{
                                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                            }}
                            maxLength={4}
                        />
                    </div>
                    <div className='btn-row1'>
                        <button className='invoice-search' onClick={handleSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> Xem
                        </button>
                    </div>
                </div>

                <div className='row2-invoice'>
                    <div className='invoice-tang'>
                        <h2>Tầng</h2>
                        <input
                            className='tang-invoice'
                            type="text"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                        />
                    </div>
                    <div className='invoice-phong'>
                        <h2>Phòng</h2>
                        <input
                            className='phong-invoice'
                            type="text"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='table-invoice'>
                <table className="table-invoice-table">
                    <thead>
                        <tr>
                            <th>Phòng</th>
                            <th>Tầng</th>
                            <th>Họ tên khách</th>
                            <th>Tiền phòng</th>
                            <th>Tiền điện</th>
                            <th>Tiền nước</th>
                            <th>Dịch vụ khác</th>
                            <th>Thời gian</th>
                            <th>Tổng tiền(VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                            </tr>
                        ) : (
                            invoice.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.tenphong}</td>
                                    <td>{item.tang}</td>
                                    <td>{item.tenkt}</td>
                                    <td>{item.tienphong}</td>
                                    <td>{item.tiendien}</td>
                                    <td>{item.tiennuoc}</td>
                                    <td>{item.tiendv}</td>
                                    <td>{item.thang}/{item.nam}</td>
                                    <td>{item.tongtien}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Invoice;
