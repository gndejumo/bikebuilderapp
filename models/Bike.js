const mongoose = require ('mongoose')
const {Schema, model} = mongoose;


const bikeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    defaultParts: {
        frameSet: {type: Schema.Types.ObjectId, ref: 'Part'},
        barsStem: {type: Schema.Types.ObjectId, ref: 'Part'},
        groupSet: {type: Schema.Types.ObjectId, ref: 'Part'},
        wheels: {type: Schema.Types.ObjectId, ref: 'Part'},
        tyres: {type: Schema.Types.ObjectId, ref: 'Part'},
        seatposts: {type: Schema.Types.ObjectId, ref: 'Part'},
        saddles: {type: Schema.Types.ObjectId, ref: 'Part'},
        bikeFit: {type: Schema.Types.ObjectId, ref: 'Part'}
    },
    basePrice: {type: Number, required: true, min: 0},
    images: {
        thumbnail: {type: String},
        preview:   {type: String}
    },
    isActive: {type: Boolean, default: true}
}, {timestamps: true})

module.exports = model('Bike', bikeSchema)
// modelname: Bike
// collection name: bikes