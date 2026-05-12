const mongoose = require('mongoose')
const {Schema, model} = mongoose

const refreshTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},
    token: {
        type: String,
        required: true, 
        unique: true
    }
}, {timestamps: true})

module.exports = model('RefreshToken', refreshTokenSchema)