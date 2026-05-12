const mongoose = require('mongoose')
const {Schema, model} = mongoose

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Data.now(),
        expires: 86400 // expires in 24 hrs
    }
})

module.exports = model('Blacklist', blacklistSchema);
