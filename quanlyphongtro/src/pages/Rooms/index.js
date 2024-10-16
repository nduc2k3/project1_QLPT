import React, { useState } from "react";
import Room from '../../components/Room';
import Dropdown from '../../components/DropDown';
import './Rooms.css';
function Rooms() {
    const item1 = ["đẫ thuê", "chưa thuê"];
    const item2 = ["đã trả", "chưa trả"];

    // Tạo state để lưu trữ giá trị đã chọn từ từng Dropdown
    const [statusRoom, setStatusRoom] = useState("Trạng thái phòng");
    const [statusFee, setStatusFee] = useState("Trạng thái phí");

    // Hàm để cập nhật giá trị đã chọn từ Dropdown phòng
    const handleRoomStatusChange = (item) => {
        setStatusRoom(item); // Cập nhật giá trị cho trạng thái phòng
    };

    // Hàm để cập nhật giá trị đã chọn từ Dropdown phí
    const handleFeeStatusChange = (item) => {
        setStatusFee(item); // Cập nhật giá trị cho trạng thái phí
    };

    return (
        <>
            <div className="container-rooms">
                <div className="search">
                    <Dropdown
                        defaultItem={statusRoom} // Giá trị mặc định
                        items={item1} // Dữ liệu dropdown
                        onItemSelected={handleRoomStatusChange} // Truyền hàm callback vào Dropdown
                    />
                    <Dropdown
                        defaultItem={statusFee} // Giá trị mặc định
                        items={item2} // Dữ liệu dropdown
                        onItemSelected={handleFeeStatusChange} // Truyền hàm callback vào Dropdown
                    />
                    <input type="text" placeholder="Phòng" className="input-field"/>
                    <button className="btn-search">Tìm Kiếm</button>
                </div>
                <div className="rooms-text">
                    <h3>còn trống:........</h3>
                    <h3>đã thuê:........</h3>
                    <h3>chưa thu phí:.......</h3>
                </div>
                <div className="rooms-room">
                    <Room/>
                </div>
            </div>
        </>
    );
}

export default Rooms;
