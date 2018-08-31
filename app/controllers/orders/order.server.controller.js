'use strict';
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

exports.checkout = function(req, res, next) { 

    var order = new Order({
        cart: req.body.cart,
        customer: req.body.customer
    });

    order.save(function(err, order){
        if(err){ return next(err) }
        res.json(order);
    }).then(function(order){
        console.log(order,'order details');
    });

}
exports.delete = function(req, res, next) { 

}
exports.getAll = function(req, res, next) { 
   
}
exports.getOne = function(req, res, next) { 

   
}
