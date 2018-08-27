var order = require('../../../app/controllers/orders/order.server.controller');

module.exports = function(app) { 

	app.route('/checkout/')
	.post(order.checkout)

	app.route('/delete-order/:id')
	.delete(order.delete)

	app.route('/getAll-orders')
	.get(order.getAll)

	app.route('/get-user-orders')
	.get(order.getOne)

};