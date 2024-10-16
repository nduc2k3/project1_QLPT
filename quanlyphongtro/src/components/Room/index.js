import React from 'react';
import './Room.css';

const Room = () => {
    return ( 
        <>
        <div className='room-container'>
            <div className='image'>
                <img id='img' src='anh_tro.jpg' alt='abc' />
            </div>
            <div className='btn-room'>
                <button className='update'>Chỉnh Sửa</button>
                <button className='delete'>Xóa</button>
                <button className='watch'>Xem</button>
            </div>
            <div className='giaphong'>
                <h3>Giá Phòng:</h3>
            </div>
            <div className='trangthai'>
                <h3>Trạng Thái:</h3>
            </div>
        </div>
        </>
     );
}

export default Room;
