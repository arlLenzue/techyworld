(function(){
    'use strict';

    angular
        .module('app')
        .factory('CartService', CartService);

    function CartService($http){
        var cart = {};

        var service = {
            addToCart: addToCart,
            deleteFromCart: deleteFromCart,
            deleteFromCartAll: deleteFromCartAll,
            clearCart: clearCart,
            getCart: getCart,
            updateCart: updateCart,
            getCurrentCart: getCurrentCart
        };

        return service;

        function addToCart(obj, callback){
           $http.post('/add-to-cart', obj).then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            }, function(err){
                return err;
            });
        }

        function clearCart(callback){
           $http.delete('/delete-all-from-cart').then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            });
        }

        function deleteFromCart(obj, callback){
           $http.delete('/delete-from-cart/'+ obj._id).then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            });
        }

        function deleteFromCartAll(obj, callback){
           $http.delete('/delete-from-cart-all/'+ obj._id).then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            });
        }

        function getCart(callback){
            $http.get('/get-cart').then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            });
        }

        function updateCart(cart, callback){
            $http.put('/update-cart', cart).then(function(response){
               callback(response.data);
               angular.copy(response.data, cart);
            });
        }

        function getCurrentCart(callback){
            callback(cart);
        }

    }
})();
