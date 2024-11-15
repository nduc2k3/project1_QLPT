const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const DvSchema = new Schema({
    madv: {
        type: String,
        required: true,
        unique: true
    },
    tendv: {
        type: String,
        required: true
    },
    giatien: {
        type: Number,
        required: true
    }
}, {
    collection: "dichvu"
});

const DvModel = mongoose.model('dichvu',DvSchema);

module.exports = DvModel