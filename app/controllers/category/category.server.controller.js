'use strict';
var mongoose = require('mongoose');
var Category = mongoose.model('Categories');

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

    var category = new Category(req.body); 
	
	category.save(function(err, category) { 
		if (err) { 
			return next(err); 
		} 
		return res.json(category);
	});

}
exports.delete = function(req, res, next) { 


}