const mongoose = require('mongoose')
const {Schema, model} = mongoose


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    password: String,
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    avatar:    { type: String, default: null },
    orders:   [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    builds:   [{ type: Schema.Types.ObjectId, ref: 'Build' }]
})

module.exports = model('User', userSchema)
// modle name: User
// collection name: users