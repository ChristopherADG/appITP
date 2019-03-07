const mongoose = require('mongoose'),
        config = require('../config/database'),
        bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('User', User);

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, IsMatch)=>{
        if(err){
            throw err;
        }
        callback(null, IsMatch);
    })
}