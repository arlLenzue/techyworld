(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    function AdminController(ItemsService, CategoriesService){

        var vm = this;

        vm.itemTemplate = {
            title: "",
            description: "",
            category: "uncategorized",
            price: 0,
            images: [],
            mainImageIndex: 0,
            qty: 1
        }

        vm.categoryTemplate = {
            name: ""
        },

        vm.itemImage = null;

        angular.extend(vm, {
            category: {
            	name: ""
            },
            items: {
            	title: "",
			    description: "",
			    category: "uncategorized",
			    price: 0,
			    images: [],
			    mainImageIndex: 0,
			    qty: 1
            },
            AddCategory: AddCategory,
            AddItem: AddItem
        });

        function AddCategory(){
        	CategoriesService.addNew(vm.category, function(category){
        		vm.category = angular.copy(vm.categoryTemplate);
        	});
        }

        function AddItem(){
            vm.items.images = [vm.itemImage || "http://alameddinefurniture.com/images/noimage.png"]
        	ItemsService.addItem(vm.items, function(item){
                vm.items = angular.copy(vm.itemTemplate);
        	});
        }

        function getCategory(){
	        CategoriesService.getAll(function(categories){
	        	vm.categories = categories
	        });
        }

        getCategory();

    }

})();
