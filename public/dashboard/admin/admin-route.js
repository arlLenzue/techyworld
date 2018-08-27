(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
       $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'dashboard/admin/admin.dashboard.html',
            controller: 'AdminController',
            controllerAs: 'adminCtrl'

        })
    }
})();