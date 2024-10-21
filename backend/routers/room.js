const express = require('express');
const router = express.Router();

const RoomModel = require('../models/room')

router.get('/', (req, res, next) => {
    RoomModel.find({})
        .then(data => {
            res.json(data)

        })
        .catch(err => {
            res.status(500).json('Loi sever')
        })

})

router.post('/', (req, res, next) => {
    var maphong = req.body.maphong
    var tenphong = req.body.tenphong
    var trangthaiphong = req.body.trangthaiphong
    var trangthaitt = req.body.trangthaitt
    var hinhanh = req.body.hinhanh
    var giaphong = req.body.giaphong
    var mota = req.body.mota

    RoomModel.create({
        maphong: maphong,
        tenphong: tenphong,
        trangthaiphong: trangthaiphong,
        trangthaitt: trangthaitt,
        hinhanh: hinhanh,
        giaphong: giaphong,
        mota: mota

    })
        .then(data => {
            res.json('them phong thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi sever')
        })
})

router.delete('/:id', (req, res, next) => {
    var id = req.params.id
    RoomModel.deleteOne({
        _id: id
    })
        .then(data => {
            res.json('Xoa thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi sever')
        })
})

router.put('/', (req, res, next) => {
    const maphong = req.body.maphong;

    RoomModel.findOneAndUpdate({ maphong: maphong }, req.body, { new: true })
        .then(updatedRoom => {
            if (!updatedRoom) {
                return res.status(404).json('Không tìm thấy phòng để cập nhật');
            }
            res.json('Cập nhật phòng thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật phòng');
        });
});

module.exports = router
