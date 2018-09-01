(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider){
       $stateProvider
        .state('admin', {
            url: '/admin',
            views:{
                '':{
                    templateUrl: 'dashboard/admin/admin.dashboard.html',
                    controller: 'AdminController',
                    controllerAs: 'adminCtrl'
                }
            }
        })
        .state('admin.items', {
            url: '/items/',
            views: {
                'content@admin': {
                    templateUrl: 'dashboard/admin/admin.dashboard.items.html'
                }
            }
        })
        .state('admin.category', {
            url: '/category/',
            views: {
                'content@admin': {
                    templateUrl: 'dashboard/admin/admin.dashboard.category.html'
                }
            }
        })
    }
})();