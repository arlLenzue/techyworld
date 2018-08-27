(function(){
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope, $window, $state, UserService, CartService){

        var vm = this;

        angular.extend(vm, {
            redirectBtn: redirectBtn,
            transitionToDashboard: transitionToDashboard
        });

        function redirectBtn(path){
            $window.location.href = '/'+path;
        }

        function transitionToDashboard(user){
            if(user) $state.go("admin");
        }

        function getCurrentCart(){
            CartService.getCurrentCart(function(cart){
                vm.cart = cart;
            })
        }

        getCurrentCart();

    }

})();