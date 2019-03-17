const mongoose = require('mongoose')

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