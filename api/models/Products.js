const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String,
        require: true
    },
    unit: {
        type: Array,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    providers:{
        type: Array,
        require: true
    }
});
module.exports = mongoose.model('Product', Product);