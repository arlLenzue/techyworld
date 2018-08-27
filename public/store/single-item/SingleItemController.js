(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleItemController', SingleItemController);

    function SingleItemController($state, CartService, $stateParams, ItemsService) {

        var vm = this;

        angular.extend(vm, {

        })

        function resolveItem(params){
            ItemsService.getItem(params.id, function(item){
            	vm.item = item;
            });
        }

        resolveItem($stateParams)

    }
})();