const mongoose = require('mongoose'),
        config = require('../config/database'),
        bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let Truck = new Schema({
    driverName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    licPlate: {
        type: String,
        require: true
    },
    carrCapacity: {
        type: String,
        require: true
    }

});
module.exports = mongoose.model('Truck', Truck);
