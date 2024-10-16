const express = require('express');
const router = express.Router();

const RoomModel = require('../models/room')

router.get('/',(req,res,next)=>{
    RoomModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/',(req,res,next)=>{
    var maphong = req.body.maphong
    var tenphong = req.body.tenphong
    var trangthai = req.body.trangthai
    var hinhanh = req.body.hinhanh
    var giaphong = req.body.giaphong
    var mota = req.body.mota

    RoomModel.create({
        maphong : maphong,
        tenphong : tenphong,
        trangthai : trangthai,
        hinhanh : hinhanh,
        giaphong : giaphong,
        mota : mota
    
    })
    .then(data=>{
        res.json('them phong thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.delete('/:id',(req,res,next)=>{
    var id = req.params.id
    RoomModel.deleteOne({
        _id : id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

module.exports = router