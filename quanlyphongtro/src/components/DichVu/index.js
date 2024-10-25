import React from "react";
import Table from 'react-bootstrap/Table';  // Đã import đúng
import 'bootstrap/dist/css/bootstrap.min.css';

function DichVu() {
    return (  
      <div className="container-dichvu">
        <div className="table-container">
          <Table striped bordered hover> {/* Sử dụng Table từ react-bootstrap */}
            <thead>
              <tr>
                <th>Chọn</th>
                <th>Dịch vụ sử dụng</th>
                <th>Đơn giá (VND)</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Điện</td>
                <td>3000</td>
                <td><input type="number" value="1" min="1" /></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Nước</td>
                <td>2000</td>
                <td><input type="number" value="1" min="1" /></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Gửi xe</td>
                <td>2000</td>
                <td><input type="number" value="1" min="1" /></td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>Rác</td>
                <td>50000</td>
                <td><input type="number" value="1" min="1" /></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
}

export default DichVu;
