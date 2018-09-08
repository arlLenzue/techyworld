'use strict';
var mongoose = require('mongoose');
var fs = require('fs');
var Item = mongoose.model('Items');
var users = require('../../../app/controllers/users/user.server.controller');

exports.get = function(req, res, next) { 
    Item.find({}, function(err, items) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(items); 
		} 
	}); 
}


exports.getByCategory = function(req, res, next) {

	var categoryName = req.params.category; 
	
    Item.find({category: categoryName}, function(err, category) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(category); 
		} 
	}); 

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

exports.add = function(req, res, next) { 

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");
        
    if(req.body.discount > 0){
        req.body.discountedPrice = req.body.price - ((req.body.discount / 100) * req.body.price);
    }

	var item = new Item(req.body); 
	
	item.save(function(err, item) { 
		if (err) { 
			return next(err); 
		} 
		return res.json(item);
	});
}

exports.update = function(req, res, next) {

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");
        
    if(req.body.discount > 0){
        req.body.discountedPrice = req.body.price - ((req.body.discount / 100) * req.body.price);
    }else{
    	req.body.discountedPrice = null;
    }

	Item.findByIdAndUpdate(req.body._id, req.body, 
	function(err, item) { 
		if (err) { 
			return next(err); 
		} else { 
			res.json(item);
		} 
	}); 

}

exports.delete = function(req, res, next) {

	var isAdmin = users.checkIfAdmin(req.user);

	if(!isAdmin) return next("{error: not authorized}");

	Item.remove({ _id: req.params.id }, function(err) {
	    if (err) { 
			return next(err); 
		} else { 
			res.json('Success'); 
		} 
	});
}