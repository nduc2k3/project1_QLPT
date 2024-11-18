import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ThanhVien.css';

function ThanhVien() {
    const [makt, setmakt] = useState("");
    const [data, setData] = useState([
        { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
        { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
        { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
    ]);

    const handleInputChange = (e, index, field) => {
        const newData = [...data];
        newData[index][field] = e.target.value;
        setData(newData);
    };

    const handleSave = async () => {
        if (!makt.trim()) {
            alert("Vui lòng nhập mã khách thuê!");
            return;
        }

        try {
            let savedCount = 0;
            for (let i = 0; i < data.length; i++) {
                const rowData = data[i];
                const isRowFilled = Object.values(rowData).every((value) => value.trim() !== "");

                if (isRowFilled) {
                    const payload = {
                        makt,
                        ...rowData,
                    };

                    // Gửi hàng dữ liệu đã điền đầy đủ
                    await axios.post("http://localhost:8080/api/thanhvien", payload, {
                        headers: { "Content-Type": "application/json" }
                    });

                    console.log(`Hàng ${i + 1} đã được lưu thành công`);
                    savedCount++;
                } else {
                    console.log(`Hàng ${i + 1} bị bỏ qua vì không điền đầy đủ thông tin`);
                }
            }
            if (savedCount > 0) {
                alert("Tất cả dữ liệu đã được lưu thành công!");
                // Reset form sau khi lưu thành công
                setmakt("");
                setData([
                    { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
                    { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
                    { tentv: "", ngaysinh: "", gioitinh: "", cccd: "", diachi: "", sdt: "" },
                ]);
            } else {
                alert("Không có hàng nào được lưu do thiếu thông tin.");
            }
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
            alert("Có lỗi xảy ra khi lưu dữ liệu.");
        }
    };

    return ( 
        <div className="container-thanhvien">
            <div className="makt-thanhvien">
                <label style={{ marginBottom: '12px' }}>Mã Khách Thuê</label>
                <input
                    className="makt-thanhvien"
                    style={{ marginBottom: '12px', marginLeft: '12px' }}
                    value={makt}
                    onChange={(e) => setmakt(e.target.value)}
                />
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
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td><input value={row.tentv} onChange={(e) => handleInputChange(e, index, 'tentv')} /></td>
                            <td><input type="date" value={row.ngaysinh} onChange={(e) => handleInputChange(e, index, 'ngaysinh')} /></td>
                            <td>
                                <select value={row.gioitinh} onChange={(e) => handleInputChange(e, index, 'gioitinh')}>
                                    <option value="">Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                            </td>
                            <td>
                                <input 
                                    value={row.cccd} 
                                    onChange={(e) => handleInputChange(e, index, 'cccd')} 
                                    onInput={(e) =>{
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
                                    }}
                                    maxLength={12}
                                />
                            </td>
                            <td><input value={row.diachi} onChange={(e) => handleInputChange(e, index, 'diachi')} /></td>
                            <td>
                                <input 
                                    value={row.sdt} 
                                    onChange={(e) => handleInputChange(e, index, 'sdt')}
                                    onInput={(e) =>{
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
                                    }} 
                                    maxLength={11}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <button className="Luu-tv" onClick={handleSave}>Lưu</button>
        </div>
    );
}

export default ThanhVien;
