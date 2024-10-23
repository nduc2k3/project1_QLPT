const express = require('express');
const router = express.Router();

const DnModel = require('../models/diennuoc');
const TenantModel = require('../models/tenant');


router.get('/',(req,res,next)=>{
    DnModel.find({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })

})

router.post('/',(req,res,next)=>{
    var madn = req.body.madn
    var makt = req.body.makt
    var thang = req.body.thang
    var nam = req.body.nam
    var sodien = req.body.sodien
    var sonuoc = req.body.sonuoc
    DnModel.create({
        madn : madn,
        makt : makt,
        thang : thang,
        nam : nam,
        sodien : sodien,
        sonuoc : sonuoc
    
    })
    .then(data=>{
        res.json('them dien nuoc thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.get('/sodien', async (req, res, next) => {

    try {
        const danhSach = await TenantModel.aggregate([
            {
                $lookup: {
                    from: "diennuoc",
                    localField: "makt",
                    foreignField: "makt",
                    as: "diennuoc_info"
                }
            },
            {
                $unwind: "$diennuoc_info"
            },
            {
                $lookup: {
                    from: "room",
                    localField: "maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    tang: { $arrayElemAt: ["$room_info.tang", 0] },
                    tenphong: { $arrayElemAt: ["$room_info.tenphong", 0] },
                    tenkt: "$tenkt",
                    sodien: "$diennuoc_info.sodien",
                    thang: "$diennuoc_info.thang",
                    nam: "$diennuoc_info.nam"
                }
            }
        ]);

        res.json(danhSach);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sodienmonth', async (req, res, next) => {
    const { thang, nam } = req.query;

    try {
        const danhSach = await TenantModel.aggregate([
            {
                $lookup: {
                    from: "diennuoc",
                    localField: "makt",
                    foreignField: "makt",
                    as: "diennuoc_info"
                }
            },
            {
                $unwind: "$diennuoc_info"
            },
            {
                $lookup: {
                    from: "room",
                    localField: "maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    tang: { $arrayElemAt: ["$room_info.tang", 0] },
                    tenphong: { $arrayElemAt: ["$room_info.tenphong", 0] },
                    tenkt: "$tenkt",
                    sodien: "$diennuoc_info.sodien",
                    thang: "$diennuoc_info.thang",
                    nam: "$diennuoc_info.nam"
                }
            },
            {
                $match: {
                    "thang": parseInt(thang),
                    "nam": parseInt(nam)
                }
            }
        ]);

        res.json(danhSach);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sonuoc', async (req, res, next) => {

    try {
        const danhSach = await TenantModel.aggregate([
            {
                $lookup: {
                    from: "diennuoc",
                    localField: "makt",
                    foreignField: "makt",
                    as: "diennuoc_info"
                }
            },
            {
                $unwind: "$diennuoc_info"
            },
            {
                $lookup: {
                    from: "room",
                    localField: "maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    tang: { $arrayElemAt: ["$room_info.tang", 0] },
                    tenphong: { $arrayElemAt: ["$room_info.tenphong", 0] },
                    tenkt: "$tenkt",
                    sonuoc: "$diennuoc_info.sonuoc",
                    thang: "$diennuoc_info.thang",
                    nam: "$diennuoc_info.nam"
                }
            }
        ]);

        res.json(danhSach);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sonuocmonth', async (req, res, next) => {
    const { thang, nam } = req.query;

    try {
        const danhSach = await TenantModel.aggregate([
            {
                $lookup: {
                    from: "diennuoc",
                    localField: "makt",
                    foreignField: "makt",
                    as: "diennuoc_info"
                }
            },
            {
                $unwind: "$diennuoc_info"
            },
            {
                $lookup: {
                    from: "room",
                    localField: "maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    tang: { $arrayElemAt: ["$room_info.tang", 0] },
                    tenphong: { $arrayElemAt: ["$room_info.tenphong", 0] },
                    tenkt: "$tenkt",
                    sonuoc: "$diennuoc_info.sonuoc",
                    thang: "$diennuoc_info.thang",
                    nam: "$diennuoc_info.nam"
                }
            },
            {
                $match: {
                    "thang": parseInt(thang),
                    "nam": parseInt(nam)
                }
            }
        ]);

        res.json(danhSach);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:madn',(req,res,next)=>{
    var madn = req.params.madn
    DnModel.deleteOne({
        madn : madn
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi sever')
    })
})

router.put('/:madn', (req, res, next) => {
    const madn = req.params.madn;

    DnModel.findOneAndUpdate({ madn: madn }, req.body, { new: true })
        .then(data => {
            if (!data) {
                return res.status(404).json('Không tìm thấy để cập nhật');
            }
            res.json('Cập nhật thành công');
        })
        .catch(err => {
            res.status(500).json('Lỗi server khi cập nhật ');
        });
});


module.exports = router