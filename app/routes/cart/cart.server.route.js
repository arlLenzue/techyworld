var cart = require('../../../app/controllers/cart/cart.server.controller');

module.exports = function(app) { 

	app.route('/add-to-cart')
	.post(cart.add)

	app.route('/delete-all-from-cart')
	.delete(cart.deleteAll)

	app.route('/delete-from-cart/:id')
	.delete(cart.deleteOne)

	app.route('/delete-from-cart-all/:id')
	.delete(cart.deleteOneAll)

	app.route('/get-cart')
	.get(cart.get)

	app.route('/update-cart')
	.put(cart.update)


};