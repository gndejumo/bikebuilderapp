const mongoose = require('mongoose')
const  {Schema, model} = mongoose

const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true},
    buildId: {type: Schema.Types.ObjectId, 
        ref: 'Build',
        required: true},
    buildSnapshot: {type: Object, required: true},
    status: {
        type: String,
        enum: ['pending', 'confirmed','shipped', 'delivered', 'cancelled'],
        default: "pending"
    },
    totalAmount: {type: Number, required: true, min: 0},
    payment: {
        method: {type: String, enum: ['cash', 'credit_card', 'bank_transfer'], default: 'cash'},
        status: {type: String, enum: ['pending', 'paid', 'failed']},
        transactionId: {type: String}
    },
    shipping: {
        address: {type: String, required: true},
        trackingNumber: {type: String},
        estimatedDelivery: {type: Date}
    }
}, {timestamps: true})

module.exports = model('Order', orderSchema)