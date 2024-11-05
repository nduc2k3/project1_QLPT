import './Tenants.css';
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint, faTrash, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Tenants() {
    const navigate = useNavigate();
    const [tenants, setTenants] = useState([]);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    const [noData, setNoData] = useState(false);
    const [searchClickCount, setSearchClickCount] = useState(0);
    const [selectedMakt, setSelectedMakt] = useState(null); // Trạng thái để lưu mã khách đã chọn

    const fetchTenants = useCallback(async () => {
        try {
            const params = {};
            if (month) params.thang = month;
            if (year) params.nam = year;
            if (floor) params.tang = floor;
            if (room) params.tenphong = room;

            const response = await axios.get('http://localhost:8080/api/ttkt/danhsach', { params });
            const data = response.data;

            setNoData(data.length === 0);
            setTenants(data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }, [month, year, floor, room]);

    useEffect(() => {
        fetchTenants();
    }, [fetchTenants]);

    const handleAddClick = () => {
        navigate('/addtenant');
    };

    const handleSearchClick = () => {
        setSearchClickCount((prev) => prev + 1);
        fetchTenants();

        if (searchClickCount >= 1) {
            setMonth('');
            setYear('');
            setFloor('');
            setRoom('');
        }
    };

    const handleRowClick = (makt) => {
        setSelectedMakt(makt); // Lưu mã khách đã chọn
    };

    const handleDeleteClick = async () => {
        if (selectedMakt) {
            try {
                await axios.delete(`http://localhost:8080/api/tenant/${selectedMakt}`); // Gọi API xóa
                fetchTenants(); // Cập nhật lại danh sách sau khi xóa
                setSelectedMakt(null); // Reset mã khách đã chọn
            } catch (error) {
                console.error("Lỗi khi xóa khách thuê:", error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <div className="container-tenants">
            <div className='header-tenants'>
                <h2 className='tenants-h2'>Danh sách khách thuê</h2>
                <div className='btn-tenants'>
                    <button className="button">
                        <FontAwesomeIcon icon={faFileExcel} /> Xuất file excel
                    </button>
                    <button className="button">
                        <FontAwesomeIcon icon={faPrint} /> In danh sách
                    </button>
                    <button className="button" onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} /> Xóa
                    </button>
                </div>
            </div>

            <div className='body-tenants'>
                <div className='row1-tenants'>
                    <div className='tenants-thang'>
                        <h2>Tháng</h2>
                        <input
                            className='thang-tenants'
                            type="text"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </div>
                    <div className='tenants-nam'>
                        <h2>Năm</h2>
                        <input
                            className='nam-tenants'
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                    <div className='btn-row1'>
                        <button className='tenants-search' onClick={handleSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} /> Xem
                        </button>
                        <button className='tenants-add' onClick={handleAddClick}>
                            <FontAwesomeIcon icon={faPlus} /> Thêm
                        </button>
                    </div>
                </div>

                <div className='row2-tenants'>
                    <div className='tenants-tang'>
                        <h2>Tầng</h2>
                        <input
                            className='tang-tenants'
                            type="text"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                        />
                    </div>
                    <div className='tenants-phong'>
                        <h2>Phòng</h2>
                        <input
                            className='phong-tenants'
                            type="text"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='table-tenants'>
                {noData ? (
                    <p>Không có dữ liệu</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>CCCD</th>
                                <th>SĐT</th>
                                <th>Thuê phòng</th>
                                <th>Tầng</th>
                                <th>Ngày thuê</th>
                                <th>Ngày hết hạn HĐ</th>
                                <th>Tiền thuê</th>
                                <th>Đã đóng (VND)</th>
                                <th>Còn lại (VND)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.map((tenant, index) => (
                                <tr key={index} onClick={() => handleRowClick(tenant.makt)} style={{ cursor: 'pointer', backgroundColor: selectedMakt === tenant.makt ? '#f2f2f2' : 'transparent' }}>
                                    <td>{tenant.tenkt}</td>
                                    <td>{formatDate(tenant.ngaysinh)}</td>
                                    <td>{tenant.cccd}</td>
                                    <td>{tenant.sdt}</td>
                                    <td>{tenant.tenphong}</td>
                                    <td>{tenant.tang}</td>
                                    <td>{formatDate(tenant.ngaythue)}</td>
                                    <td>{formatDate(tenant.ngayhethanhd)}</td>
                                    <td>{tenant.tienphong}</td>
                                    <td>{tenant.dadong}</td>
                                    <td>{tenant.conlai}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default Tenants;
