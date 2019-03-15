const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ApprovedOrder = new Schema({
    date:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    user: {
        type: Object,
        require: true
    },
    dinningRoom: {
        type: Object,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    products: {
      type: Array,
      require: true
    },
    status: {
        type: String,
        require:true
    },
    original:{
        type: String,
        require:true
    },
    approveObservations:{
        type: String,
        require:true
    },
    approveUser:{
        type: Object,
        require:true
    }
});
module.exports = mongoose.model('ApprovedOrder', ApprovedOrder);