const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const TvSchema = new Schema({
    makt: { 
        type: String,
         required: true,
          
    },
    tentv: { 
        type: String, 
        required: true 
    },
    ngaysinh: { 
        type: Date 
    },
    gioitinh: { 
        type: String 
    },
    cccd: { 
        type: String,
        required: true 
    }, 
    diachi: { 
        type: String 
    },
    sdt: { 
        type: String 
    }
}, {
    collection: "thanhvien"
});

const TvModel = mongoose.model('thanhvien',TvSchema);

module.exports = TvModel