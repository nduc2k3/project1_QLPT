import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from '../../components/DropDown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Electricity.css';
import axios from "axios";

function Electricity() {
    const [listElectric, setListElectric] = useState([]);
    const [month, setMonth] = useState("Tháng/Năm");
    const [noData, setNoData] = useState(false);

    const item3 = [
        "Tất cả",
        "01/2024", "02/2024", "03/2024", "04/2024", "05/2024", "06/2024",
        "07/2024", "08/2024", "09/2024", "10/2024", "11/2024", "12/2024"
    ];

    // Hàm gọi API để lấy toàn bộ số điện
    const fetchAllElectric = async () => {
        try {
            const response = await axios.get('https://qlpt.onrender.com/api/diennuoc/sodien');
            const dataD = response.data;

            if (dataD.length > 0) {
                setListElectric(dataD);
                setNoData(false);
            } else {
                setListElectric([]);
                setNoData(true); // Không có dữ liệu
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setListElectric([]);
            setNoData(true); // Lỗi khi lấy dữ liệu, giả sử là không có dữ liệu
        }
    };

    // Gọi API để lấy dữ liệu ban đầu
    useEffect(() => {
        fetchAllElectric();
    }, []);

    const handleMonthStatusChange = async (selectedMonthYear) => {
        setMonth(selectedMonthYear);

        // Kiểm tra nếu người dùng chọn "Tất cả"
        if (selectedMonthYear === "Tất cả") {
            fetchAllElectric(); // Gọi hàm lấy toàn bộ dữ liệu
            return; // Kết thúc hàm để không gọi API tháng/năm
        }

        // Tách tháng và năm từ chuỗi đã chọn
        const [selectedMonth, selectedYear] = selectedMonthYear.split('/');

        // Gọi API với tháng và năm đã chọn
        try {
            const response = await axios.get(`https://qlpt.onrender.com/api/diennuoc/sodienmonth?thang=${selectedMonth}&nam=${selectedYear}`);
            const dataD = response.data;

            // Kiểm tra nếu dữ liệu có hay không
            if (dataD.length > 0) {
                setListElectric(dataD);
                setNoData(false);
            } else {
                setListElectric([]);
                setNoData(true); // Không có dữ liệu
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setListElectric([]);
            setNoData(true); // Lỗi khi lấy dữ liệu, giả sử là không có dữ liệu
        }
    };

    return (
        <div className="container-electricity">
            <div className="header-electricity">
                <h2 style={{paddingRight: '12px'}}>Tháng/Năm</h2>
                <Dropdown
                    defaultItem={month}
                    items={item3}
                    onItemSelected={handleMonthStatusChange}
                />
            </div>
            <div className="table-electricity">
                {noData ? (
                    <p>Không có dữ liệu</p>
                ) : (
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
                            {listElectric.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.tang}</td>
                                    <td>{row.tenphong}</td>
                                    <td>{row.tenkt}</td>
                                    <td>{row.sodien}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default Electricity;
