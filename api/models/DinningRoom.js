const mongoose = require('mongoose'),
        config = require('../config/database');

const Schema = mongoose.Schema;

let DinningRoom = new Schema({
    street: {
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
    pc: {
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

module.exports = mongoose.model('DinningRoom', DinningRoom);
