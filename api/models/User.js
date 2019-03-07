const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model('User', User);