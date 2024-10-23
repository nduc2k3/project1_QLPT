const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const RoomSchema = new Schema({
    maphong : String,
    tenphong : String,
    tang : Number,
    trangthaiphong : Boolean,
    trangthaitt: Boolean,
    hinhanh : String,
    giaphong :Number,
    mota : String
    
},{
    collection : "room"
});

const RoomModel = mongoose.model('room',RoomSchema);

module.exports = RoomModel