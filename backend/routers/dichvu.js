const express = require('express');
const router = express.Router();

const DvModel = require('../models/dichvu')

router.get('/',(req,res,next)=>{
    DvModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/',(req,res,next)=>{
    var madv = req.body.madv
    var tendv = req.body.tendv
    var giatien = req.body.giatien
    DvModel.create({
        madv : madv,
        tendv : tendv,
        giatien : giatien
    })
    .then(data=>{
        res.json('them dich vu thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.put('/:madv', (req, res, next) => {
    const madv = req.params.madv;

    DvModel.findOneAndUpdate({ madv : madv }, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json('Không tìm thấy dich vu để cập nhật');
            }
            res.json('Cập nhật dich vu thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật dich vu');
        });
});

router.delete('/:madv',(req,res,next)=>{
    var madv = req.params.madv
    DvModel.deleteOne({
        madv : madv
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})


module.exports = router