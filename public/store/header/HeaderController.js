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
            if(user && user.role == "Admin") $state.go("admin");
            else toastr.success("Under Construction");
        }

        function getCurrentCart(){
            CartService.getCurrentCart(function(cart){
                vm.cart = cart;
            })
        }


        $(".btn-romove-top-noti").click(function(){
            $(".top-notif").remove();
        });

        getCurrentCart();

    }

})();