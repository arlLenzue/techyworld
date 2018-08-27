var item = require('../../../app/controllers/items/item.server.controller');

module.exports = function(app) { 

	app.route('/get-items')
	.get(item.get)

	app.route('/getOne-items/:id')
	.get(item.getOne)

	app.route('/add-items')
	.post(item.add)

	app.route('/update-items')
	.put(item.update)

	app.route('/delete-items/:id')
	.delete(item.delete)

};