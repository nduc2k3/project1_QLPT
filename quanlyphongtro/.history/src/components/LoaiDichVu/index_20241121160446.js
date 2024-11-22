import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import axios from "axios";
function LoaiDichVu() {
    const navigate = useNavigate();
    const [selectedService,setSelectedService] = useState([]);
    const [services,setServices] = useState([]);
    const handleAddService = () => {
        navigate('/addservice')
    }
    const handleRowClick = (service) => {
        setSelectedService(service.madv);
    };
    const handleDeleteService = async () => {
        if(!selectedService){
            alert("Vui lòng chọn một dịch vụ để xóa.");
            return;
        }
        try{
            await axios.delete(`https://qlpt.onrender.com/api/dichvu/${selectedService}`);
            alert("Dịch vụ đã được xóa thành công.");
            fetchService();
            setSelectedService(null);
        } catch (error) {
            console.error("Có lỗi khi xóa dịch vụ:", error);
            alert("Có lỗi xảy ra khi xóa dịch vụ. Vui lòng thử lại.");
        }
    };
    const fetchService = async () => {
        try{
            const respone = await axios.get('https://qlpt.onrender.com/api/dichvu');
            const data = respone.data;
            setServices(data)
        } catch(error){
            console.error("Có lỗi khi lấy dữ liệu:", error);
        }
    };
    useEffect(() => {
        document.title = "Quản lý loại dịch vụ";
    }, []);
    useEffect(() =>{
        fetchService();
    },[]);
    return (  
        <div>
          <div className="container-LoaiDichVu">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Dịch Vụ</th>
                        <th>Tên Dịch Vụ</th>
                        <th>Giá Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services.map((service,index) => (
                            <tr key={index} onClick={() => handleRowClick(service)} style={{ cursor: 'pointer' }}>
                                <td>{service.madv}</td>
                                <td>{service.tendv}</td> 
                                <td>{service.giatien}</td>     
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <button className="Them_LoaiDV" onClick={handleAddService}>Thêm Loại Dịch Vụ</button>
            <button className="Xoa_DV" style={{marginLeft:'20px'}} onClick={handleDeleteService}>Xóa Dịch Vụ</button>
          </div>
        </div>
    );
}

export default LoaiDichVu;