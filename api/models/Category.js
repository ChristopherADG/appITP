const mongoose = require('mongoose'),
config = require('../config/database');

const Schema = mongoose.Schema;

let Category = new Schema({
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Catgory', Category);