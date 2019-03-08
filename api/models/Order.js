const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Order = new Schema({
    user: {
        type: String,
        require: true
    },
    dinningRoom: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    quantity: {
      type: Array,
      require: true
    },
    units: {
      type: Array,
      require: true
    },
    products: {
      type: Array,
      require: true
    },
    status: {
        type: String,
        require:true
    }
});
module.exports = mongoose.model('Order', Order);
