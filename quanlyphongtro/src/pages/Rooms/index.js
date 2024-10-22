import React, { useState, useEffect } from "react";
import Room from '../../components/Room';
import Dropdown from '../../components/DropDown';
import './Rooms.css';
import axios from "axios";

function Rooms() {
    const item1 = ["đã thuê", "còn trống"];
    const item2 = ["đã trả", "chưa trả"];
    
    const [statusRoom, setStatusRoom] = useState("Trạng thái phòng");
    const [statusFee, setStatusFee] = useState("Trạng thái phí");
    const [listRoom, setListRoom] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]); // Danh sách đã lọc
    const [roomSearch, setRoomSearch] = useState(""); // Lưu giá trị tìm kiếm theo phòng
    const [noDataMessage, setNoDataMessage] = useState(""); // Thông báo khi không có dữ liệu

    const handlError = (error) =>{
        console.log("loi",error);
    }
    // Hàm để cập nhật giá trị đã chọn từ Dropdown phòng
    const handleRoomStatusChange = (item) => {
        setStatusRoom(item);
    };

    // Hàm để cập nhật giá trị đã chọn từ Dropdown phí
    const handleFeeStatusChange = (item) => {
        setStatusFee(item);
    };
    const handleDeleteRoom = (maphong) =>{
        const updateRoom = listRoom.filter(room => room.maphong !== maphong);
        setListRoom(updateRoom);
        setFilteredRooms(updateRoom);
    };
    // Hàm lấy dữ liệu phòng từ API
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/room');
                const rooms = response.data;
                setListRoom(rooms);
                setFilteredRooms(rooms); // Ban đầu hiển thị toàn bộ phòng
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };
        fetchRoomData();
    }, []);

    // Hàm để xử lý lọc phòng khi nhấn nút Tìm kiếm
    const handleSearch = () => {
        // Lọc danh sách phòng dựa trên trạng thái phòng, trạng thái phí và tên phòng
        const filtered = listRoom.filter(room => {
            const matchStatusRoom = statusRoom === "Trạng thái phòng" || 
                                    (statusRoom === "đã thuê" && room.trangthaiphong === true) || 
                                    (statusRoom === "còn trống" && room.trangthaiphong === false);

            const matchStatusFee = statusFee === "Trạng thái phí" || 
                                   (statusFee === "đã trả" && room.trangthaitt === true) || 
                                   (statusFee === "chưa trả" && room.trangthaitt === false);

            const matchRoomSearch = roomSearch === "" || room.tenphong.toLowerCase().includes(roomSearch.toLowerCase());

            return matchStatusRoom && matchStatusFee && matchRoomSearch;
        });

        // Cập nhật danh sách phòng đã lọc
        setFilteredRooms(filtered);

        // Hiển thị thông báo nếu không tìm thấy dữ liệu
        if (filtered.length === 0) {
            setNoDataMessage("Không có dữ liệu phù hợp với tiêu chí tìm kiếm!");
        } else {
            setNoDataMessage(""); // Reset lại thông báo nếu có dữ liệu
        }

        // Reset các giá trị tìm kiếm về mặc định
        setStatusRoom("Trạng thái phòng");
        setStatusFee("Trạng thái phí");
        setRoomSearch("");
    };

    // Tính tổng số phòng theo trạng thái
    const totalAvailable = listRoom.filter(room => room.trangthaiphong === false).length; // Phòng trống
    const totalRented = listRoom.filter(room => room.trangthaiphong === true).length; // Phòng đã thuê
    const totalUnpaid = listRoom.filter(room => room.trangthaitt === false).length; // Phòng chưa thu phí
    return (
        <>
            <div className="container-rooms">
                <div className="search">
                    <Dropdown
                        defaultItem={statusRoom}
                        items={item1}
                        onItemSelected={handleRoomStatusChange}
                    />
                    <Dropdown
                        defaultItem={statusFee}
                        items={item2}
                        onItemSelected={handleFeeStatusChange}
                    />
                    <input 
                        type="text" 
                        placeholder="Phòng:" 
                        className="input-field" 
                        value={roomSearch} 
                        onChange={(e) => setRoomSearch(e.target.value)} // Cập nhật giá trị tìm kiếm theo phòng
                    />
                    <button className="btn-search" onClick={handleSearch}>Tìm Kiếm</button>
                </div>

                <div className="rooms-text">
                    <h3>Phòng trống: {totalAvailable}</h3>
                    <h3>Đã thuê: {totalRented}</h3>
                    <h3>Chưa thu phí: {totalUnpaid}</h3>
                </div>

                <div className="rooms-room">
                    {noDataMessage ? ( // Kiểm tra nếu không có dữ liệu
                        <div className="no-data-message">
                            {noDataMessage}
                        </div>
                    ) : (
                        filteredRooms.map((room, index) => (
                            <Room key={index} room={room} onDelete={handleDeleteRoom} 
                            onError={handlError} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Rooms;
