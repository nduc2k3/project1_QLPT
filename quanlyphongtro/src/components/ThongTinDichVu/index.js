import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
function ThongTinDichVu() {
    const [service,setService] = useState([]);
    const fetchService = async () =>{
        try{
            const respone = await axios.get('https://qlpt.onrender.com/api/ttkt/listdv');
            const data = respone.data;
            setService(data);
        } catch(error){
            console.error("Có lỗi khi lấy dữ liệu:", error);
        }
    };
    useEffect(() =>{
        fetchService();
        document.title = "Thông Tin Dịch Vụ - Nhà Trọ";
    },[]);
    return (  
        <div>
            <div className="container-ttdv">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Phòng</th>
                            <th>Mã KT</th>
                            <th>Tên KT</th>
                            <th>Dịch Vụ</th>
                            <th>Số Tiền</th>
                            <th>Số Lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            service.map((service,index) =>(
                                <tr key={index}>
                                    <td>{service.tenphong}</td>
                                    <td>{service.makt}</td>
                                    <td>{service.tenkt}</td>
                                    <td>{service.tendv}</td>
                                    <td>{parseInt(service.giatien).toLocaleString('vi-VN')}</td>
                                    <td>{service.soluong}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default ThongTinDichVu;