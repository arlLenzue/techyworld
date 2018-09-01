(function(){
    'use strict';

    angular
        .module('app')
        .controller('CheckoutController', CheckoutController);

    function CheckoutController(CartService, OrdersService, $state, $scope, UserService, $window){

        var vm = this;

        angular.extend(vm, {
            checkout: checkout,
            contact:{
                name: null,
                address: null,
                phone: null,
                email: null
            }
        });

        function checkout(){
            if($scope.customerInfoForm.$valid){
                performCheckout();
            }
        }

        function performCheckout(){

            OrdersService.checkout(vm.cart, vm.contact).then(function(){
                CartService.clearCart(function(cart){
                    vm.cart = cart;
                });
                $state.go('store.checkout.success');
            }, function(){
                $state.go('store');
            });
        }

        function getCurrentCart(){
            CartService.getCurrentCart(function(cart){
                vm.cart = cart;
            })
        }

        function getUser(){
            UserService.getUser(function(user){
                vm.contact.name = user.fullName || null;
                vm.contact.email = user.email || null;
                vm.user = user;
            });
        }

        function gotoTop(){
            $window.scrollTo(0, 0);
        }

        gotoTop();
        getUser();
        getCurrentCart();

    }
})();