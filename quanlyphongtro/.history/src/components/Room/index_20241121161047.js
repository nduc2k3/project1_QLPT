import React, { useState } from 'react';
import axios from 'axios';
import './Room.css';

const Room = ({ room, onDelete, onUpdate }) => {
    const [showDescription, setShowDescription] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newGiaphong, setNewGiaphong] = useState(room.giaphong);
    const [newTrangthai, setNewTrangthai] = useState(room.trangthaiphong);
    const [newTrangthaitt, setNewTrangthaitt] = useState(room.trangthaitt);
    useEffect(() => {
        document.title = `Phòng - Nhà Trọ`; // Cập nhật tiêu đề khi phòng được hiển thị
    }, []);

    const handleViewDescription = () => {
        setShowDescription(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://qlpt.onrender.com/api/room/${room.maphong}`);
            alert("Phòng đã được xóa thành công");
            onDelete(room.maphong);
        } catch (error) {
            console.error("Lỗi", error);
            alert("Lỗi!");
        }
    };

    const handleEdit = async () => {
        try {
            const updatedRoom = {
                giaphong: newGiaphong,
                trangthaiphong: newTrangthai,
                trangthaitt: newTrangthaitt
            };
            await axios.put(`https://qlpt.onrender.com/api/room/${room.maphong}`, updatedRoom);
            alert("Cập nhật thành công");
            onUpdate({ ...room, ...updatedRoom });
            setIsEditing(false);
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <div className='room-container'>
            <div className='image-room'>
                <img id='img' src={room.hinhanh} alt='abc' />
            </div>

            <h2 className='tenphong'>Phòng:{room.tenphong}</h2> {/* Thêm tên phòng */}

            {isEditing ? (
                <div className='edit-room'>
                    <input 
                        type="number" 
                        value={newGiaphong} 
                        onChange={(e) => setNewGiaphong(e.target.value)} 
                        placeholder="Giá Phòng" 
                    />
                    <label>
                        Trạng thái phòng:
                        <input 
                            type="checkbox" 
                            checked={newTrangthai} 
                            onChange={(e) => setNewTrangthai(e.target.checked)} 
                        />
                    </label>
                    <label>
                        Trạng thái thanh toán:
                        <input 
                            type="checkbox" 
                            checked={newTrangthaitt} 
                            onChange={(e) => setNewTrangthaitt(e.target.checked)} 
                        />
                    </label>
                    <button onClick={handleEdit}>Lưu</button>
                    <button onClick={() => setIsEditing(false)}>Hủy</button>
                </div>
            ) : (
                <div className='btn-room'>
                    <button className='update' onClick={() => setIsEditing(true)}>Chỉnh Sửa</button>
                    <button className='delete' onClick={handleDelete}>Xóa</button>
                    <button className='watch' onClick={handleViewDescription}>Xem</button>
                </div>
            )}

            <div className='giaphong'>
                <h3>Giá Phòng: {parseInt(room.giaphong).toLocaleString('vi-VN')} VND</h3>
            </div>
            <div className='trangthai'>
                <h3>Trạng Thái: {room.trangthaiphong ? 'Đã thuê' : 'Chưa thuê'}</h3>
                <h3>Trạng Thái Phí: {room.trangthaitt ? 'Đã trả' : 'Chưa trả'}</h3>
            </div>
            {showDescription && (
                <div className="room-description">
                    <h3 style={{ fontSize: '12px', color: 'red' }}>Mô tả phòng:</h3>
                    <p>{room.mota}</p>
                    <button onClick={() => setShowDescription(false)}>Đóng</button>
                </div>
            )}
        </div>
    );
};

export default Room;
