const express = require('express');
const router = express.Router();

const STModel = require('../models/service_tenant')

router.get('/',(req,res,next)=>{
    STModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/', async (req, res, next) => {
    
        const makt = req.body.makt;
        const madv = req.body.madv;
        const soluong = req.body.soluong;

        const newST = new STModel({
            makt: makt,
            madv: madv,
            soluong: soluong
        });

        await newST.save();

        res.json('Thêm dịch vụ khách thuê thành công');
    
});

router.put('/:mast', (req, res, next) => {
    const mast = req.params.mast;

    STModel.findOneAndUpdate({ mast : mast }, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json('Không tìm thấy dich vu khach thue để cập nhật');
            }
            res.json('Cập nhật dich vu khach thue thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật dich vu');
        });
});

router.delete('/:mast',(req,res,next)=>{
    var mast = req.params.mast
    STModel.deleteOne({
        mast : mast
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.get('/:makt',(req,res,next)=>{
    var makt = req.params.makt
    STModel.find({makt : makt})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})


module.exports = router