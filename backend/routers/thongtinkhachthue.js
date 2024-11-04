const express = require('express');
const router = express.Router();

// Định nghĩa schema và model cho các collections
const TenantModel = require('../models/tenant');
const DvModel = require('../models/dichvu');
const STModel = require('../models/service_tenant');
const DnModel = require('../models/diennuoc');

router.get('/:thang/:nam', async (req, res, next) => {
    const thang = parseInt(req.params.thang);
    const nam = parseInt(req.params.nam);

    try {
        const results = await STModel.aggregate([
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
                $lookup: {
                    from: "diennuoc",
                    let: { makt: "$makt", thang: "$thang", nam: "$nam" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$makt", "$$makt"] },
                                        { $eq: ["$thang", "$$thang"] },
                                        { $eq: ["$nam", "$$nam"] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "diennuoc_info"
                }
            },
            {
                $unwind: "$tenant_info"
            },
            {
                $unwind: "$diennuoc_info"
            },
            {
                $project: {
                    tenkt: "$tenant_info.tenkt",
                    tongtien: {
                        $add: [
                            { $multiply: ["$diennuoc_info.sodien", "$diennuoc_info.giadien"] },
                            { $multiply: ["$diennuoc_info.sonuoc", "$diennuoc_info.gianuoc"] },
                            "$tenant_info.tienphong"
                        ]
                    }
                }
            }
        ]);

        // Tính tổng tiền dịch vụ
        let totalServiceCost = 0;
        for (const result of results) {
            const dvInfo = await DvModel.findOne({ madv: result.madv });
            totalServiceCost += parseFloat(dvInfo.giatien);
        }

        // Thêm tổng tiền dịch vụ vào kết quả trả về
        results.forEach(result => {
            result.tongtien += totalServiceCost;
        });

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;