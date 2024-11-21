import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function DichVu() {
  const [dvlist, setDvList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [makt, setMakt] = useState("");
  const [soluong, setSoluong] = useState({});

  const fetchListDV = async () => {
    try {
      const response = await axios.get('https://qlpt.onrender.com/api/dichvu');
      setDvList(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể lấy danh sách dịch vụ. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchListDV();
  }, []);

  const handleCheckboxChange = (dichvu) => {
    setSelectedServices(prevSelected => {
      if (prevSelected.includes(dichvu.madv)) {
        return prevSelected.filter(madv => madv !== dichvu.madv);
      } else {
        return [...prevSelected, dichvu.madv];
      }
    });
  };

  const handleQuantityChange = (madv, value) => {
    setSoluong(prevState => ({
      ...prevState,
      [madv]: value
    }));
  };

  const handleSave = async () => {
    if (!makt) {
      alert("Vui lòng nhập mã khách thuê!");
      return;
    }

    const dataToSend = selectedServices.map(madv => ({
      makt: makt,
      madv: madv,
      soluong: soluong[madv] ? parseInt(soluong[madv]) : 0 // Default to 0 if not specified
    }));

    try {

      for (const service of dataToSend) {
        const response = await axios.post('https://qlpt.onrender.com/api/dv_kt', service);
        
        // Kiểm tra nếu server trả về thông báo lỗi
        if (response.data && response.data.message) {
          alert(response.data.message); // Hiển thị thông báo lỗi từ server
          return; // Dừng lại nếu có lỗi
        }
      }
      alert("Lưu thành công!");
      console.log("Dữ liệu gửi đi:", dataToSend);
      setSelectedServices([]);
      setMakt("");
      setSoluong({});
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Hiển thị thông báo lỗi từ server
      } else {
        alert("Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="container-dichvu">
      <div className="table-container">
        <div className="makt-dichvu">
          <label style={{marginBottom:'12px'}}>Mã Khách Thuê</label>
          <input
            className="makt-dichvu"
            value={makt}
            onChange={(e) => setMakt(e.target.value)}
            style={{marginBottom:'12px', marginLeft:'12px'}}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Dịch vụ sử dụng</th>
              <th>Đơn giá (VND)</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {dvlist.map((dichvu) => (
              <tr key={dichvu.madv}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(dichvu.madv)}
                    onChange={() => handleCheckboxChange(dichvu)}
                  />
                </td>
                <td>{dichvu.tendv}</td>
                <td>{dichvu.giatien}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={soluong[dichvu.madv] || 0}
                    onChange={(e) => handleQuantityChange(dichvu.madv, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <button className="them-thuoctinhdv" onClick={handleSave}>Lưu</button>
    </div>
  );
}

export default DichVu;
