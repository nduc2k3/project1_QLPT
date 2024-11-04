const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const DvSchema = new Schema({
    madv : String,
    tendv : String,
    giatien : String

},{
    collection : "dichvu"
});

const DvModel = mongoose.model('dichvu',DvSchema);

module.exports = DvModel