(function(){
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    function MainController(ItemsService){

        var vm = this;

         angular.extend(vm, {
            AddCart: null,
            Checkout: null
        });

         function getItems(){
         	ItemsService.getAll(function(items){
         		vm.items = items;
         	})
         }

         getItems();

    }

})();
