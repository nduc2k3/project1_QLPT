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

router.put('/:email',(req,res,next)=>{
    var email = req.params.email
    var newpass = req.body.newPass

    AccModel.findByIdAndUpdate(email,{
        password : newpass
    })
    .then(data=>{
        res.json('update thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

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