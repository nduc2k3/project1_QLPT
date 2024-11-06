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

router.delete('/:makt',(req,res,next)=>{
    var makt = req.params.makt
    TvModel.deleteOne({
        makt : makt
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})



router.put('/:makt', (req, res, next) => {
    const makt = req.params.makt;

    TvModel.findOneAndUpdate({ makt : makt }, req.body, { new: true })
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