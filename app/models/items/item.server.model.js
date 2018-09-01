var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    category: String,
    price: {type: Number, default: 0},
    discount:{type: Number, default: 0},
    discountedPrice: Number,
    images: Array,
    mainImageIndex: {type: Number, default: 0},
    qty: {type: Number, default: 1},
    created: { 
		type: Date, 
		default: Date.now 
	}
}, { usePushEach: true });

mongoose.model('Items', ItemsSchema);
