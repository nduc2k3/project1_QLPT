const express = require('express');
const router = express.Router();

const AccModel = require('../models/acc')

router.get('/',(req,res,next)=>{
    AccModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/',(req,res,next)=>{
    var email = req.body.email
    var password = req.body.password
    AccModel.create({
        email : email,
        password : password
    })
    .then(data=>{
        res.json('them acc thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.put('/', async (req, res, next) => {
    try {
        const email = req.body.email;
        const newPass = req.body.newPass;

        // Tìm tài khoản dựa trên email
        const account = await AccModel.findOne({ email: email });

        if (!account) {
            return res.status(404).json('Tài khoản không tồn tại');
        }

        // Cập nhật mật khẩu
        account.password = newPass;
        await account.save();

        res.json('Cập nhật mật khẩu thành công');
    } catch (err) {
        res.status(500).json('Lỗi server');
    }
});

router.delete('/:email',(req,res,next)=>{
    var email = req.params.email
    AccModel.deleteOne({
        email : email
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.get('/:email',(req,res,next)=>{
    var email = req.params.email
    AccModel.findById(email)
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

module.exports = router