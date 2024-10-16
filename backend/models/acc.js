const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const AccSchema = new Schema({
    email: String,
    password: String
},{
    collection : "account"
});

const AccModel = mongoose.model('account',AccSchema);

module.exports = AccModel