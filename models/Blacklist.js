const mongoose = require('mongoose')
const {Schema, model} = mongoose

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400 // expires in 24 hrs
    }
})

module.exports = model('Blacklist', blacklistSchema);
