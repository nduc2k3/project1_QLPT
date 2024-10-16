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

router.put('/:id',(req,res,next)=>{
    var id = req.params.id
    var newpass = req.body.newPass

    AccModel.findByIdAndUpdate(id,{
        password : newpass
    })
    .then(data=>{
        res.json('update thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.delete('/:id',(req,res,next)=>{
    var id = req.params.id
    AccModel.deleteOne({
        _id : id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.get('/:id',(req,res,next)=>{
    var id = req.params.id
    AccModel.findById(id)
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

module.exports = router