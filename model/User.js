const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true }
});

module.exports = mongoose.model('User', userSchema)