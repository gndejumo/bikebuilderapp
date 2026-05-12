const mongoose = require('mongoose')
const {Schema, model} = mongoose

const partSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true, enum: ['frameSet', 'barsStem', 'groupSet', 'wheels', 'tyres', 'seatposts', 'saddles', 'bikeFit']},
    brand: {type: String, required: true},
    price: {type: Number, required: true, min: 0},
    colors: [{type: String}],
    images: {thumbnail: String, preview: String},
    specs: {
        material: {type: String},
        weight: {type: Number, min: 0},
        size:{type: String}
    },
    stock: {type: Number, required: true, min: 0},
    status: {type: String, enum: ['available', 'notAvailable'], default: 'available'}
}, {timestamps: true})


module.exports = model('Part', partSchema)
// modle name: Part
// collection name: parts