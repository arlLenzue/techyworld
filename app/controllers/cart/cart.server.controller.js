'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Item = mongoose.model('Items');
var CartItem = mongoose.model('CartItem');

exports.add = function(req, res, next) { 

    var item = req.body;
    var cartID = req.user ? req.user.id : req.sessionID;

    Item.findById(item._id, function (err, result) {
        if (err) {
            return next(err)
        }
        return result;
    }).then(function (result) {

        checkForExistingCart(cartID, function (response) {

            var cart;

            if(response){
                console.log("\nCart found. Start working with existing cart. \n");
                cart = response;
            } else {
                console.log("\nCart not found. Creating a new cart \n");
                cart = new Cart({
                    _id: cartID
                });
            }
		
	    var computedPrice = result.price;
		
	    if(result.discount){
	        computedPrice = result.price + (result.price * result.discount);
	    }

            var cartItem = new CartItem({
                _id:            result.id,
                images:         result.images,
                title:          result.title,
                price:          computedPrice,
                mainImageIndex: result.mainImageIndex,
                qty:            item.qty
            });

            cart.addItem(cartItem, function(err, cart){
                if (err) {
                    return next(err)
                }
                res.json(cart);
            });

        });
    });
};

exports.deleteAll = function(req, res, next) { 

    var cartID = req.user ? req.user.id : req.sessionID;

    Cart.find({ _id:cartID }).remove( function(err){
        if (err) {
            return next(err)
        }
        res.json({});
    });

};

exports.deleteOne = function(req, res, next) { 
    //Retrieving item id and qty for secure reasons
    var itemID = req.params.id;
    var cartID = req.user ? req.user.id : req.sessionID;
   
    //Search for item in store items by ID
    checkForExistingCart(cartID, function (response) {

        var cart;

        if(response){
            console.log("\nCart found. Start working with existing cart. \n");

            //Using existing cart
            cart = response;
        } else {
            console.log("\nCart not found. Nothing to delete \n");
            return;
        }

        cart.removeItem(itemID, function(err, cart){
            if (err) {
                return next(err)
                res.json(err);
            }
            console.log(cart);
            res.json(cart);
        });
    });
	
};

exports.deleteOneAll = function(req, res, next) { 
    //Retrieving item id and qty for secure reasons
    var itemID = req.params.id;
    var cartID = req.user ? req.user.id : req.sessionID;
    //Search for item in store items by ID
    checkForExistingCart(cartID, function (response) {

        var cart;

        if(response){
            console.log("\nCart found. Start working with existing cart. \n");

            //Using existing cart
            cart = response;
        } else {
            console.log("\nCart not found. Nothing to delete \n");
            return;
        }

        cart.removeItemAll(itemID, function(err, cart){
            if (err) {
                return next(err)
            }
            res.json(cart);
        });
    });
};

exports.get = function(req, res, next) { 

   var cartID = req.user ? req.user.id : req.sessionID;

    Cart.findById(cartID, function (err, cart) {
        if (err) { return next(err) }
        res.json(cart);
    });
	
};

exports.update = function(req, res, next) { 

	
};

function checkForExistingCart(cartID, cb) {

    Cart.findById(cartID, function (err, cart) {
        if (err) { return next(err) }
        return cart;
    }).then(cb);
    
}
 

