const express = require('express');
const router = express.Router();
const TenantModel = require('../models/tenant');
const DiennuocModel = require('../models/diennuoc');
const STModel = require('../models/service_tenant');
const DvModel = require('../models/dichvu')

router.get('/:thang/:nam', async (req, res) => {
    const thang = parseInt(req.params.thang);
    const nam = parseInt(req.params.nam);

    try {
        const results = await DiennuocModel.aggregate([
            {
                $match: { thang: thang, nam: nam }
            },
            {
                $lookup: {
                    from: "tenant",
                    localField: "makt",
                    foreignField: "makt",
                    as: "tenant_info"
                }
            },
            {
                $unwind: "$tenant_info"
            },
            {
                $project: {
                    tenkt: "$tenant_info.tenkt",
                    tongtien: {
                        $add: [
                            "$tenant_info.tienphong",
                            { $multiply: ["$sodien", "$giadien"] },
                            { $multiply: ["$sonuoc", "$gianuoc"] }
                        ]
                    }
                }
            }
        ]);

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/tiendv', async (req, res) => {
    try {
        const tenants = await TenantModel.find();
        
        const result = [];

        for (const tenant of tenants) {
            const services = await STModel.find({ makt: tenant.makt });
            let totalCost = 0;

            for (const service of services) {
                const dv = await DvModel.findOne({ madv: service.madv });
                totalCost += service.soluong * dv.giatien;
            }

            result.push({ tenkt: tenant.tenkt, tongtien: totalCost });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tongtien/:thang/:nam', async (req, res) => {
    const thang = parseInt(req.params.thang);
    const nam = parseInt(req.params.nam);

    try {
        const dienNuocResults = await DiennuocModel.aggregate([
            {
                $match: { thang: thang, nam: nam }
            },
            {
                $lookup: {
                    from: "tenant",
                    localField: "makt",
                    foreignField: "makt",
                    as: "tenant_info"
                }
            },
            {
                $unwind: "$tenant_info"
            },
            {
                $project: {
                    tenkt: "$tenant_info.tenkt",
                    tongtien_dn: {
                        $add: [
                            "$tenant_info.tienphong",
                            { $multiply: ["$sodien", "$giadien"] },
                            { $multiply: ["$sonuoc", "$gianuoc"] }
                        ]
                    }
                }
            }
        ]);

        const dvResults = await TenantModel.find();

        const result = [];

        for (let i = 0; i < dienNuocResults.length; i++) {
            let totalCost = dienNuocResults[i].tongtien_dn;

            const services = await STModel.find({ makt: dvResults[i].makt });

            for (const service of services) {
                const dv = await DvModel.findOne({ madv: service.madv });
                totalCost += service.soluong * dv.giatien;
            }

            result.push({ tenkt: dienNuocResults[i].tenkt, tongtien: totalCost });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tongtien', async (req, res) => {
    try {
        const dienNuocResults = await DiennuocModel.aggregate([
            {
                $lookup: {
                    from: "tenant",
                    localField: "makt",
                    foreignField: "makt",
                    as: "tenant_info"
                }
            },
            {
                $unwind: "$tenant_info"
            },
            {
                $project: {
                    tenkt: "$tenant_info.tenkt",
                    thang: "$thang", // Thêm trường tháng
                    nam: "$nam", // Thêm trường năm
                    tongtien_dn: {
                        $add: [
                            "$tenant_info.tienphong",
                            { $multiply: ["$sodien", "$giadien"] },
                            { $multiply: ["$sonuoc", "$gianuoc"] }
                        ]
                    }
                }
            }
        ]);

        const dvResults = await TenantModel.find();

        const result = [];

        for (let i = 0; i < dienNuocResults.length; i++) {
            let totalCost = dienNuocResults[i].tongtien_dn;

            const services = await STModel.find({ makt: dvResults[i].makt });

            for (const service of services) {
                const dv = await DvModel.findOne({ madv: service.madv });
                totalCost += service.soluong * dv.giatien;
            }

            result.push({
                tenkt: dienNuocResults[i].tenkt,
                thang: dienNuocResults[i].thang,
                nam: dienNuocResults[i].nam,
                tongtien: totalCost
            });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/tongtien1', async (req, res) => {
    try {
        const dienNuocResults = await DiennuocModel.aggregate([
            {
                $lookup: {
                    from: "tenant",
                    localField: "makt",
                    foreignField: "makt",
                    as: "tenant_info"
                }
            },
            {
                $unwind: "$tenant_info"
            },
            {
                $lookup: {
                    from: "room",
                    localField: "tenant_info.maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $project: {
                    tenkt: "$tenant_info.tenkt",
                    ngaysinh : "$tenant_info.ngaysinh",
                    cccd : "$tenant_info.cccd",
                    sdt : "$tenant_info.sdt",
                    thang: "$thang", // Thêm trường tháng
                    nam: "$nam", // Thêm trường năm
                    tenphong : {$arrayElemAt: ["$room_info.tenphong", 0] },
                    tang: { $arrayElemAt: ["$room_info.tang", 0] }, 
                    ngaythue : "$tenant_info.ngaythue",
                    tongtien_dn: {
                        $add: [
                            "$tenant_info.tienphong",
                            { $multiply: ["$sodien", "$giadien"] },
                            { $multiply: ["$sonuoc", "$gianuoc"] }
                        ]
                    }
                }
            }
        ]);

        const dvResults = await TenantModel.find();

        const result = [];

        for (let i = 0; i < dienNuocResults.length; i++) {
            let totalCost = dienNuocResults[i].tongtien_dn;

            const services = await STModel.find({ makt: dvResults[i].makt });

            for (const service of services) {
                const dv = await DvModel.findOne({ madv: service.madv });
                totalCost += service.soluong * dv.giatien;
            }

            result.push({
                tenkt: dienNuocResults[i].tenkt,
                ngaysinh: dienNuocResults[i].ngaysinh,
                cccd: dienNuocResults[i].cccd,
                sdt: dienNuocResults[i].sdt,
                thang: dienNuocResults[i].thang,
                nam: dienNuocResults[i].nam,
                tenphong : dienNuocResults[i].tenphong,
                tang: dienNuocResults[i].tang,
                ngaythue: dienNuocResults[i].ngaythue,
                tongtien: totalCost
            });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/danhsach', async (req, res) => {

    try {
        const { tenphong, tang, thang, nam } = req.query;

        let query = {};

        if (tenphong) {
            query["tenphong"] = tenphong;
        }
        if (tang) {
            query["tang"] = parseInt(tang);
        }

        if (thang && nam) {
            const startDate = new Date(nam, thang - 1, 1);
            const endDate = new Date(nam, thang, 0, 23, 59, 59);
            query["ngaythue"] = { $gte: startDate, $lte: endDate };
        }

        const results = await TenantModel.aggregate([
            {
                $lookup: {
                    from: "room",
                    localField: "maphong",
                    foreignField: "maphong",
                    as: "room_info"
                }
            },
            {
                $unwind: "$room_info"
            },
            {
                $project: {
                    tenkt: 1,
                    ngaysinh: 1,
                    cccd: 1,
                    sdt: 1,
                    tenphong: "$room_info.tenphong",
                    tang: "$room_info.tang",
                    ngaythue: 1,
                    tienphong: "$tienphong",
                    _id: 0
                }
            },
            {
                $match: query
            }
        ]);

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;