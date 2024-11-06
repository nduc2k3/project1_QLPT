const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const TvSchema = new Schema({
    makt: String,
    tentv : String,
    ngaysinh : Date,
    gioitinh : String,
    cccd : String,
    diachi: String,
    sdt: String
    
},{
    collection : "thanhvien"
});

const TvModel = mongoose.model('thanhvien',TvSchema);

module.exports = TvModel