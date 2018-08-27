var config = require('./config'), 
	mongoose = require('mongoose'); 

module.exports = function() {
	
	var db = mongoose.connect(config.db); 

	require('../app/models/users/user.server.model'); 
	require('../app/models/cart/cart.server.model'); 
	require('../app/models/cart/cartItem.server.model'); 
	require('../app/models/category/category.server.model'); 
	require('../app/models/items/item.server.model'); 
	require('../app/models/orders/order.server.model'); 
	
	return db; 
};