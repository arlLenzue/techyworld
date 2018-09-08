'use strict';
var mongoose = require('mongoose');
var Category = mongoose.model('Categories');
var users = require('../../../app/controllers/users/user.server.controller');

exports.get = function(req, res, next) { 
    
    Category.find({}, function(err, category) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(category); 
		} 
	}); 

}
exports.add = function(req, res, next) { 

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");

    var category = new Category(req.body); 
	
	category.save(function(err, category) { 
		if (err) { 
			return next(err); 
		} 
		return res.json(category);
	});

}
exports.delete = function(req, res, next) { 

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");

	Category.remove({ _id: req.params.id }, function(err) {
	    if (err) { 
			return next(err); 
		} else { 
			res.json('Success'); 
		} 
	});
}
exports.update = function(req, res, next) { 

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");


	Category.findByIdAndUpdate(req.body._id, req.body, 
	function(err, item) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(item);
		} 
	}); 


}