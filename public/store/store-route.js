(function(){
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    function routeConfig($stateProvider, $urlRouterProvider){


        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('store', {
                url: '/',
                views:{
                    '':{
                        templateUrl: 'store/store-base.html',
                        controller: 'StoreController',
                        controllerAs: 'storeCtrl'
                    },
                    'navigation@store': {
                        templateUrl: 'store/header/header.html',
                        controller: 'HeaderController',
                        controllerAs: 'headerCtrl'
                    },
                    'footer@store': {
                        templateUrl: 'store/footer/footer.html',
                        controller: 'FooterController',
                        controllerAs: 'footerCtrl'
                    },
                    'content@store': {
                        templateUrl: 'store/main/main.html',
                        controller: 'MainController',
                        controllerAs: 'mainCtrl'
                    }
                }
            })
            .state('store.item', {
                url: 'items/{id}',
                views: {
                    'content@store': {
                        templateUrl: 'store/single-item/single-item.html',
                        controller: 'SingleItemController',
                        controllerAs: 'singleItemCtrl'
                    }
                }
            })
            .state('store.cart', {
                url: 'cart/',
                views: {
                    'content@store': {
                        templateUrl: 'store/cart/cart.html',
                        controller: 'CartController',
                        controllerAs: 'cartCtrl'
                    }
                }
            })
            .state('store.checkout', {
                url: 'checkout',
                views: {
                    'content@store': {
                        templateUrl: 'store/checkout/checkout.html',
                        controller: 'CheckoutController',
                        controllerAs: 'checkoutCtrl'
                    }
                }
            })
            .state('store.checkout.success', {
                url: '/success',
                views: {
                    'content@store': {
                        templateUrl: 'store/checkout/success/success-checkout.html',
                        controller: 'CheckoutController',
                        controllerAs: 'checkoutCtrl'
                    }
                }
            });

    }
})();