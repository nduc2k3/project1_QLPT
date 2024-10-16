const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AccModel = require('./models/acc');
const cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.post('/register',(req,res,next)=>{
    var email = req.body.email
    var password = req.body.password
    
    AccModel.findOne({
        email : email
    })
    .then(data=>{
        if(data){
            res.status(400).json('email nay da ton tai')
        }else{
            AccModel.create({
                email : email,
                password : password
            }).then(data=>{
                res.json('tao tai khoan thanh cong')
            })
        }
    })
    .catch(err=>{
        res.status(500).json('Tao tk that bai'+err)
    })
})

app.post('/login',(req,res,next)=>{
    var email = req.body.username
    var password = req.body.password

    AccModel.findOne({
        email : email,
        password : password
    })
    .then(data=>{
        if(data){
            res.json('dang nhap thanh cong')
        }else{
            res.status(400).json('tai khoan hoac mat khau ko dung')
        }

    })
    .catch(err=>{
        res.status(500).json('co loi ben sever')
    })
})

app.get('/getacc',(req,res,next)=>{
    var email = req.body.username
    var password = req.body.password

    AccModel.find({})
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.status(400).json('tai khoan hoac mat khau ko dung')
        }
    })
    .catch(err=>{
        res.status(500).json('co loi ben sever')
    })
})
// quan li tai khoan
const accRouter = require('./routers/acc')
app.use('/api/acc/',accRouter)

//quan li phong tro
const roomRouter = require('./routers/room')
app.use('/api/room/',roomRouter)


app.get('/',(req,res,next)=>{
    res.json('Home')
})

app.listen(8080, () => {
    console.log(`Server started on port`);
});