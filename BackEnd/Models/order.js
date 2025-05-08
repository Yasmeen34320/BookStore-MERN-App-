const mongoose = require('mongoose');

const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
    },
    status:{
        type: String,
        enum: ['Order Placed', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Order Placed',
    },
},{timestamps:true});
module.exports = mongoose.model('orders', order);