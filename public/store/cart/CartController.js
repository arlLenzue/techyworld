(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(CartService){

        var vm = this;

        angular.extend(vm, {
            deleteFromCart: deleteFromCart,
            deleteFromCartAll: deleteFromCartAll,
            deleteAll: clearCart,
            updateCart: updateCart,
            addToCart: addToCart
        });

        function addToCart(item){
            item.noToast = true;
            item.qty = 1; // add only 1
            CartService.addToCart(item, function(cart){
                vm.cart = cart;
            })
        }

        function deleteFromCart(item) {
            CartService.deleteFromCart(item, function(cart){
                vm.cart = cart;
            });
        }

        function deleteFromCartAll(item) {
            CartService.deleteFromCartAll(item, function(cart){
                vm.cart = cart;
            });
        }
        

        function clearCart(){
            CartService.clearCart(function(cart){
                vm.cart = cart;
            });
        }

        function updateCart(){
            if(vm.cart){
                CartService.updateCart(vm.cart);
            }
        }

        function getCurrentCart(){
            CartService.getCurrentCart(function(cart){
                vm.cart = cart;
            })
        }

        getCurrentCart();

    }
})();