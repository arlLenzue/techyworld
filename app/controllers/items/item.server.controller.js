'use strict';
var mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
var fs = require('fs');
var Item = mongoose.model('Items');

exports.get = function(req, res, next) { 
    Item.find({}, function(err, items) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(items); 
		} 
	}); 
}
exports.add = function(req, res, next) { 

	var item = new Item(req.body); 
	
	item.save(function(err, item) { 
		if (err) { 
			return next(err); 
		} 
		return res.json(item);
	});
}

exports.update = function(req, res, next) { 
	
}

exports.getOne = function(req, res, next) { 
	
	var itemID = req.params.id;

	console.log(itemID,'itemIDitemIDitemID',req.body);

	Item.findOne({_id: itemID}, function(err, item) { 
		if (err) { 
			return next(err); 
		} else { 
			console.log(item,'item found');
			res.json(item); 
		} 
	}); 

}
exports.delete = function(req, res, next) { 
   
}