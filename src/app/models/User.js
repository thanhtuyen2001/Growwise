const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
},{
    timestamps: true,
});

module.exports = mongoose.model('User', user);
