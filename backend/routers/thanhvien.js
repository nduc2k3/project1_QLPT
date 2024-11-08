const express = require('express');
const router = express.Router();

const TvModel = require('../models/thanhvien')

router.get('/',(req,res,next)=>{
    TvModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/', (req, res, next) => {
    var makt = req.body.makt
    var tentv = req.body.tentv
    var ngaysinh = req.body.ngaysinh
    var gioitinh = req.body.gioitinh
    var cccd = req.body.cccd
    var diachi = req.body.diachi
    var sdt = req.body.sdt
    
    TvModel.create({
        makt: makt,
        tentv : tentv,
        ngaysinh : ngaysinh,
        gioitinh : gioitinh,
        cccd : cccd,
        diachi: diachi,
        sdt: sdt

    })
        .then(data => {
            res.json('them khach thue thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi sever')
        })
})

router.delete('/:cccd',(req,res,next)=>{
    var cccd = req.params.cccd
    TvModel.deleteOne({
        cccd : cccd
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})



router.put('/:cccd', (req, res, next) => {
    const cccd = req.params.cccd;

    TvModel.findOneAndUpdate({ cccd : cccd }, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json('Không tìm thấy thanh vien để cập nhật');
            }
            res.json('Cập nhật thanh vien thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật thanh vien');
        });
});


module.exports = router