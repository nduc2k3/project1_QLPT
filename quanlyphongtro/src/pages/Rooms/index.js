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
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [roomSearch, setRoomSearch] = useState("");
    const [noDataMessage, setNoDataMessage] = useState("");

    const handleRoomStatusChange = (item) => {
        setStatusRoom(item);
    };

    const handleFeeStatusChange = (item) => {
        setStatusFee(item);
    };

    const handleDeleteRoom = (maphong) => {
        const updateRoom = listRoom.filter(room => room.maphong !== maphong);
        setListRoom(updateRoom);
        setFilteredRooms(updateRoom);
    };

    const handleUpdateRoom = (updatedRoom) => {
        const updatedRooms = filteredRooms.map(room => 
            room.maphong === updatedRoom.maphong ? updatedRoom : room
        );
        setFilteredRooms(updatedRooms);
        setListRoom(updatedRooms); // Cập nhật danh sách gốc nếu cần
    };

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/room');
                const rooms = response.data;
                setListRoom(rooms);
                setFilteredRooms(rooms);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };
        fetchRoomData();
    }, []);

    const handleSearch = () => {
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

        setFilteredRooms(filtered);
        if (filtered.length === 0) {
            setNoDataMessage("Không có dữ liệu phù hợp với tiêu chí tìm kiếm!");
        } else {
            setNoDataMessage("");
        }

        // Reset dropdowns and search input
        setStatusRoom("Trạng thái phòng");
        setStatusFee("Trạng thái phí");
        setRoomSearch("");
    };

    const totalAvailable = listRoom.filter(room => room.trangthaiphong === false).length;
    const totalRented = listRoom.filter(room => room.trangthaiphong === true).length;
    const totalUnpaid = listRoom.filter(room => room.trangthaitt === false).length;

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
                        onChange={(e) => setRoomSearch(e.target.value)} 
                    />
                    <button className="btn-search" onClick={handleSearch}>Tìm Kiếm</button>
                </div>

                <div className="rooms-text">
                    <h3>Phòng trống: {totalAvailable}</h3>
                    <h3>Đã thuê: {totalRented}</h3>
                    <h3>Chưa thu phí: {totalUnpaid}</h3>
                </div>

                <div className="rooms-room">
                    {noDataMessage ? (
                        <div className="no-data-message">
                            {noDataMessage}
                        </div>
                    ) : (
                        filteredRooms.map((room, index) => (
                            <Room 
                                key={index} 
                                room={room} 
                                onDelete={handleDeleteRoom} 
                                onUpdate={handleUpdateRoom} 
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Rooms;
