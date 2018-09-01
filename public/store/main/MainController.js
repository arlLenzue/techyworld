(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(ItemsService, $window){

        var vm = this;

         angular.extend(vm, {
            filter: {
                name: 'price',
                value: true
            },
            sort: sort,
            changeCategory: changeCategory,
            getItems: getItems
        });

         function sort(value){
            vm.filter.value = value;
        }

         function getItems(){
         	ItemsService.getAll(function(items){
         		vm.items = items;
         	})
         }

         function changeCategory(category){
            ItemsService.getAllCategory(category, function(items){
                vm.items = items;
            });
         }

        function gotoTop(){
            $window.scrollTo(0, 0);
        }

        gotoTop();

         getItems();

    }

})();
