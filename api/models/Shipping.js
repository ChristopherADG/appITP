const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let Shipping = new Schema({
  date:{
    type: String,
    require: true
  },
  time:{
    type: String,
    require: true
  },
  driverName: {
    type: String,
    require: true
  },
  products: {
    type: Array,
    require: true
  },
  destiny: {
    type: Array,
    require: true
  },
  status: {
    type: String,
    require:true
  }

});
module.exports = mongoose.model('Shipping', Shipping);