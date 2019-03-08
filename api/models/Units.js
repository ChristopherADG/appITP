const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Unit = new Schema({
    name: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('Unit', Unit);