const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let Shipping = new Schema({
driverName: {
  type: String,
  require: true
},
products: {
  type: Array,
  require: true
},
destiny: {
  type: String,
  require: true
}

});
module.exports = mongoose.model('Shipping', Shipping);
