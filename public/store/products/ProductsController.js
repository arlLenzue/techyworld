(function(){
    'use strict';

    angular
        .module('app')
        .controller('ProductsController', ProductsController);

    function ProductsController(ItemsService, $state, $stateParams, $window){

        var vm = this;

         angular.extend(vm, {
            filter: {
                name: 'price',
                value: true
            },
            sort: sort,
            changeCategory: changeCategory,
            getItems: getItems,
            currentCategoty: null
        });

         function sort(value){
            vm.filter.value = value;
        }

         function getItems(){
            vm.currentCategoty = null;
         	ItemsService.getAll(function(items){
         		vm.items = items;
         	})
         }

         function changeCategory(category){
            vm.currentCategoty = category;
            ItemsService.getAllCategory(category, function(items){
                vm.items = items;
            });
         }

        function gotoTop(){
            $window.scrollTo(0, 0);
        }

        gotoTop();

         if($stateParams.category && $stateParams.category != ""){
            changeCategory($stateParams.category);
         }else{
            getItems();
         }

    }

})();
