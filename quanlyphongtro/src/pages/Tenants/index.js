import './Tenants.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint, faTrash, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Tenants() {
    const navigate = useNavigate(); // Khởi tạo hook navigate

    // Hàm để xử lý sự kiện khi click nút "Thêm"
    const handleAddClick = () => {
        navigate('/addtenant'); // Điều hướng tới trang thêm khách thuê
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
                    <button className="button">
                        <FontAwesomeIcon icon={faTrash} /> Xóa
                    </button>
                </div>
            </div>

            <div className='body-tenants'>
                <div className='row1-tenants'>
                    <div className='tenants-thang'>
                        <h2>Tháng</h2>
                        <input className='thang-tenants' type="text" />
                    </div>
                    <div className='tenants-nam'>
                        <h2>Năm</h2>
                        <input className='nam-tenants' type="text" />
                    </div>
                    <div className='btn-row1'>
                        <button className='tenants-search'>
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
                        <input className='tang-tenants' type="text" />
                    </div>
                    <div className='tenants-phong'>
                        <h2>Phòng</h2>
                        <input className='phong-tenants' type="text" />
                    </div>
                </div>
            </div>

            <div className='table-tenants'>
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
                </Table>
            </div>
        </div>
    );
}

export default Tenants;
