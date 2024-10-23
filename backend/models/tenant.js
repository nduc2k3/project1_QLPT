const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const TenantSchema = new Schema({
    makt : String,
    tenkt : String,
    sdt : String,
    email : String,
    diachitt: String,
    maphong : String,
    ngaythue : Date,
    cccd : String,
    ngaycap : Date,
    ngaysinh : Date,
    noisinh : String,
    tienphong: Number,
    ghichu : String,
    anh : String
    
},{
    collection : "tenant"
});

const TenantModel = mongoose.model('tenant',TenantSchema);

module.exports = TenantModel