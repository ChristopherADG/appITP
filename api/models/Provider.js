const mongoose = require('mongoose'),
        config = require('../config/database'),
        bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let Provider = new Schema({
    name: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    rfc: {
        type: String,
        require: true
    },
    pc: {
      type: String,
      require: true
    },
    street: {
      type: String,
      require: true
    },
    number: {
      type: String,
      require: true
    },
    ext_number: {
      type: String,
      require: true
    },
    colony: {
      type: String,
      require: true
    }

});
module.exports = mongoose.model('Provider', Provider);
