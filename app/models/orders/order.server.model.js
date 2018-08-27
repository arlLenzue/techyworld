var mongoose = require('mongoose');
var CartSchema = require('../cart/cart.server.model');

var OrderSchema = new mongoose.Schema({
    cart: [CartSchema],
    customer: [{
        name: String,
        address: String,
        phone: String,
        email: String
    }],
    date: { type: Date, default: Date.now }

}, { usePushEach: true });

mongoose.model('Order', OrderSchema);