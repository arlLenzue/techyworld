(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    function AppController($scope,$window, UserService){

        var vm = this;

        angular.extend(vm, {
            getUser: getUser,
            goBack: goBack
        });

        function getUser(){
            UserService.getUser(function(user){
                vm.user = user;
            });
        }

        function goBack(){
            $window.history.back();
        }

    }

})();