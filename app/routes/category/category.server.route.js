var category = require('../../../app/controllers/category/category.server.controller');

module.exports = function(app) { 

	app.route('/get-categories')
	.get(category.get)

	app.route('/add-categories')
	.post(category.add)

	app.route('/delete-categories/:id')
	.delete(category.delete)

	app.route('/update-categories')
	.put(category.update)
	
};