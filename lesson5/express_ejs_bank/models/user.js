//Model class Transaction

const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    number: {type: Number, required: true},
    balance: {type: Number, required: true}
});

const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    accounts: [AccountSchema]
});

module.exports = mongoose.model('User', UserSchema);