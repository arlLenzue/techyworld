(function(){
    'use strict';

    angular
        .module('app')
        .controller('CartController', CartController);

    function CartController(CartService){

        var vm = this;

        angular.extend(vm, {
            deleteFromCart: deleteFromCart,
            deleteAll: clearCart,
            updateCart: updateCart
        });

        function deleteFromCart(item) {
            CartService.deleteFromCart(item, function(cart){
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