import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from '../../components/DropDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Electricity.css';
function Electricity() {
    // Dữ liệu mẫu về chỉ số điện
    const data = [
        { nha: 'Nhà A', phong: 'Phòng 101', khach: 'Nguyễn Văn A', chiSoDien: 120 },
        { nha: 'Nhà A', phong: 'Phòng 102', khach: 'Trần Văn B', chiSoDien: 150 },
        { nha: 'Nhà B', phong: 'Phòng 201', khach: 'Lê Thị C', chiSoDien: 130 },
        { nha: 'Nhà B', phong: 'Phòng 202', khach: 'Phạm Văn D', chiSoDien: 140 },
    ];
    const item3 = [
        "01/2024","02/2024","03/2024","04/2024","05/2024","06/2024","07/2024","08/2024","09/2024","10/2024","11/2024","12/2024"
    ];
    const[month,setMonth] = useState("Tháng/Năm");
    const handleMonthStatusChange = (item) =>{
       setMonth(item);
    }
    return ( 
        <div className="container-electricity">
          <div className="header-electricity">
            <h2>Tháng/Năm</h2>
            <Dropdown
              defaultItem={month}
              items={item3}
              onItemSelected = {handleMonthStatusChange}
            />
          </div>
          <div className="table-electricity">
            <Table striped bordered hover>
              <thead>
                <tr>
                    <th>Nhà</th>
                    <th>Phòng</th>
                    <th>Khách</th>
                    <th>Chỉ Số Điện</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.nha}</td>
                    <td>{row.phong}</td>
                    <td>{row.khach}</td>
                    <td>{row.chiSoDien}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
     );
}

export default Electricity;
