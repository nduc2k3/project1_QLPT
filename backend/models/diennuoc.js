const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const DnSchema = new Schema({
    madn : String,
    makt : String,
    thang : Number,
    nam : Number,
    sodien : Number,
    sonuoc : Number

},{
    collection : "diennuoc"
});

const DnModel = mongoose.model('diennuoc',DnSchema);

module.exports = DnModel