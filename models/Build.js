const mongoose = require('mongoose')
const {Schema, model} = mongoose

const buildSchema = new Schema({
   userId: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true},
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: "Bike"
    },
    name: {type: String, required: true},
    selectedParts: {
    frameSet:  { 
        partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    barsStem:  { 
        partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    groupSet:  { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    wheels:    { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    tyres:     { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    seatposts: { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    saddles:   { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    bikeFit:   { partId: { type: Schema.Types.ObjectId, 
        ref: 'Part' }, 
        color: String, 
        price: Number },
    },
    totalPrice: {type: Number, required: true, default: 0},
    status: {type: String, enum: ['draft', 'saved', 'ordered'], default: 'draft'},   
}, {timestamps: true})


module.exports = model('Build', buildSchema)
// model name: Build
// collection name: builds