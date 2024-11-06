import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Invoice.css';
function Invoice() {
    return (  
        <div className="container-invoice">
            <div className='header-invoice'>
                <h2 className='invoice-h2'>Danh sách khách thuê</h2>
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
                        />
                    </div>
                    <div className='invoice-nam'>
                        <h2>Năm</h2>
                        <input
                            className='nam-invoice'
                            type="text"
                        />
                    </div>
                    <div className='btn-row1'>
                        <button className='invoice-search'>
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
                        />
                    </div>
                    <div className='invoice-phong'>
                        <h2>Phòng</h2>
                        <input
                            className='phong-invoice'
                            type="text"
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
                            <th>Nợ tháng trước</th>
                            <th>Tông tiền(VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>    
            </div>
        </div>
    );
}

export default Invoice;