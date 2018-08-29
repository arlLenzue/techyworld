(function () {
    'use strict';

    angular
        .module('app')
        .controller('SingleItemController', SingleItemController);

    function SingleItemController($state, CartService, $stateParams, ItemsService) {

        var vm = this;

        angular.extend(vm, {
            addValue: addValue,
            subtractValue: subtractValue
        })

        function addValue(){
            vm.item.qty += 1;
        }

        function subtractValue(){
            if(vm.item.qty > 1){
                vm.item.qty -= 1;
            }
        }

        function resolveItem(params){
            ItemsService.getItem(params.id, function(item){
            	vm.item = item;
            });
        }

        resolveItem($stateParams)

    }
})();