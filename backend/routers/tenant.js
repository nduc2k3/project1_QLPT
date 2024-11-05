const express = require('express');
const router = express.Router();

const TenantModel = require('../models/tenant')

router.get('/',(req,res,next)=>{
    TenantModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/', (req, res, next) => {
    var makt = req.body.makt
    var tenkt = req.body.tenkt
    var sdt = req.body.sdt
    var email = req.body.email
    var diachitt = req.body.diachitt
    var maphong = req.body.maphong
    var ngaythue = req.body.ngaythue
    var cccd = req.body.cccd
    var ngaycap = req.body.ngaycap
    var ngaysinh = req.body.ngaysinh
    var noisinh = req.body.noisinh
    var tienphong = req.body.tienphong
    var ghichu = req.body.ghichu
    var anh = req.body.anh
    
    

    TenantModel.create({
        makt : makt,
        tenkt : tenkt,
        sdt : sdt,
        email : email,
        diachitt: diachitt,
        maphong : maphong,
        ngaythue : ngaythue,
        cccd : cccd,
        ngaycap : ngaycap,
        ngaysinh : ngaysinh,
        noisinh : noisinh,
        tienphong: tienphong,
        ghichu : ghichu,
        anh : anh

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
    TenantModel.deleteOne({
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

    TenantModel.findOneAndUpdate({ makt : makt }, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json('Không tìm thấy phòng để cập nhật');
            }
            res.json('Cập nhật phòng thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật phòng');
        });
});

router.get('/listdv', async (req, res) => {
    try {
      const result = await TenantModel.aggregate([
        {
          $lookup: {
            from: "room",
            localField: "maphong",  // Khóa ngoại trong "tenant"
            foreignField: "maphong", // Khóa chính trong "room"
            as: "room_info"
          }
        },
        { $unwind: { path: "$room_info", preserveNullAndEmptyArrays: false } }, // Chỉ giữ lại những khách thuê có phòng
  
        {
          $lookup: {
            from: "service_tenant",
            localField: "makt",  // Khóa ngoại trong "tenant"
            foreignField: "makt", // Khóa chính trong "service_tenant"
            as: "service_info"
          }
        },
        { $unwind: { path: "$service_info", preserveNullAndEmptyArrays: false } }, // Chỉ giữ lại những khách thuê có dịch vụ
  
        {
          $lookup: {
            from: "dichvu",
            localField: "service_info.madv",  // Khóa ngoại trong "service_tenant"
            foreignField: "madv", // Khóa chính trong "dichvu"
            as: "dichvu_info"
          }
        },
        { $unwind: { path: "$dichvu_info", preserveNullAndEmptyArrays: false } }, // Chỉ giữ lại những khách thuê có dịch vụ
  
        // Lọc khách thuê có ít nhất 1 dịch vụ
        {
          $match: {
            "service_info": { $ne: [] }  // Lọc những khách thuê có dịch vụ (service_info không được rỗng)
          }
        },
  
        {
          $project: {
            _id : 0,
            tenkt: 1,
            tenphong: "$room_info.tenphong",
            tendv: "$dichvu_info.tendv",
            giatien: "$dichvu_info.giatien",
            soluong: "$service_info.soluong"
          }
        }
      ]);
  
      console.log(result); // Kiểm tra kết quả
      res.json(result);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
  
  

module.exports = router