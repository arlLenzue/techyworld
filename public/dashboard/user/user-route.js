(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
       $stateProvider
        .state('user', {
            url: '/user',
            templateUrl: 'dashboard/user/user.dashboard.html',
            controller: 'UserController',
            controllerAs: 'userCtrl'

        })
    }
})();