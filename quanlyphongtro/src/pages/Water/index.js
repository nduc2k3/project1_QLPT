import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from '../../components/DropDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Water.css';
import axios from "axios";

function Water() {    
    const item3 = [
        "Tất cả", "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024", 
        "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024"
    ];

    const [month, setMonth] = useState("Tháng/Năm");
    const [listWater, setListWater] = useState([]);
    const [noData, setNoData] = useState(false);

    // Hàm để lấy toàn bộ số nước
    const fetchAllWater = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/diennuoc/sonuoc');
            const dataN = response.data;

            if (dataN.length > 0) {
                setListWater(dataN);
                setNoData(false);
            } else {
                setListWater([]);
                setNoData(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setListWater([]);
            setNoData(true);
        }
    };

    // Gọi API để lấy dữ liệu ban đầu
    useEffect(() => {
        fetchAllWater();   
    }, []);
    
    // Hàm xử lý khi thay đổi tháng
    const handleMonthStatusChange = async (selectedMonthYear) => {
        setMonth(selectedMonthYear);

        // Nếu chọn "Tất cả", hiển thị tất cả dữ liệu
        if (selectedMonthYear === "Tất cả") {
            fetchAllWater();
            return;
        }

        // Tách tháng và năm từ chuỗi đã chọn
        const [selectedMonth, selectedYear] = selectedMonthYear.split('/');
        try {
            const response = await axios.get(`http://localhost:8080/api/diennuoc/sonuocmonth?thang=${selectedMonth}&nam=${selectedYear}`);
            const dataN = response.data;

            if (dataN.length > 0) {
                setListWater(dataN);
                setNoData(false);
            } else {
                setListWater([]);
                setNoData(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setListWater([]);
            setNoData(true);
        }
    };

    return (
        <div className="container-water">
            <div className="header-water">
                <h2>Tháng/Năm</h2>
                <Dropdown
                    defaultItem={month}
                    items={item3}
                    onItemSelected={handleMonthStatusChange}
                />
            </div>
            <div className="table-water">
                {noData ? (
                    <p>Không có dữ liệu</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nhà</th>
                                <th>Phòng</th>
                                <th>Khách</th>
                                <th>Chỉ Số Nước</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listWater.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.tang}</td>
                                    <td>{row.tenphong}</td>
                                    <td>{row.tenkt}</td>
                                    <td>{row.sonuoc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default Water;
