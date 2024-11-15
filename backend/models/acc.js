const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DB0001');

const AccSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.length >= 8;
            },
            message: 'Password must be at least 8 characters long'
        }
    }
}, {
    collection: "account"
});

const AccModel = mongoose.model('account',AccSchema);

module.exports = AccModel