(function(){
    'use strict';

    angular
        .module('app')
        .controller('StoreController', StoreController);

    function StoreController(CartService,CategoriesService, $state){

        var vm = this;

        angular.extend(vm, {
            addToCart: addToCart,
            buyNow: buyNow
        });


        function addToCart(item){
            CartService.addToCart(item, function(){
                
            })
        }

        function buyNow(item){
            CartService.addToCart(item, function(cart){
                vm.cart = cart;
                $state.go('store.checkout');
            })
        }

        function getCart(){
            CartService.getCart(function(cart){
                vm.cart  = cart;
            })
        }

        function getCategory(){
            CategoriesService.getAll(function(categories){
                vm.categories = categories
            });
        }

        getCategory();

        getCart();

    }

})();