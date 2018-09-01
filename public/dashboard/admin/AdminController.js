(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    function AdminController(ItemsService, CategoriesService, UserService, $state){

        var vm = this;

        vm.itemTemplate = {
            title: "",
            description: "",
            category: "uncategorized",
            price: 0,
            discount: 0,
            discountedPrice: 0,
            images: [],
            mainImageIndex: 0,
            qty: 1
        }

        vm.categoryTemplate = {
            name: "",
            image: null
        },

        vm.itemImage = null;

        angular.extend(vm, {
            init: init,
            category: {
            	name: "",
                image: null
            },
            item: {
            	title: "",
			    description: "",
			    category: "uncategorized",
                price: 0,
                discount: 0,
			    discountedPrice: 0,
			    images: [],
			    mainImageIndex: 0,
			    qty: 1
            },
            AddCategory: AddCategory,
            ClearCategory: ClearCategory,
            SaveCategory: SaveCategory,
            DeleteCategory: DeleteCategory,
            AddItem: AddCategory,
            ClearItem: ClearItem,
            SaveItem: SaveItem,
            DeleteItem: DeleteItem
        });


        // Category Functions
        function SaveCategory(){
             CategoriesService.updateCategory(vm.category, function(category){
                ClearCategory();
                getCategory();
            });
        }

        function ClearCategory(){
            vm.category = angular.copy(vm.categoryTemplate);
        }

        function AddCategory(){
            CategoriesService.addNew(vm.category, function(category){
                vm.category = angular.copy(vm.categoryTemplate);
            });
        }

        function getCategory(){
            CategoriesService.getAll(function(categories){
                vm.categories = categories
            });
        }

        function DeleteCategory(id){
            CategoriesService.deleteCategory(id, function(categories){
                ClearCategory();
                getCategory();
            });
        }

        // Item Functions
        function SaveItem(){
            ItemsService.updateItem(vm.item, function(item){
                ClearItem();
                getItems();
            });
        }

        function ClearItem(){
            vm.item = angular.copy(vm.itemTemplate);
        }

        function AddItem(){
            vm.item.images = [vm.itemImage || "https://alameddinefurniture.com/images/noimage.png"]
        	ItemsService.addItem(vm.item, function(item){
                vm.item = angular.copy(vm.itemTemplate);
        	});
        }

        function getItems(){
            ItemsService.getAll(function(items){
                vm.items = items;
            })
         }

        function DeleteItem(id){
            ItemsService.deleteItem(id, function(item){
                getItems();
                ClearItem();
            });
        }

         //Other Fuctions
        function validateAccess(){
            UserService.isAdmin(function(auth){
                if(auth == "true"){
                    init();
                }else{
                    $state.go("user");
                }
            });
        }
        
        function init(){
            getCategory();
            getItems();
        }

        validateAccess();

    }

})();
