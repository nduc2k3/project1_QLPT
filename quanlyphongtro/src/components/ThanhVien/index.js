import React from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ThanhVien.css';
function ThanhVien() {
    return ( 
      <div className="container-thanhvien">
        <div className="makt-thanhvien">
            <label>Mã Khách Thuê</label>
            <input className="makt-thanhvien"></input>
        </div>
        <Table striped bordered hover className="table-thanhvien">
            <thead>
                <tr>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>CCCD/CMND</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input></input></td>
                    <td><input/></td>
                    <td><input type="text"/></td> {/* Thay thế select bằng input */}
                    <td><input type="text"/></td>
                    <td><input type="text"></input></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td><input></input></td>
                    <td><input/></td>
                    <td><input type="text"/></td> {/* Thay thế select bằng input */}
                    <td><input type="text"/></td>
                    <td><input type="text"></input></td>
                    <td><input type="text"/></td>
                </tr>
                <tr>
                    <td><input></input></td>
                    <td><input/></td>
                    <td><input type="text"/></td> {/* Thay thế select bằng input */}
                    <td><input type="text"/></td>
                    <td><input type="text"></input></td>
                    <td><input type="text"/></td>
                </tr>
            </tbody>
        </Table>
      </div>
    );
}

export default ThanhVien;
