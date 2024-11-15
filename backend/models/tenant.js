const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const TenantSchema = new Schema({
    makt: { 
        type: String,
        required: true,
        unique: true
    },
    tenkt: { 
        type: String, 
        required: true 
    },
    sdt: { 
        type: String 
    },
    email: { 
        type: String 
    },
    diachitt: { 
        type: String 
    },
    maphong: { 
        type: String 
    },
    ngaythue: { 
        type: Date 
    },
    cccd: { 
        type: String 
    },
    ngaycap: { 
        type: Date 
    },
    ngaysinh: { 
        type: Date 
    },
    noisinh: { 
        type: String 
    },
    tienphong: { 
        type: Number 
    },
    ghichu: { 
        type: String 
    },
    anh: { 
        type: String 
    }
}, {
    collection: "tenant"
});

const TenantModel = mongoose.model('tenant',TenantSchema);

module.exports = TenantModel