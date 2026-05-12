const mongoose = require('mongoose')
const {Schema, model} = mongoose


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, uniquie: true},
    password: String,
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
})

module.exports = model('User', userSchema)
// modle name: User
// collection name: users